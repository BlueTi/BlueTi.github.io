---
title: 주식가격
date: "2021-03-24T02:05:37.121Z"
template: "post"
draft: false
slug: "programmers_42584"
category: "알고리즘"
tags:
  - "알고리즘"
  - "프로그래머스"
  - "큐"
  - "문제풀이"
  - "java"
description: "프로그래머스 큐 연습문제"
socialImage: "/media/algorithm.png"
---



[![프로그래머스](https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png)](https://programmers.co.kr/learn/courses/30/lessons/42584)
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