---
emoji: 🐌
title: JPA N+1 문제 - 원인과 해결법
date: '2025-01-19T00:00:00.000Z'
categories: Spring
author: Jard
description: '면접에서 받았던 질문을 다시 정리하며, JPA N+1 문제의 원인과 해결 방법을 알아봅니다.'
---

최근 면접에서 JPA의 N+1 문제에 대해 질문을 받았는데, 제대로 답변하지 못해서 아쉬웠습니다. 평소에 사용하고 있던 개념이었지만 막상 설명하려니 명확하게 전달하지 못했던 것 같아요. 이번 기회에 제대로 정리해보면서, 다음에는 더 나은 답변을 할 수 있도록 준비해보려고 합니다.

JPA를 사용하다 보면 성능 문제로 가장 많이 마주치는 것이 바로 **N+1 문제**입니다. 이 문제는 초기에는 눈에 잘 띄지 않지만, 데이터가 많아질수록 심각한 성능 저하를 일으킬 수 있어요. 면접관님께서도 실제 프로덕션 환경에서 이 문제로 인한 성능 이슈를 경험하신 적이 있으실 것 같습니다. 이번 글에서는 N+1 문제가 무엇인지, 왜 발생하는지, 그리고 어떻게 해결할 수 있는지 차근차근 정리해보겠습니다.

---

## N+1 문제란?

N+1 문제는 하나의 쿼리로 N개의 엔티티를 조회한 후, 각 엔티티와 연관된 데이터를 조회하기 위해 추가로 N번의 쿼리가 실행되는 문제입니다.

**예시:**
- 1번의 쿼리로 10명의 회원을 조회
- 각 회원의 주문 내역을 조회하기 위해 10번의 추가 쿼리 실행
- 총 11번의 쿼리 실행 (1 + 10 = 11)

---

## 문제 발생 원인

N+1 문제는 주로 다음과 같은 상황에서 발생합니다:

1. **지연 로딩(Lazy Loading) 사용 시**
   - 연관 관계가 `@OneToMany`, `@ManyToOne` 등으로 설정되어 있고
   - `fetch = FetchType.LAZY`로 설정된 경우
   - 연관된 엔티티에 접근할 때 추가 쿼리가 실행됨

2. **즉시 로딩(Eager Loading) 사용 시**
   - `fetch = FetchType.EAGER`로 설정되어 있어도
   - 컬렉션을 순회하면서 각각의 연관 엔티티를 조회할 때 발생할 수 있음

---

## 예시 코드

### 엔티티 구조

```java
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();
    
    // getter, setter...
}

@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String orderNumber;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    
    // getter, setter...
}
```

### N+1 문제가 발생하는 코드

```java
@Service
@Transactional(readOnly = true)
public class MemberService {
    
    @Autowired
    private MemberRepository memberRepository;
    
    public void printMemberOrders() {
        // 1번의 쿼리: 모든 회원 조회
        List<Member> members = memberRepository.findAll();
        
        // N번의 쿼리: 각 회원의 주문 내역 조회
        for (Member member : members) {
            System.out.println("Member: " + member.getName());
            // 이 시점에 지연 로딩으로 인해 추가 쿼리 실행
            for (Order order : member.getOrders()) {
                System.out.println("  Order: " + order.getOrderNumber());
            }
        }
    }
}
```

### 실행되는 쿼리

```sql
-- 1번째 쿼리: 모든 회원 조회
SELECT * FROM member;

-- 2번째 쿼리: 첫 번째 회원의 주문 조회
SELECT * FROM orders WHERE member_id = 1;

-- 3번째 쿼리: 두 번째 회원의 주문 조회
SELECT * FROM orders WHERE member_id = 2;

-- 4번째 쿼리: 세 번째 회원의 주문 조회
SELECT * FROM orders WHERE member_id = 3;

-- ... (회원 수만큼 반복)
```

회원이 100명이라면 총 101번의 쿼리가 실행됩니다!

---

## 해결 방법

