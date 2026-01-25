---
emoji: ⚡
title: Java JIT 컴파일러 - 성능 최적화의 핵심
date: '2026-01-24T00:00:00.000Z'
categories: Java 면접
author: Jard
description: 'Java의 JIT 컴파일러가 어떻게 동작하는지, 그리고 왜 Java가 빠른 성능을 보이는지 알아봅니다.'
---

최근 면접에 관한 이야기를 나누며 Java를 사용하면서 "Java는 느리다"는 말을 종종 듣곤 듣지만 실제로는 Java가 나쁘지 않은 성능을 보이는 언어인데, 그 핵심에는 **JIT(Just-In-Time) 컴파일러**가 있습니다. 면접에서 JIT 컴파일러에 대해 질문을 받았을 때, 단순히 "런타임에 바이트코드를 네이티브 코드로 변환한다"는 정도만 알고 있었던 것 같아요. 이번 기회에 JIT 컴파일러가 정확히 어떻게 동작하는지, 어떤 최적화를 수행하는지 제대로 정리해보려고 합니다.

JIT 컴파일러는 Java의 성능을 결정하는 핵심 요소입니다. 초기에는 인터프리터로 실행되다가, 자주 사용되는 코드를 감지하여 네이티브 코드로 컴파일하는 방식으로 동작해요. 이 과정에서 다양한 최적화 기법이 적용되어, 때로는 C++ 같은 네이티브 언어와도 비교할 만한 성능을 보이기도 합니다. 이번 글에서는 JIT 컴파일러의 동작 원리와 최적화 기법을 차근차근 알아보겠습니다.

---

## JIT 컴파일러란?

JIT(Just-In-Time) 컴파일러는 프로그램 실행 중에 바이트코드를 네이티브 머신 코드로 컴파일하는 컴파일러입니다. "Just-In-Time"이라는 이름은 "필요할 때 바로" 컴파일한다는 의미에서 붙여졌어요.

### 컴파일 방식 비교

Java의 실행 과정을 다른 언어들과 비교해보면:

**C/C++ (AOT 컴파일)**
```
소스 코드 → 컴파일 → 네이티브 코드 → 실행
```
- 실행 전에 미리 컴파일
- 빠른 실행 속도
- 플랫폼별로 컴파일 필요

**전통적인 인터프리터 언어 (Python, JavaScript)**
```
소스 코드 → 바이트코드/중간 코드 → 인터프리터 → 실행
```
- 실행 시 한 줄씩 해석
- 느린 실행 속도
- 플랫폼 독립적

**Java (JIT 컴파일)**
```
소스 코드 → 바이트코드 → 인터프리터 → JIT 컴파일러 → 네이티브 코드 → 실행
```
- 초기에는 인터프리터로 실행
- 자주 사용되는 코드는 JIT 컴파일러가 네이티브 코드로 변환
- 플랫폼 독립적이면서도 빠른 성능

---

## JIT 컴파일러의 동작 원리

### 1. 인터프리터 단계

Java 프로그램이 처음 실행될 때는 인터프리터가 바이트코드를 한 줄씩 해석하며 실행합니다.

```java
public class Example {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 0; i < 1000000; i++) {
            sum += i;
        }
        System.out.println(sum);
    }
}
```

이 코드가 처음 실행될 때:
1. 인터프리터가 바이트코드를 해석하며 실행
2. 각 명령어를 하나씩 처리하므로 상대적으로 느림
3. JVM이 메서드 호출 횟수를 카운팅

### 2. 프로파일링 단계

JVM은 각 메서드의 실행 횟수를 추적합니다. 특정 임계값을 넘어서면 해당 메서드를 "Hot Spot"으로 판단합니다.

**Hot Spot 판단 기준:**
- **메서드 호출 횟수**: `-XX:CompileThreshold` (기본값: 10,000번)
- **백에지 카운터(Backedge Counter)**: 루프의 반복 횟수

### 3. 컴파일 단계

Hot Spot으로 판단된 메서드는 백그라운드에서 네이티브 코드로 컴파일됩니다.

```
인터프리터 실행 중...
→ 메서드 호출 10,000번 도달
→ JIT 컴파일러가 백그라운드에서 컴파일 시작
→ 컴파일 완료 후 네이티브 코드로 교체
→ 이후부터는 네이티브 코드로 실행 (훨씬 빠름!)
```

---

## JIT 컴파일러의 최적화 기법

JIT 컴파일러는 컴파일 시점에 다양한 최적화를 수행합니다. 이는 AOT 컴파일러보다 유리한 점인데, 런타임 정보를 활용할 수 있기 때문입니다.

