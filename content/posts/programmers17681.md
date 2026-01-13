---
emoji: 🧢
title: 비밀지도
date: '2021-04-20T18:38:37.121Z'
categories: 알고리즘
author: Jard
description: '카카오 블라인드'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/17681)

<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/17681">https://programmers.co.kr/learn/courses/30/lessons/17681</a></div>

- 입력받은 숫자를 2진수로 변환하여 비교하는 문제다.
- 이진수 문장길이가 같지 않을 수 있으므로 거꾸로 받아서 비교하여 다시 역순으로 배출한다.

```java

/**
 * 비밀지도 문제 해결
 * 두 배열의 숫자를 이진수로 변환하여 OR 연산을 수행하는 문제
 * 1은 '#'으로, 0은 공백으로 변환하여 지도를 만듦
 */
class Solution {
    public String[] solution(int n, int[] arr1, int[] arr2) {
        String[] answer = new String[n];

        for (int i = 0; i < n; i++) {
            // 각 숫자를 이진수 문자열로 변환 (거꾸로 저장됨)
            char[] r1 = makeString(arr1[i]), r2 = makeString(arr2[i]);
            String result = "";
            int len1 = r1.length, len2 = r2.length;
            
            // 각 자리수를 비교하여 OR 연산 수행
            // 두 이진수 중 하나라도 1이면 '#'(벽), 둘 다 0이면 공백
            for (int j = 0; j < n; j++) {
                // j번째 자리가 범위 내에 있고 '#'인지 확인
                boolean bit1 = (j < len1 && r1[j] == '#');
                boolean bit2 = (j < len2 && r2[j] == '#');
                // OR 연산: 둘 중 하나라도 true면 '#', 아니면 공백
                // 결과를 앞에 추가하여 역순으로 저장 (나중에 올바른 순서가 됨)
                result = (bit1 || bit2 ? "#": " ") + result;
            }
            answer[i] = result;
        }
        return answer;
    }

    /**
     * 숫자를 이진수로 변환하여 '#'과 공백으로 표현
     * @param num: 변환할 숫자
     * @return: 이진수 표현 (거꾸로 저장됨, LSB부터)
     */
    public char[] makeString(int num) {
        String result = "";
        while (num > 0) {
            // 2로 나눈 나머지가 1이면 '#', 0이면 공백
            result += (num % 2 == 1 ? "#" : " ");
            num /= 2; // 다음 자리수로 이동
        }
        return result.toCharArray();
    }
}


```
