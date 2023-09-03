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
class Solution {
    int answer = 0;

    public int solution(int[] numbers, int target) {
        dfs(numbers, target, 0, 0);
        return answer;
    }

    public void dfs(int[] numbers, int target, int sum, int index) {
        if (index >= numbers.length) {
            if (sum == target)
                answer++;
            return;
        }

        dfs(numbers, target, sum + numbers[index], index + 1);
        dfs(numbers, target, sum - numbers[index], index + 1);
    }
}
```
