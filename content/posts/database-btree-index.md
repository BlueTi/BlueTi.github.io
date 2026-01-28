---
emoji: 🌳
title: 데이터베이스 인덱싱 - B-Tree의 원리와 동작 방식
date: '2026-01-27T00:00:00.000Z'
categories: 데이터베이스 면접
author: Jard
description: '데이터베이스 인덱스가 어떻게 동작하는지, B-Tree 구조가 왜 인덱싱에 적합한지 알아봅니다.'
---

면접에서 "인덱스가 어떻게 동작하나요?"라는 질문을 받았을 때, "B-Tree 구조를 사용해서 빠르게 검색할 수 있습니다"라고 답했지만, 구체적으로 B-Tree가 무엇인지, 왜 인덱싱에 적합한지 명확하게 설명하지 못했습니다. 평소에 인덱스를 사용하면서도 내부 동작 원리를 제대로 이해하지 못하고 있었던 것 같습니다.

데이터베이스 인덱스는 쿼리 성능을 결정하는 핵심 요소입니다. 수백만, 수천만 건의 데이터에서 원하는 레코드를 빠르게 찾기 위해서는 인덱스가 필수적이에요. 이번 글에서는 B-Tree 구조가 어떻게 동작하는지, 왜 데이터베이스 인덱싱에 적합한지 차근차근 알아보겠습니다.

---

## 인덱스가 필요한 이유

### 인덱스 없이 검색하는 경우

인덱스가 없는 테이블에서 데이터를 찾으려면 **전체 테이블 스캔(Full Table Scan)**이 필요합니다.

```sql
-- 인덱스가 없는 users 테이블
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT
);

-- email로 검색 (인덱스 없음)
SELECT * FROM users WHERE email = 'user@example.com';
```

**동작 과정:**
1. 첫 번째 행부터 마지막 행까지 순차적으로 검색
2. 각 행의 email 컬럼을 비교
3. 일치하는 행을 찾을 때까지 계속 검색

**시간 복잡도:** O(n) - 최악의 경우 모든 행을 확인해야 함

**예시:**
- 1,000만 건의 데이터에서 특정 email 찾기
- 평균적으로 500만 건을 확인해야 함
- 매우 느림!

### 인덱스가 있는 경우

인덱스가 있으면 **B-Tree 구조**를 활용하여 빠르게 검색할 수 있습니다.

```sql
-- email에 인덱스 생성
CREATE INDEX idx_email ON users(email);

-- 같은 쿼리 실행
SELECT * FROM users WHERE email = 'user@example.com';
```

**시간 복잡도:** O(log n) - 트리 구조를 따라 내려가면서 검색

**예시:**
- 1,000만 건의 데이터에서 특정 email 찾기
- 약 24번의 비교만 필요 (log₂(10,000,000) ≈ 24)
- 매우 빠름!

---

## B-Tree란?

B-Tree(Balanced Tree)는 **균형 잡힌 다진 트리**입니다. 데이터베이스 인덱싱에서 가장 널리 사용되는 자료구조예요.

### B-Tree의 특징

1. **균형 잡힌 트리**: 모든 리프 노드가 같은 깊이에 있음
2. **다진 트리**: 각 노드가 여러 개의 자식 노드를 가질 수 있음
3. **정렬된 데이터**: 노드 내의 키가 정렬되어 있음
4. **최소/최대 차수**: 각 노드는 최소 t개, 최대 2t-1개의 키를 가짐 (t는 최소 차수)

### B-Tree 구조 예시

```
                    [50]
                   /    \
              [20, 30]  [70, 80]
              /  |  \    /  |  \
        [10] [25] [40] [60] [75] [90]
```

**노드 구조:**
- **내부 노드**: 키 값과 자식 노드에 대한 포인터
- **리프 노드**: 키 값과 실제 데이터에 대한 포인터

---

## B-Tree의 동작 원리

### 1. 검색 (Search)

B-Tree에서 데이터를 찾는 과정:

```
검색: email = 'user@example.com'
```

**과정:**
1. 루트 노드에서 시작
2. 노드 내의 키들을 순차적으로 비교
3. 찾는 값보다 작은 키를 만나면 왼쪽 자식으로
4. 찾는 값보다 큰 키를 만나면 오른쪽 자식으로
5. 리프 노드에 도달할 때까지 반복
6. 리프 노드에서 최종 비교 후 데이터 반환

