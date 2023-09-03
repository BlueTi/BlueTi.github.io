---
title: 기능개발
date: "2021-03-24T14:22:37.121Z"
template: "post"
draft: false
slug: "programmers_42586"
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



[![프로그래머스](https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png)](https://programmers.co.kr/learn/courses/30/lessons/42586)
<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42586">https://programmers.co.kr/learn/courses/30/lessons/42586</a></div>

- 기능별로 필요한 기간을 배열로 만들어줍니다.
- 기능별로 비교하는데 앞의 기간이 뒤의 기간보다 클경우 계속 한번에 배포해야하는 양이 커지므로 complete라는 변수를 키웁니다.
- 그렇게 키운 complete가 뒤의 기간이 더 클 경우 break문으로 나와서 배열에 넣어줍니다.


```java
import java.util.ArrayList;

class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        int[] answer = {};
        ArrayList<Integer> list = new ArrayList<Integer>();
        int[] ar = new int[progresses.length];
        for(int i=0;i<progresses.length;i++){
            ar[i]=(100-progresses[i])/speeds[i]+((100-progresses[i])%speeds[i]>0?1:0);
        }
        for(int i=0;i<ar.length;i++){
            int complete=1;
            for(int j=i+1;j<ar.length;j++){
                if(ar[i]<ar[j]){
                    i=j-1;
                    break;
                }else if(j==ar.length-1){
                    i=j;
                }
                complete++;
            }
            list.add(complete);
        }

        answer = new int[list.size()];
        for(int i=0;i<list.size();i++)answer[i]=list.get(i);
        return answer;
    }
}
```