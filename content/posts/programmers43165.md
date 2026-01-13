---
emoji: 🧢
title: 타겟 넘버
date: '2021-04-09T16:19:37.121Z'
categories: 알고리즘
author: Jard
description: '프로그래머스 DFS/BFS 연습문제'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/43165)

<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/43165">https://programmers.co.kr/learn/courses/30/lessons/43165</a></div>

---

- 깊이 우선 탐색을 이용하여 파고 내려가면서 결과를 도출하게 만든다.
- 첫번째 값부터 +,- 로 갈라져 내려가게 만든다.
- 덧셈이 먼저 나오고 그 다음 +,-로 가른 다음 다시 +으로 인덱스만큼 반복.
- 반복이 끝날때 목표값과 같은지 확인.

---

```java
/**
 * 타겟 넘버 문제 해결
 * 숫자 배열에 + 또는 -를 붙여서 타겟 넘버를 만드는 방법의 개수를 구하는 문제
 * DFS를 사용하여 모든 경우의 수를 탐색
 */
class Solution {
    int answer = 0; // 타겟 넘버를 만드는 방법의 개수

    public int solution(int[] numbers, int target) {
        // DFS 시작: 현재 합 0, 인덱스 0부터 시작
        dfs(numbers, target, 0, 0);
        return answer;
    }

    /**
     * DFS를 사용하여 모든 경우의 수를 탐색
     * @param numbers: 숫자 배열
     * @param target: 목표 값
     * @param sum: 현재까지의 합
     * @param index: 현재 처리할 인덱스
     */
    public void dfs(int[] numbers, int target, int sum, int index) {
        // 모든 숫자를 처리했으면
        if (index >= numbers.length) {
            if (sum == target) // 합이 타겟과 같으면
                answer++; // 방법 개수 증가
            return;
        }

        // 현재 숫자를 더하는 경우
        dfs(numbers, target, sum + numbers[index], index + 1);
        // 현재 숫자를 빼는 경우
        dfs(numbers, target, sum - numbers[index], index + 1);
    }
}
```
