---
title: "전화번호 목록"
date: "2021-04-27T19:44:37.121Z"
template: "post"
draft: false
slug: "programmers_42577"
category: "알고리즘"
tags:
  - "알고리즘"
  - "프로그래머스"
  - "해시"
  - "문제풀이"
  - "java"
description: "프로그래머스 큐 연습문제"
socialImage: "/media/algorithm.png"
---

[![프로그래머스](https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png)](https://programmers.co.kr/learn/courses/30/lessons/42577)
<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42577">https://programmers.co.kr/learn/courses/30/lessons/42577</a></div>

---

- String의 매치를 이용하여 배열내를 탐색해 문자열이 다른 문자열 앞에 오는지 확인한다.


```java
class Solution {
    public boolean solution(String[] phone_book) {
        boolean answer = true;
        for(int i=0;i<phone_book.length;i++){
            for(int j=0;j<phone_book.length;j++){
                if(i==j)continue;
                if(phone_book[i].matches("^"+phone_book[j]+".*$"))return false;
            }
        }
        return answer;
    }
}
```