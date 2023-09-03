---
title: "괄호 변환"
date: "2021-05-13T15:13:37.121Z"
template: "post"
draft: false
slug: "programmers_60058"
category: "알고리즘"
tags:
  - "알고리즘"
  - "프로그래머스"
  - "재귀"
  - "문제풀이"
  - "java"
description: "프로그래머스 큐 연습문제"
socialImage: "/media/algorithm.png"
---

[![프로그래머스](https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png)](https://programmers.co.kr/learn/courses/30/lessons/60058)
<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/60058">https://programmers.co.kr/learn/courses/30/lessons/60058</a></div>


- 입력받은 문자열을 완전한 괄호 부분이 있는지 확인한다.
- 앞부분이 완전한 괄호라면 뒤엣 부분을 다시 체크.
- 완전하지 않다면 길이만큼 재구성한다.


```java
class Solution {
    public String solution(String p) {
        if (p.length() == 0)
            return p;

        String u = "", v = "";
        int count = 0;
        boolean flag = true;
        for (int i = 0; i < p.length(); i++) {
            if (p.charAt(i) == '(')
                count++;
            else
                count--;

            if (count < 0)
                flag = false;

            else if (count == 0) {
                u = p.substring(0, i + 1);
                v = p.substring(i + 1);
                break;
            }

        }

        if (flag)
            return u + solution(v);

        String result = "(" + solution(v) + ")";
        for (int i = 1; i < u.length() - 1; i++) {
            result += u.charAt(i) == '(' ? ")" : "(";
        }

        return result;
    }
}
```