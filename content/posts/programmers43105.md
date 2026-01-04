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
class Solution {
    public int solution(int[][] triangle) {
        int len = triangle.length;
        int[][] dp = new int[len][len];
        dp[len - 1] = triangle[len - 1];
        for (int i = len - 2; i >= 0; i--) {
            for (int j = i; j >= 0; j--) {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
            }
        }

        return dp[0][0];
    }
}
```