**예시:**
```
루트: [apple, dog, house]
      /     |      \
   [a-c]  [d-g]  [h-z]

검색: 'elephant'
1. 루트에서 'elephant' > 'dog' → 오른쪽 자식
2. [d-g] 노드에서 'elephant' < 'g' → 왼쪽 자식
3. 리프 노드에서 'elephant' 찾기
```

### 2. 삽입 (Insert)

새로운 데이터를 삽입하는 과정:

**과정:**
1. 검색과 동일하게 리프 노드까지 이동
2. 리프 노드에 키 삽입
3. 노드가 가득 찬 경우 (2t-1개 초과):
   - 노드를 분할 (Split)
   - 중간 키를 부모 노드로 올림
   - 나머지 키들을 두 개의 자식 노드로 분배

**예시:**
```
삽입 전:
        [50]
       /    \
   [20, 30] [70]

삽입: 25
1. [20, 30] 노드에 25 삽입 → [20, 25, 30]
2. 노드가 가득 참 (최대 2개였는데 3개가 됨)
3. 중간 값 25를 부모로 올림

삽입 후:
        [25, 50]
       /   |   \
    [20] [30] [70]
```

### 3. 삭제 (Delete)

데이터를 삭제하는 과정:

**과정:**
1. 삭제할 키를 찾음
2. 리프 노드인 경우: 바로 삭제
3. 내부 노드인 경우:
   - 왼쪽 자식의 최대값 또는 오른쪽 자식의 최소값으로 대체
   - 대체된 값을 리프 노드에서 삭제
4. 노드의 키가 최소값 미만이 되면:
   - 형제 노드에서 빌리기 (Borrow)
   - 형제 노드도 부족하면 병합 (Merge)

---

## B-Tree가 인덱싱에 적합한 이유

### 1. 균형 잡힌 구조

모든 리프 노드가 같은 깊이에 있어서 **일관된 성능**을 보장합니다.

```
균형 잡힌 트리 (B-Tree):
        [50]
       /    \
    [25]   [75]
   /  \    /  \
 [10] [30] [60] [90]
깊이: 모두 3

불균형 트리:
     [50]
    /
  [25]
 /
[10]
깊이: 1, 2, 3 (불균형)
```

**장점:**
- 최악의 경우에도 O(log n) 시간 복잡도 보장
- 예측 가능한 성능

### 2. 디스크 I/O 최소화

B-Tree는 **노드 크기를 페이지 크기에 맞춤**으로써 디스크 I/O를 최소화합니다.

**디스크 접근 특성:**
- 디스크 읽기는 느림 (메모리보다 수백 배 느림)
- 순차 접근보다 랜덤 접근이 더 느림
- 한 번에 많은 데이터를 읽는 것이 효율적

**B-Tree의 최적화:**
```
노드 크기 = 디스크 페이지 크기 (보통 4KB, 8KB, 16KB)

한 노드에 여러 키 저장:
[키1, 키2, 키3, ..., 키100]  ← 한 번의 디스크 읽기로 100개 키 접근 가능
```

**비교:**
- 이진 트리: 노드당 1개 키 → 100개 키 찾으려면 100번의 디스크 읽기
- B-Tree: 노드당 100개 키 → 100개 키 찾으려면 1번의 디스크 읽기

### 3. 범위 검색에 효율적

B-Tree는 **정렬된 구조**이기 때문에 범위 검색에 매우 효율적입니다.

```sql
-- 범위 검색
SELECT * FROM users 
WHERE age BETWEEN 20 AND 30;
```

**동작 과정:**
1. age = 20인 첫 번째 레코드 찾기
2. 리프 노드를 순차적으로 탐색
3. age = 30을 넘을 때까지 계속
4. 중간 노드로 돌아갈 필요 없음

**장점:**
- 리프 노드들이 연결 리스트처럼 연결되어 있음
- 순차 접근이 매우 빠름

### 4. 부분 일치 검색 지원

B-Tree는 **왼쪽부터의 부분 일치**를 효율적으로 처리할 수 있습니다.

```sql
-- LIKE 검색 (인덱스 활용 가능)
SELECT * FROM users 
WHERE email LIKE 'user%';  -- 왼쪽 일치

-- 인덱스 활용 불가
SELECT * FROM users 
WHERE email LIKE '%user';  -- 오른쪽 일치
```

**이유:**
- B-Tree는 왼쪽부터 정렬되어 있음
- 'user%'는 'user'로 시작하는 모든 값을 찾으면 됨
- '%user'는 전체를 스캔해야 함

---

