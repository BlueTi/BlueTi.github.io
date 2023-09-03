---
title: 비밀지도
date: "2021-04-20T18:38:37.121Z"
template: "post"
draft: false
slug: "programmers_17681"
category: "알고리즘"
tags:
  - "알고리즘"
  - "프로그래머스"
  - "진법변환"
  - "문제풀이"
  - "java"
description: "카카오 블라인드"
socialImage: "/media/algorithm.png"
---

[![프로그래머스](https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png)](https://programmers.co.kr/learn/courses/30/lessons/17681)
<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/17681">https://programmers.co.kr/learn/courses/30/lessons/17681</a></div>

- 입력받은 숫자를 2진수로 변환하여 비교하는 문제다.
- 이진수 문장길이가 같지 않을 수 있으므로 거꾸로 받아서 비교하여 다시 역순으로 배출한다.


```java

class Solution {
    public String[] solution(int n, int[] arr1, int[] arr2) {
        String[] answer = new String[n];

        for (int i = 0; i < n; i++) {
            char[] r1 = makeString(arr1[i]), r2 = makeString(arr2[i]);
            String result = "";
            int len1 = r1.length, len2 = r2.length;
            for (int j = 0; j < n; j++) {
                result = ((j < len1 && r1[j] == '#' ? true : false) || (j < len2 && r2[j] == '#' ? true : false) ? "#": " ") + result;
            }
            answer[i] = result;
        }
        return answer;
    }

    public char[] makeString(int num) {
        String result = "";
        while (num > 0) {
            result += (num % 2 == 1 ? "#" : " ");
            num /= 2;
        }
        return result.toCharArray();
    }
}


```