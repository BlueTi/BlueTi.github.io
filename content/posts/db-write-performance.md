---
emoji: 📝
title: DB 읽기는 빠른데 쓰기가 느릴 때 - 원인과 대처
date: '2026-01-20T00:00:00.000Z'
categories: 데이터베이스 면접
author: Jard
description: '면접에서 받았던 질문을 다시 정리하며, DB 읽기와 쓰기 성능 차이의 원인과 해결 방법을 알아봅니다.'
---

최근 면접에서 "데이터베이스에서 읽기는 빠른데 쓰기가 느릴 때의 원인과 대처 방법"에 대해 질문을 받았습니다. 평소에 성능 최적화에 관심이 많았지만, 막상 구체적인 원인과 해결책을 체계적으로 설명하려니 더 정리할 필요가 있다고 느꼈어요. 이번 기회에 제대로 정리해보면서, 다음에는 더 나은 답변을 할 수 있도록 준비해보려고 합니다.

데이터베이스 성능 문제는 실제 프로덕션 환경에서 자주 마주치는 이슈인데, 읽기와 쓰기의 성능 차이가 발생하는 이유와 해결 방법을 이해하는 것이 중요하다고 생각해요. 면접관님께서도 실제로 이런 문제를 경험하셨을 것 같습니다. 이번 글에서는 읽기는 빠른데 쓰기가 느릴 때의 원인과 대처 방법을 차근차근 정리해보겠습니다.

---

## 왜 읽기는 빠르고 쓰기는 느릴까?

데이터베이스에서 읽기와 쓰기의 성능 차이는 여러 요인에 의해 발생합니다. 가장 큰 차이점은 **작업의 복잡도와 안전성 보장** 때문이에요.

### 읽기 작업의 특징

- **단순한 작업**: 인덱스를 활용한 빠른 검색 가능
- **캐싱 활용**: 자주 읽는 데이터를 메모리에 캐싱하여 더 빠른 접근
- **동시성**: 여러 트랜잭션이 동시에 읽어도 충돌이 적음
- **롤백 불필요**: 읽기 작업은 데이터를 변경하지 않으므로 롤백이 필요 없음

### 쓰기 작업의 특징

- **복잡한 작업**: 데이터 검증, 인덱스 업데이트, 트랜잭션 로그 기록 등
- **안전성 보장**: ACID 속성 보장을 위한 추가 작업 필요
- **동시성 제어**: 락(Lock)을 통한 동시성 제어로 인한 대기 시간
- **영속성 보장**: 디스크에 실제로 기록해야 하므로 I/O 비용 발생

---

## 주요 원인들

### 1. 인덱스 오버헤드

쓰기 작업 시에는 데이터뿐만 아니라 관련된 모든 인덱스도 업데이트해야 해요.

**예시:**
```sql
-- 테이블에 5개의 인덱스가 있다면
INSERT INTO users (name, email, age, city, country) 
VALUES ('홍길동', 'hong@example.com', 30, '서울', '한국');
```

이 경우 실제로는:
- 1번의 데이터 삽입
- 5번의 인덱스 업데이트
- 총 6번의 디스크 I/O 발생

**대처 방법:**
- 불필요한 인덱스 제거
- 복합 인덱스 최적화
- 쓰기 작업이 많은 테이블은 인덱스 수 최소화

### 2. 트랜잭션 로그 기록

데이터베이스는 데이터 변경 사항을 트랜잭션 로그(Write-Ahead Log, WAL)에 먼저 기록해요. 이는 데이터 복구와 일관성을 보장하기 위한 필수 작업입니다.

**문제점:**
- 모든 쓰기 작업마다 로그 파일에 기록 필요
- 디스크 I/O가 발생하므로 상대적으로 느림
- 로그 파일이 커지면 성능 저하

**대처 방법:**
- 로그 파일을 SSD에 저장
- 로그 버퍼 크기 조정
- 배치 처리로 로그 기록 횟수 최소화

### 3. 락(Lock) 경합

여러 트랜잭션이 동시에 같은 데이터를 수정하려고 할 때 락 경합이 발생해요.

**예시:**
```sql
-- 트랜잭션 1
BEGIN;
UPDATE products SET stock = stock - 1 WHERE id = 1;
-- 락 획득 대기...

-- 트랜잭션 2
BEGIN;
UPDATE products SET stock = stock - 1 WHERE id = 1;
-- 트랜잭션 1이 끝날 때까지 대기...
```

**대처 방법:**
- 트랜잭션 범위 최소화
- 락 타임아웃 설정
- 낙관적 락(Optimistic Lock) 사용 고려
- 분산 락 사용 (Redis 등)

### 4. 디스크 I/O 병목

쓰기 작업은 데이터를 디스크에 영구 저장해야 하므로 물리적 디스크 I/O가 발생해요.

**읽기 vs 쓰기:**
- **읽기**: 메모리(캐시)에서 데이터를 가져오면 매우 빠름
- **쓰기**: 디스크에 실제로 기록해야 하므로 상대적으로 느림

**대처 방법:**
- SSD 사용
- RAID 구성 최적화
- 버퍼 풀 크기 증가
- 비동기 쓰기 활용

### 5. 외래 키 제약 조건 검증

외래 키가 있는 경우, 쓰기 작업 시 참조 무결성을 검증해야 해요.

**예시:**
```sql
-- orders 테이블에 user_id 외래 키가 있는 경우
INSERT INTO orders (user_id, product_id, quantity)
VALUES (999, 1, 2);
-- users 테이블에 id=999가 존재하는지 확인 필요
```

**대처 방법:**
- 불필요한 외래 키 제약 조건 제거 (애플리케이션 레벨에서 검증)
- 인덱스가 있는 외래 키만 사용
- 배치 처리 시 제약 조건 일시 비활성화