## B-Tree 인덱스의 실제 동작

### MySQL InnoDB의 B-Tree 인덱스

MySQL의 InnoDB 스토리지 엔진은 **B+Tree**를 사용합니다. B+Tree는 B-Tree의 변형으로, 모든 데이터가 리프 노드에만 저장됩니다.

**B+Tree 구조:**
```
                    [50]
                   /    \
              [20, 30]  [70, 80]
              /  |  \    /  |  \
        [10→] [25→] [40→] [60→] [75→] [90→]
         ↓     ↓     ↓     ↓     ↓     ↓
       [데이터 포인터들...]
```

**B+Tree의 특징:**
- 내부 노드: 키 값만 저장 (검색 경로 제공)
- 리프 노드: 키 값 + 실제 데이터 포인터
- 리프 노드들이 연결 리스트로 연결됨

**장점:**
- 범위 검색이 더 효율적
- 내부 노드에 더 많은 키 저장 가능 (더 적은 깊이)

### 인덱스 사용 예시

```sql
-- 테이블 생성
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    category_id INT,
    created_at DATETIME
);

-- 인덱스 생성
CREATE INDEX idx_category ON products(category_id);
CREATE INDEX idx_price ON products(price);
CREATE INDEX idx_name ON products(name);

-- 쿼리 1: 인덱스 활용
SELECT * FROM products 
WHERE category_id = 5;
-- → idx_category 인덱스 사용

-- 쿼리 2: 인덱스 활용
SELECT * FROM products 
WHERE price BETWEEN 1000 AND 5000;
-- → idx_price 인덱스 사용

-- 쿼리 3: 인덱스 활용 불가
SELECT * FROM products 
WHERE name LIKE '%phone%';
-- → 전체 테이블 스캔 (인덱스 사용 불가)
```

---

## B-Tree 인덱스의 한계

### 1. 쓰기 성능 저하

인덱스가 많을수록 **INSERT, UPDATE, DELETE** 성능이 저하됩니다.

**이유:**
- 데이터 변경 시 관련된 모든 인덱스도 업데이트해야 함
- B-Tree 구조를 유지하기 위한 추가 작업 필요

**예시:**
```sql
-- 5개의 인덱스가 있는 테이블에 INSERT
INSERT INTO users (name, email, age, city, country) 
VALUES ('홍길동', 'hong@example.com', 30, '서울', '한국');

-- 실제로는:
-- 1. 데이터 삽입
-- 2. name 인덱스 업데이트
-- 3. email 인덱스 업데이트
-- 4. age 인덱스 업데이트
-- 5. city 인덱스 업데이트
-- 6. country 인덱스 업데이트
-- 총 6번의 작업 필요!
```

### 2. 저장 공간 사용

인덱스는 **추가 저장 공간**을 사용합니다.

**예시:**
- 원본 테이블: 1GB
- 인덱스 5개: 각각 200MB
- 총 저장 공간: 1GB + (200MB × 5) = 2GB

### 3. 선택적 인덱스

**선택도(Cardinality)**가 낮은 컬럼에는 인덱스가 비효율적입니다.

```sql
-- 선택도가 낮은 예시
CREATE TABLE users (
    gender ENUM('M', 'F'),  -- 2개의 값만 존재
    is_active BOOLEAN       -- 2개의 값만 존재
);

-- 인덱스가 비효율적
CREATE INDEX idx_gender ON users(gender);
-- → 인덱스를 사용해도 절반의 데이터를 스캔해야 함
-- → 전체 테이블 스캔과 성능 차이가 거의 없음
```

---

## 인덱스 설계 전략

### 1. 자주 사용되는 컬럼에 인덱스 생성

```sql
-- WHERE 절에서 자주 사용되는 컬럼
SELECT * FROM orders WHERE user_id = 123;
-- → user_id에 인덱스 생성

-- JOIN에 사용되는 컬럼
SELECT * FROM orders o
JOIN users u ON o.user_id = u.id;
-- → user_id에 인덱스 생성
```

### 2. 복합 인덱스 활용

여러 컬럼을 함께 사용하는 경우 **복합 인덱스**를 생성합니다.

```sql
-- 복합 인덱스 생성
CREATE INDEX idx_user_date ON orders(user_id, created_at);

-- 효율적인 쿼리
SELECT * FROM orders 
WHERE user_id = 123 AND created_at > '2024-01-01';
-- → 인덱스 활용

-- 비효율적인 쿼리
SELECT * FROM orders 
WHERE created_at > '2024-01-01';
-- → 인덱스 활용 불가 (첫 번째 컬럼이 없음)
```