### 1. 인라인화 (Inlining)

작은 메서드를 호출하는 대신 메서드 본문을 직접 삽입합니다.

**최적화 전:**
```java
public int add(int a, int b) {
    return a + b;
}

public void calculate() {
    int result = add(5, 3);  // 메서드 호출 오버헤드
}
```

**최적화 후 (개념적):**
```java
public void calculate() {
    int result = 5 + 3;  // 인라인화로 메서드 호출 제거
}
```

**장점:**
- 메서드 호출 오버헤드 제거
- 추가 최적화 기회 제공

### 2. 루프 최적화 (Loop Optimization)

#### 루프 언롤링 (Loop Unrolling)
```java
// 최적화 전
for (int i = 0; i < 4; i++) {
    array[i] = i;
}

// 최적화 후 (개념적)
array[0] = 0;
array[1] = 1;
array[2] = 2;
array[3] = 3;
```

#### 루프 변수 최적화
```java
// 최적화 전
for (int i = 0; i < array.length; i++) {
    sum += array[i];
}

// 최적화 후 (개념적)
int length = array.length;  // 길이를 변수로 추출
for (int i = 0; i < length; i++) {
    sum += array[i];
}
```

### 3. 데드 코드 제거 (Dead Code Elimination)

실행되지 않는 코드를 제거합니다.

```java
public void example() {
    int x = 10;
    if (false) {  // 항상 false
        x = 20;   // 데드 코드
    }
    System.out.println(x);
}

// 최적화 후
public void example() {
    int x = 10;
    System.out.println(x);
}
```

### 4. 상수 폴딩 (Constant Folding)

컴파일 시점에 상수 표현식을 계산합니다.

```java
// 최적화 전
int result = 2 + 3 * 4;

// 최적화 후
int result = 14;
```

### 5. 공통 부분식 제거 (Common Subexpression Elimination)

동일한 표현식을 여러 번 계산하지 않도록 합니다.

```java
// 최적화 전
int a = x * y + z;
int b = x * y + w;  // x * y가 중복 계산

// 최적화 후
int temp = x * y;
int a = temp + z;
int b = temp + w;
```

### 6. 가상 메서드 인라인화 (Virtual Method Inlining)

런타임 정보를 활용하여 가상 메서드 호출을 최적화합니다.

```java
interface Animal {
    void makeSound();
}

class Dog implements Animal {
    public void makeSound() {
        System.out.println("Woof");
    }
}

// 실제로 Dog 객체만 사용된다면
Animal animal = new Dog();
animal.makeSound();  // 가상 메서드 호출 → 직접 호출로 최적화 가능
```

JIT 컴파일러는 실제로 어떤 타입이 사용되는지 관찰하고, 단일 구현만 사용된다면 가상 메서드 호출을 직접 호출로 변환할 수 있습니다.

### 7. 배열 범위 체크 제거 (Bounds Check Elimination)

배열 접근 시 범위 체크를 제거할 수 있는 경우 최적화합니다.

```java
// 최적화 전
for (int i = 0; i < array.length; i++) {
    array[i] = i;  // 매번 범위 체크
}

// 최적화 후 (개념적)
// i < array.length 조건이 이미 확인되었으므로
// 내부 루프에서는 범위 체크 생략 가능
```

---

## JIT 컴파일러의 단계적 최적화

JVM은 두 가지 JIT 컴파일러를 사용합니다:

### C1 컴파일러 (클라이언트 컴파일러)
- 빠른 컴파일 속도
- 기본적인 최적화만 수행
- 작은 메서드나 자주 호출되지 않는 메서드에 사용

### C2 컴파일러 (서버 컴파일러)
- 느린 컴파일 속도
- 고급 최적화 수행
- Hot Spot 메서드에 사용

### Tiered Compilation (단계적 컴파일)

Java 7부터 기본적으로 활성화된 방식입니다:

```
1단계: 인터프리터 실행
2단계: C1 컴파일러로 빠르게 컴파일 (레벨 1-3)
3단계: 더 많은 프로파일링 정보 수집
4단계: C2 컴파일러로 고급 최적화 (레벨 4)
```

이 방식으로 빠른 시작 시간과 높은 최종 성능을 모두 확보할 수 있습니다.

---

## JIT 컴파일러 최적화 확인하기

### JVM 옵션으로 컴파일 정보 확인

```bash
# 컴파일된 메서드 정보 출력
java -XX:+PrintCompilation YourClass

# 더 자세한 정보
java -XX:+PrintCompilation -XX:+UnlockDiagnosticVMOptions -XX:+PrintInlining YourClass
```

