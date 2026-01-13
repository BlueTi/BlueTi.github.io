---
emoji: 🧢
title: 완주하지 못한 선수
date: '2021-04-27T00:46:37.121Z'
categories: 알고리즘
author: Jard
description: '프로그래머스 큐 연습문제'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/42576)

<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42576">https://programmers.co.kr/learn/courses/30/lessons/42576</a></div>

---

- 받은 이름을 정렬하여 이름이 다르면 바로 뽑는다.

```java
import java.util.*;

/**
 * 완주하지 못한 선수 문제 해결
 * 참가자 배열과 완주자 배열을 비교하여 완주하지 못한 선수를 찾는 문제
 * 정렬을 사용하여 두 배열을 비교
 */
class Solution {
    public String solution(String[] participant, String[] completion) {
        // 두 배열을 정렬하여 순서대로 비교
        Arrays.sort(participant);
        Arrays.sort(completion);
        int i=0;
        
        // 완주자 배열과 비교하여 다른 이름을 찾음
        for(i=0;i<completion.length;i++){
            if(!participant[i].equals(completion[i]))
                return participant[i]; // 다른 이름이면 완주하지 못한 선수
        }
        // 모든 완주자와 일치하면 마지막 참가자가 완주하지 못한 선수
        return participant[i];
    }
}
```
