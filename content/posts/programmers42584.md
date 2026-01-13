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
/**
 * 주식가격 문제 해결
 * 각 시점의 주식 가격이 떨어지지 않은 기간을 구하는 문제
 * 이중 반복문을 사용하여 각 시점부터 가격이 떨어질 때까지의 시간 계산
 */
class Solution {
    public int[] solution(int[] prices) {
        int[] answer = new int[prices.length];
        int len = prices.length;
        
        // 각 시점에서 가격이 떨어지지 않은 기간 계산
        for(int i=0;i<len;i++){
            // 현재 시점 이후의 가격들을 확인
            for(int j=i+1;j<len;j++){
                answer[i]++; // 시간 증가
                // 가격이 떨어지면 중단
                if(prices[i]>prices[j]){
                    break;
                }
            }
        }
        return answer;
    }
}
```
