---
emoji: 🧢
title: '정수 삼각형'
date: '2021-05-27T02:20:37.121Z'
categories: 알고리즘
author: Jard
description: '프로그래머스 큐 연습문제'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/43105)

## <div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/43105">https://programmers.co.kr/learn/courses/30/lessons/43105</a></div>

- 삼각형의 밑바닥부터 훑고 올라간다.
- 맨 밑 우측 끝의 두값을 비교해서 위에 칸에 더해준다.
- 최대 값은 자연스럽게 0,0에 들어가게 된다.

```java
/**
 * 정수 삼각형 문제 해결
 * 삼각형의 꼭대기에서 바닥까지 내려올 때, 거쳐간 숫자의 합이 최대가 되는 경로를 찾는 문제
 * 다이나믹 프로그래밍: 아래에서 위로 올라가며 최대값 계산
 */
class Solution {
    public int solution(int[][] triangle) {
        int len = triangle.length;
        int[][] dp = new int[len][len]; // dp[i][j]: i행 j열까지의 최대 합
        
        // 맨 밑바닥은 그대로 초기화
        dp[len - 1] = triangle[len - 1];
        
        // 삼각형의 밑바닥부터 위로 올라가며 최대값 계산
        for (int i = len - 2; i >= 0; i--) {
            for (int j = i; j >= 0; j--) {
                // 아래 행의 두 값 중 큰 값을 선택하여 현재 값과 더함
                dp[i][j] = Math.max(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
            }
        }

        // 최대값은 자연스럽게 꼭대기(0,0)에 들어감
        return dp[0][0];
    }
}
```
