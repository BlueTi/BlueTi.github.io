---
emoji: 🧢
title: '괄호 변환'
date: '2021-05-13T15:13:37.121Z'
categories: 알고리즘
author: Jard
description: '프로그래머스 큐 연습문제'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/60058)

<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/60058">https://programmers.co.kr/learn/courses/30/lessons/60058</a></div>

- 입력받은 문자열을 완전한 괄호 부분이 있는지 확인한다.
- 앞부분이 완전한 괄호라면 뒤엣 부분을 다시 체크.
- 완전하지 않다면 길이만큼 재구성한다.

```java
/**
 * 괄호 변환 문제 해결
 * 균형잡힌 괄호 문자열을 올바른 괄호 문자열로 변환하는 문제
 * 재귀를 사용하여 문제를 분할하여 해결
 */
class Solution {
    public String solution(String p) {
        // 빈 문자열이면 그대로 반환
        if (p.length() == 0)
            return p;

        String u = "", v = ""; // u: 균형잡힌 괄호 문자열, v: 나머지
        int count = 0; // 괄호 균형 체크
        boolean flag = true; // 올바른 괄호 문자열인지 여부
        
        // 균형잡힌 괄호 문자열 u를 찾음
        for (int i = 0; i < p.length(); i++) {
            if (p.charAt(i) == '(')
                count++;
            else
                count--;

            // ')'가 먼저 나오면 올바른 괄호 문자열이 아님
            if (count < 0)
                flag = false;

            // 균형잡힌 괄호 문자열을 찾음
            else if (count == 0) {
                u = p.substring(0, i + 1);
                v = p.substring(i + 1);
                break;
            }

        }

        // u가 올바른 괄호 문자열이면 v를 재귀적으로 처리
        if (flag)
            return u + solution(v);

        // u가 올바른 괄호 문자열이 아니면 변환 필요
        // 1. '(' + solution(v) + ')'
        String result = "(" + solution(v) + ")";
        // 2. u의 첫 번째와 마지막 문자를 제거하고 나머지 괄호를 뒤집음
        for (int i = 1; i < u.length() - 1; i++) {
            result += u.charAt(i) == '(' ? ")" : "(";
        }

        return result;
    }
}
```