**출력 예시:**
```
    567   23       3       java.lang.String::hashCode (55 bytes)
    568   24       3       java.util.HashMap::hash (20 bytes)
    569   25       1       java.lang.String::charAt (29 bytes)
```

- 첫 번째 숫자: 컴파일 순서
- 두 번째 숫자: 컴파일 ID
- 세 번째 숫자: 컴파일 레벨 (1=C1, 4=C2)
- 네 번째: 메서드 정보

### JITWatch 사용

JITWatch는 JIT 컴파일러의 최적화 과정을 시각화해주는 도구입니다.

```bash
# JIT 로그 생성
java -XX:+UnlockDiagnosticVMOptions -XX:+LogCompilation -XX:+PrintCompilation YourClass

# JITWatch로 분석
java -jar jitwatch.jar
```

---

## JIT 컴파일러의 한계

JIT 컴파일러도 완벽하지는 않습니다:

### 1. 워밍업 시간

프로그램 시작 시에는 인터프리터로 실행되므로 초기 성능이 낮습니다. JIT 컴파일이 완료될 때까지 시간이 필요합니다.

**해결책:**
- AOT 컴파일 (Java 9+): `jaotc` 도구로 미리 컴파일
- GraalVM Native Image: 네이티브 이미지 생성

### 2. 메모리 사용

컴파일된 네이티브 코드를 저장하기 위한 메모리가 필요합니다.

### 3. 역최적화 (Deoptimization)

최적화 가정이 틀렸을 때 네이티브 코드를 버리고 인터프리터로 되돌아가는 과정이 발생할 수 있습니다.

```java
// 처음에는 Dog만 사용
Animal animal = new Dog();
animal.makeSound();  // Dog.makeSound()로 인라인화

// 나중에 Cat도 사용
animal = new Cat();
animal.makeSound();  // 역최적화 발생! 인터프리터로 되돌아감
```

---

## 실전 팁

### 1. 워밍업 고려

성능 테스트나 벤치마크에서는 JIT 컴파일이 완료된 후 측정해야 합니다.

```java
// 잘못된 벤치마크
public static void main(String[] args) {
    long start = System.nanoTime();
    // 테스트 코드
    long end = System.nanoTime();
    System.out.println(end - start);  // JIT 컴파일 시간 포함!
}

// 올바른 벤치마크
public static void main(String[] args) {
    // 워밍업
    for (int i = 0; i < 10000; i++) {
        // 테스트 코드 실행
    }
    
    // 실제 측정
    long start = System.nanoTime();
    // 테스트 코드
    long end = System.nanoTime();
    System.out.println(end - start);
}
```

### 2. JVM 튜닝

```bash
# 컴파일 임계값 조정
-XX:CompileThreshold=5000

# C1/C2 컴파일러 선택
-XX:+TieredCompilation  # 단계적 컴파일 (기본값)
-XX:-TieredCompilation  # C2만 사용

# 컴파일 스레드 수
-XX:CICompilerCount=2
```

### 3. 코드 작성 시 고려사항

- **작은 메서드**: 인라인화에 유리
- **예측 가능한 코드**: 분기 예측 최적화에 유리
- **로컬 변수 사용**: 스택 접근이 힙 접근보다 빠름

---

## 마무리

JIT 컴파일러는 Java의 성능을 결정하는 핵심 요소입니다. 인터프리터로 시작하여 자주 사용되는 코드를 네이티브 코드로 컴파일하고, 다양한 최적화 기법을 적용하여 높은 성능을 달성합니다.

면접에서 JIT 컴파일러에 대해 질문을 받는다면:
- **동작 원리**: 인터프리터 → 프로파일링 → 컴파일
- **최적화 기법**: 인라인화, 루프 최적화, 상수 폴딩 등
- **단계적 컴파일**: C1과 C2 컴파일러의 역할
- **한계**: 워밍업 시간, 역최적화

이런 내용들을 설명할 수 있다면 좋은 답변이 될 것 같습니다. JIT 컴파일러는 단순히 "바이트코드를 네이티브 코드로 변환한다"는 것을 넘어서, 런타임 정보를 활용한 지능적인 최적화를 수행하는 정교한 시스템입니다.

---

## 참고 자료

- [Oracle JVM 문서](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/)
- [JITWatch 공식 사이트](https://github.com/AdoptOpenJDK/jitwatch)
- [Java Performance Tuning Guide](https://www.oracle.com/java/technologies/javase/performance.html)
