---
emoji: 🧢
title: 주식가격
date: '2021-03-24T02:05:37.121Z'
categories: 알고리즘
author: Jard
description: '프로그래머스 큐 연습문제'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/42584)

<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42584">https://programmers.co.kr/learn/courses/30/lessons/42584</a></div>

- 시간별로 하나씩 꺼낸다.
- 시간이 흐를때 꺼낸 값보다 더 작은 값일 경우 answer 배열의 값을 1씩 늘려준다.
- 더 큰값이 나올 경우 break;

```java
class Solution {
    public int[] solution(int[] prices) {
        int[] answer = new int[prices.length];
        int len = prices.length;
        for(int i=0;i<len;i++){
            for(int j=i+1;j<len;j++){
                answer[i]++;
                if(prices[i]>prices[j]){
                    break;
                }
            }
        }
        return answer;
    }
}
```
