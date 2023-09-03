---
title: "정수 삼각형"
date: "2021-05-27T02:20:37.121Z"
template: "post"
draft: false
slug: "programmers_43105"
category: "알고리즘"
tags:
  - "알고리즘"
  - "프로그래머스"
  - "동적계획법"
  - "문제풀이"
  - "java"
description: "프로그래머스 큐 연습문제"
socialImage: "/media/algorithm.png"
---
[![프로그래머스](https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png)](https://programmers.co.kr/learn/courses/30/lessons/43105)
<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/43105">https://programmers.co.kr/learn/courses/30/lessons/43105</a></div>
---

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