면접에서 해결 방법을 물어봤을 때, Fetch Join 정도만 언급하고 구체적인 설명을 하지 못했던 것 같아요. 여러 해결 방법이 있으니 하나씩 정리해보겠습니다.

### 1. Fetch Join 사용

가장 일반적이고 효과적인 해결 방법이라고 알고 있습니다. JPQL에서 `JOIN FETCH`를 사용하여 연관된 엔티티를 한 번에 조회할 수 있어요.

```java
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    
    @Query("SELECT m FROM Member m JOIN FETCH m.orders")
    List<Member> findAllWithOrders();
}
```

**실행되는 쿼리:**
```sql
SELECT m.*, o.* 
FROM member m 
LEFT OUTER JOIN orders o ON m.id = o.member_id;
```

**장점:**
- 한 번의 쿼리로 모든 데이터 조회
- 지연 로딩 설정을 변경하지 않아도 됨

**단점:**
- 페이징 처리 시 문제 발생 가능 (메모리에서 페이징 처리됨)
- 여러 컬렉션을 동시에 Fetch Join하면 카테시안 곱 문제 발생

### 2. @EntityGraph 사용

Spring Data JPA에서 제공하는 어노테이션으로, Fetch Join과 유사한 기능을 제공합니다. 개인적으로는 이 방법이 코드가 더 깔끔해서 선호하는 편이에요.

```java
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    
    @EntityGraph(attributePaths = {"orders"})
    @Query("SELECT m FROM Member m")
    List<Member> findAllWithOrders();
    
    // 또는 메서드 이름으로 자동 생성
    @EntityGraph(attributePaths = {"orders"})
    List<Member> findAll();
}
```

**장점:**
- 코드가 간결함
- Fetch Join과 동일한 효과

**단점:**
- Fetch Join과 동일한 제약사항 존재

### 3. Batch Size 설정

이 방법은 면접에서 언급하지 못했던 부분인데, `application.yml` 또는 `application.properties`에 배치 크기를 설정하면 연관된 엔티티를 배치로 조회할 수 있어요. 코드 변경이 최소화되는 장점이 있습니다.

```yaml
spring:
  jpa:
    properties:
      hibernate:
        jdbc:
          batch_size: 100
        order_inserts: true
        order_updates: true
```

또는 엔티티에 직접 설정:

```java
@Entity
@BatchSize(size = 100)
public class Member {
    // ...
}
```

**실행되는 쿼리:**
```sql
-- 1번째 쿼리: 모든 회원 조회
SELECT * FROM member;

-- 2번째 쿼리: 배치로 주문 조회 (IN 절 사용)
SELECT * FROM orders WHERE member_id IN (1, 2, 3, ..., 100);
```

**장점:**
- 코드 변경 최소화
- 페이징 처리 가능

**단점:**
- 여전히 2번의 쿼리 실행 (1번은 줄어들지만 완전히 해결되지는 않음)

### 4. DTO 직접 조회

필요한 데이터만 선택하여 DTO로 직접 조회하는 방법입니다. 성능이 정말 중요한 상황에서는 이 방법이 가장 효과적일 수 있어요.

```java
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    
    @Query("SELECT new com.example.dto.MemberOrderDto(m.id, m.name, o.orderNumber) " +
           "FROM Member m " +
           "LEFT JOIN m.orders o")
    List<MemberOrderDto> findMemberOrders();
}
```

```java
public class MemberOrderDto {
    private Long memberId;
    private String memberName;
    private String orderNumber;
    
    public MemberOrderDto(Long memberId, String memberName, String orderNumber) {
        this.memberId = memberId;
        this.memberName = memberName;
        this.orderNumber = orderNumber;
    }
    
    // getter, setter...
}
```

**장점:**
- 필요한 데이터만 조회하여 성능 최적화
- 메모리 사용량 감소

**단점:**
- DTO 클래스 추가 필요
- 엔티티가 아닌 DTO를 반환하므로 영속성 컨텍스트 활용 불가

### 5. @Query를 사용한 직접 조인

복잡한 쿼리가 필요한 경우 네이티브 쿼리나 직접 작성한 JPQL을 사용합니다.

