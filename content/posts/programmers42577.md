---
emoji: 🧢
title: 전화번호 목록
date: '2021-04-27T19:44:37.121Z'
categories: 알고리즘
author: Jard
description: '프로그래머스 큐 연습문제'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/42577)

<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42577">https://programmers.co.kr/learn/courses/30/lessons/42577</a></div>

---

- String의 매치를 이용하여 배열내를 탐색해 문자열이 다른 문자열 앞에 오는지 확인한다.

```java
/**
 * 전화번호 목록 문제 해결
 * 전화번호 배열에서 한 번호가 다른 번호의 접두사인지 확인하는 문제
 * 정규식을 사용하여 문자열 매칭
 */
class Solution {
    public boolean solution(String[] phone_book) {
        boolean answer = true;
        
        // 모든 전화번호 쌍을 비교
        for(int i=0;i<phone_book.length;i++){
            for(int j=0;j<phone_book.length;j++){
                if(i==j)continue; // 같은 번호는 건너뜀
                // phone_book[i]가 phone_book[j]로 시작하는지 확인
                // ^는 시작, .*$는 뒤에 아무 문자나 올 수 있음을 의미
                if(phone_book[i].matches("^"+phone_book[j]+".*$"))return false;
            }
        }
        return answer;
    }
}
```