### 6. 트리거(Trigger) 실행

트리거가 설정된 테이블에 쓰기 작업을 하면 추가 로직이 실행되어요.

**대처 방법:**
- 불필요한 트리거 제거
- 트리거 로직 최적화
- 애플리케이션 레벨로 로직 이동 고려

---

## 실전 대처 방법

### 1. 배치 처리(Batch Processing)

여러 개의 작은 쓰기 작업을 하나의 큰 작업으로 묶어서 처리하면 성능이 크게 향상될 수 있어요.

**예시:**
```java
// ❌ 느린 방법: 개별 INSERT
for (User user : users) {
    userRepository.save(user); // 각각 트랜잭션
}

// ✅ 빠른 방법: 배치 INSERT
@Transactional
public void saveAllUsers(List<User> users) {
    userRepository.saveAll(users); // 한 번에 처리
}
```

**JPA 배치 설정:**
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

### 2. 인덱스 최적화

쓰기 성능이 중요한 테이블에서는 인덱스를 신중하게 설계해야 해요.

**원칙:**
- 읽기 성능이 중요하면 인덱스 추가
- 쓰기 성능이 중요하면 인덱스 최소화
- 복합 인덱스는 실제 쿼리 패턴에 맞게 설계

**예시:**
```sql
-- 불필요한 인덱스 제거
DROP INDEX idx_users_created_at ON users;

-- 복합 인덱스로 통합
CREATE INDEX idx_users_city_country ON users(city, country);
```

### 3. 비동기 처리

실시간 응답이 필요하지 않은 쓰기 작업은 비동기로 처리할 수 있어요.

**예시:**
```java
@Async
public CompletableFuture<Void> logUserActivity(UserActivity activity) {
    // 로그 기록은 비동기로 처리
    activityRepository.save(activity);
    return CompletableFuture.completedFuture(null);
}
```

### 4. 읽기/쓰기 분리 (Read Replica)

읽기 작업은 복제본(Replica)에서 처리하고, 쓰기 작업만 마스터에서 처리하는 방식이에요.

**장점:**
- 마스터 DB의 쓰기 부하 감소
- 읽기 성능 향상 (여러 Replica 활용)
- 가용성 향상

**구조:**
```
Master DB (쓰기 전용)
    ↓ 복제
Replica 1 (읽기)
Replica 2 (읽기)
Replica 3 (읽기)
```

### 5. 캐싱 전략

자주 읽는 데이터는 캐시에 저장하여 읽기 성능을 향상시키고, 쓰기 작업 시에는 캐시를 무효화해요.

**예시:**
```java
@Cacheable(value = "users", key = "#id")
public User getUser(Long id) {
    return userRepository.findById(id);
}

@CacheEvict(value = "users", key = "#user.id")
public User updateUser(User user) {
    return userRepository.save(user);
}
```

### 6. 트랜잭션 범위 최소화

트랜잭션이 길수록 락을 오래 유지하게 되어 다른 트랜잭션의 대기 시간이 늘어나요.

**예시:**
```java
// ❌ 나쁜 예: 트랜잭션이 너무 김
@Transactional
public void processOrder(Order order) {
    // 복잡한 비즈니스 로직
    validateOrder(order);
    calculatePrice(order);
    updateInventory(order);
    sendEmail(order); // 네트워크 I/O
    saveOrder(order);
}

// ✅ 좋은 예: 트랜잭션 범위 최소화
public void processOrder(Order order) {
    validateOrder(order);
    calculatePrice(order);
    updateInventory(order);
    
    // DB 작업만 트랜잭션으로
    saveOrderInTransaction(order);
    
    // 트랜잭션 외부에서 처리
    sendEmailAsync(order);
}
```

### 7. 커넥션 풀 최적화

적절한 커넥션 풀 크기를 설정하여 동시 쓰기 작업을 효율적으로 처리할 수 있어요.

**설정 예시:**
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
```

---

## 모니터링과 진단

실제로 문제가 발생했을 때 원인을 파악하는 방법이에요.

### 1. 느린 쿼리 로그 확인

```sql
-- MySQL
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1; -- 1초 이상 걸리는 쿼리

-- PostgreSQL
ALTER SYSTEM SET log_min_duration_statement = 1000; -- 1초
```

### 2. 락 상태 확인

```sql
-- MySQL
SHOW PROCESSLIST;
SHOW ENGINE INNODB STATUS;

-- PostgreSQL
SELECT * FROM pg_locks;
SELECT * FROM pg_stat_activity;
```

### 3. 인덱스 사용률 확인

```sql
-- MySQL
SHOW INDEX FROM table_name;

-- PostgreSQL
SELECT * FROM pg_stat_user_indexes;
```

---

## 정리

다시 한 번 정리해보니, DB 읽기와 쓰기 성능 차이는 여러 복합적인 요인에 의해 발생한다는 것을 느꼈습니다. 주요 원인은:

1. **인덱스 오버헤드** - 쓰기 시 모든 인덱스 업데이트 필요
2. **트랜잭션 로그 기록** - 안전성을 위한 필수 작업
3. **락 경합** - 동시성 제어로 인한 대기 시간
4. **디스크 I/O** - 물리적 저장소에 기록하는 비용
5. **제약 조건 검증** - 데이터 무결성 보장을 위한 추가 작업

대처 방법으로는:
- **배치 처리**로 I/O 횟수 최소화
- **인덱스 최적화**로 불필요한 오버헤드 제거
- **읽기/쓰기 분리**로 부하 분산
- **트랜잭션 범위 최소화**로 락 경합 감소
- **비동기 처리**로 응답 시간 개선