**복합 인덱스의 규칙:**
- 왼쪽부터 순서대로 사용해야 함
- `(A, B, C)` 인덱스는 다음 쿼리에 활용 가능:
  - `WHERE A = ?`
  - `WHERE A = ? AND B = ?`
  - `WHERE A = ? AND B = ? AND C = ?`
- 다음 쿼리에는 활용 불가:
  - `WHERE B = ?`
  - `WHERE C = ?`
  - `WHERE B = ? AND C = ?`

### 3. 커버링 인덱스

인덱스만으로 쿼리를 처리할 수 있으면 **커버링 인덱스**라고 합니다.

```sql
-- 커버링 인덱스
CREATE INDEX idx_user_email ON users(user_id, email);

-- 커버링 인덱스 활용
SELECT user_id, email FROM users WHERE user_id = 123;
-- → 인덱스만 읽고 데이터 테이블 접근 불필요
-- → 매우 빠름!
```

### 4. 인덱스 모니터링

인덱스 사용 여부를 확인하고 필요 없는 인덱스는 제거합니다.

```sql
-- MySQL: 인덱스 사용 통계 확인
SHOW INDEX FROM users;

-- 사용되지 않는 인덱스 확인
SELECT * FROM sys.schema_unused_indexes;
```

---

## B-Tree vs 다른 인덱스 구조

### B-Tree vs Hash Index

**Hash Index:**
- 등호 검색(=)에 매우 빠름: O(1)
- 범위 검색 불가
- 정렬 불가

**B-Tree:**
- 등호 검색: O(log n)
- 범위 검색 가능
- 정렬 가능

**사용 사례:**
- Hash Index: 메모리 테이블, 정확한 일치 검색만 필요한 경우
- B-Tree: 일반적인 데이터베이스 인덱스

### B-Tree vs Bitmap Index

**Bitmap Index:**
- 선택도가 매우 낮은 컬럼에 적합
- 여러 조건의 AND/OR 연산에 효율적
- 쓰기 성능이 매우 느림

**B-Tree:**
- 일반적인 용도에 적합
- 쓰기 성능이 상대적으로 좋음

**사용 사례:**
- Bitmap Index: 데이터 웨어하우스, OLAP 시스템
- B-Tree: OLTP 시스템, 일반적인 애플리케이션

---

## 실전 팁

### 1. EXPLAIN으로 인덱스 사용 확인

```sql
-- 쿼리 실행 계획 확인
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';

-- 결과:
-- type: ref (인덱스 사용)
-- key: idx_email
-- rows: 1 (검색한 행 수)
```

### 2. 인덱스 통계 업데이트

```sql
-- MySQL: 인덱스 통계 업데이트
ANALYZE TABLE users;

-- PostgreSQL: 인덱스 통계 업데이트
ANALYZE users;
```

### 3. 인덱스 재구성

인덱스가 파편화되면 성능이 저하될 수 있습니다.

```sql
-- MySQL: 인덱스 재구성
OPTIMIZE TABLE users;

-- PostgreSQL: 인덱스 재구성
REINDEX TABLE users;
```

---

## 마무리

B-Tree는 데이터베이스 인덱싱의 핵심 자료구조입니다. 균형 잡힌 구조와 디스크 I/O 최소화를 통해 빠른 검색 성능을 제공하죠.

면접에서 B-Tree에 대해 질문을 받는다면:
- **구조**: 균형 잡힌 다진 트리, 정렬된 데이터
- **동작**: 검색 O(log n), 삽입/삭제 시 분할/병합
- **장점**: 일관된 성능, 디스크 I/O 최소화, 범위 검색 효율적
- **한계**: 쓰기 성능 저하, 저장 공간 사용

이런 내용들을 설명할 수 있다면 좋은 답변이 될 것 같습니다. B-Tree는 단순히 "트리 구조"를 넘어서, 디스크 기반 저장소의 특성을 고려한 정교한 설계입니다. 인덱스를 올바르게 설계하고 사용하면 쿼리 성능을 크게 향상시킬 수 있어요.

---

## 참고 자료

- [MySQL InnoDB 인덱스 구조](https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html)
- [PostgreSQL B-Tree 인덱스](https://www.postgresql.org/docs/current/indexes-types.html)
- [Database Indexing Explained](https://www.freecodecamp.org/news/database-indexing-at-a-glance-bb50809d48bd/)
