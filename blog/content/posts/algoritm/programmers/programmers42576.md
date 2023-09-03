---
title: "완주하지 못한 선수"
date: "2021-04-27T00:46:37.121Z"
template: "post"
draft: false
slug: "programmers_42576"
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

[![프로그래머스](https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png)](https://programmers.co.kr/learn/courses/30/lessons/42576)
<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42576">https://programmers.co.kr/learn/courses/30/lessons/42576</a></div>

---

- 받은 이름을 정렬하여 이름이 다르면 바로 뽑는다.

```java
import java.util.*;

class Solution {
    public String solution(String[] participant, String[] completion) {
        Arrays.sort(participant);
        Arrays.sort(completion);
        int i=0;
        for(i=0;i<completion.length;i++){
            if(!participant[i].equals(completion[i]))
                return participant[i];
        }
        return participant[i];
    }
}
```