---
emoji: 🧢
title: 기능개발
date: '2021-03-24T14:22:37.121Z'
template: 'post'
draft: false
slug: 'programmers_42586'
categories: 알고리즘
author: Jard
description: '프로그래머스 큐 연습문제'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/42586)

<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42586">https://programmers.co.kr/learn/courses/30/lessons/42586</a></div>

- 기능별로 필요한 기간을 배열로 만들어줍니다.
- 기능별로 비교하는데 앞의 기간이 뒤의 기간보다 클경우 계속 한번에 배포해야하는 양이 커지므로 complete라는 변수를 키웁니다.
- 그렇게 키운 complete가 뒤의 기간이 더 클 경우 break문으로 나와서 배열에 넣어줍니다.

```java
import java.util.ArrayList;

/**
 * 기능개발 문제 해결
 * 각 기능의 개발 속도에 따라 배포되는 기능의 개수를 구하는 문제
 * 앞의 기능이 완료되어야 뒤의 기능도 배포 가능
 */
class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        int[] answer = {};
        ArrayList<Integer> list = new ArrayList<Integer>();
        int[] ar = new int[progresses.length];
        
        // 각 기능이 완료되는데 필요한 일수 계산
        for(int i=0;i<progresses.length;i++){
            // 남은 작업량을 속도로 나눔 (나머지가 있으면 +1일)
            ar[i]=(100-progresses[i])/speeds[i]+((100-progresses[i])%speeds[i]>0?1:0);
        }
        
        // 각 배포마다 배포되는 기능 개수 계산
        for(int i=0;i<ar.length;i++){
            int complete=1; // 현재 기능 포함
            // 뒤의 기능들 중 현재 기능보다 일찍 또는 같이 완료되는 것들 확인
            for(int j=i+1;j<ar.length;j++){
                // 뒤의 기능이 더 늦게 완료되면 중단
                if(ar[i]<ar[j]){
                    i=j-1; // 다음 배포 시작 위치
                    break;
                }else if(j==ar.length-1){
                    i=j; // 마지막까지 확인
                }
                complete++; // 같이 배포되는 기능 개수 증가
            }
            list.add(complete);
        }

        answer = new int[list.size()];
        for(int i=0;i<list.size();i++)answer[i]=list.get(i);
        return answer;
    }
}
```