```java
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    
    @Query(value = 
        "SELECT m.*, o.* " +
        "FROM member m " +
        "LEFT JOIN orders o ON m.id = o.member_id",
        nativeQuery = true)
    List<Object[]> findMembersWithOrdersNative();
}
```

---

## 실전 예시: 해결 전후 비교

### 해결 전 (N+1 문제 발생)

```java
@Service
@Transactional(readOnly = true)
public class MemberService {
    
    public List<MemberDto> getMembers() {
        List<Member> members = memberRepository.findAll(); // 1번 쿼리
        
        return members.stream()
            .map(member -> {
                // 각 회원마다 추가 쿼리 실행 (N번)
                List<Order> orders = member.getOrders();
                return new MemberDto(member.getName(), orders.size());
            })
            .collect(Collectors.toList());
    }
}
```

**쿼리 실행 횟수:** 1 + N번

### 해결 후 (Fetch Join 사용)

```java
@Service
@Transactional(readOnly = true)
public class MemberService {
    
    public List<MemberDto> getMembers() {
        // Fetch Join으로 한 번에 조회
        List<Member> members = memberRepository.findAllWithOrders(); // 1번 쿼리
        
        return members.stream()
            .map(member -> {
                // 추가 쿼리 없음
                List<Order> orders = member.getOrders();
                return new MemberDto(member.getName(), orders.size());
            })
            .collect(Collectors.toList());
    }
}

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query("SELECT DISTINCT m FROM Member m JOIN FETCH m.orders")
    List<Member> findAllWithOrders();
}
```

**쿼리 실행 횟수:** 1번

---

## 주의사항

### 1. 페이징 처리 시 주의

Fetch Join과 페이징을 함께 사용하면 문제가 발생할 수 있습니다:

```java
// ❌ 문제 발생
@Query("SELECT m FROM Member m JOIN FETCH m.orders")
Page<Member> findAllWithOrders(Pageable pageable);
```

이 경우 메모리에서 페이징 처리가 되어 성능 문제가 발생합니다.

**해결 방법:**
```java
// ✅ Batch Size 사용
@Query("SELECT m FROM Member m")
@EntityGraph(attributePaths = {"orders"})
Page<Member> findAll(Pageable pageable);
```

### 2. 여러 컬렉션 Fetch Join 시 주의

여러 컬렉션을 동시에 Fetch Join하면 카테시안 곱이 발생합니다:

```java
// ❌ 카테시안 곱 발생
@Query("SELECT m FROM Member m JOIN FETCH m.orders JOIN FETCH m.addresses")
List<Member> findAll();
```

**해결 방법:**
```java
// ✅ 각각 따로 조회
@Query("SELECT m FROM Member m JOIN FETCH m.orders")
List<Member> findAllWithOrders();

@Query("SELECT m FROM Member m JOIN FETCH m.addresses WHERE m IN :members")
List<Member> findAllWithAddresses(@Param("members") List<Member> members);
```

### 3. 성능 모니터링

실제로 N+1 문제가 발생하는지 확인하려면:

```yaml
spring:
  jpa:
    properties:
      hibernate:
        show_sql: true
        format_sql: true
        use_sql_comments: true
```

또는 로깅 설정:

```yaml
logging:
  level:
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
```

---

## 정리

면접을 통해 다시 한 번 정리해보니, N+1 문제는 JPA를 사용할 때 정말 흔히 발생하는 성능 문제라는 것을 느꼈습니다. 해결 방법은 상황에 따라 다르지만, 일반적으로는:

1. **Fetch Join** 또는 **@EntityGraph** 사용 (가장 일반적)
2. **Batch Size** 설정 (코드 변경 최소화)
3. **DTO 직접 조회** (최적의 성능이 필요한 경우)

각 방법의 장단점을 이해하고 상황에 맞게 선택하는 것이 중요하다고 생각해요. 또한 실제 운영 환경에서는 성능 테스트를 통해 쿼리 실행 횟수를 확인하고 최적화하는 것이 좋겠습니다.
