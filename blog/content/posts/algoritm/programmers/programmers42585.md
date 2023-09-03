---
title: "N으로 표현"
date: "2021-05-30T01:46:37.121Z"
template: "post"
draft: false
slug: "programmers_42585"
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

[![프로그래머스](https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png)](https://programmers.co.kr/learn/courses/30/lessons/42585)
<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42585">https://programmers.co.kr/learn/courses/30/lessons/42585</a></div>

---

- 주어진 숫자를 붙여 가며 사칙연산을 통과시켜 값을 확인한다.
- N이 1부터 9이하로 주어지니 반복횟수를 맞추기 위해 0부터 8로한다.
- 처음 식은 5가 주어지고 사칙연산을 붙일 수 없으니 카운트 1부터 사칙연산으로 나눠진다.
- 그런식으로 각 dfs들이 목표 숫자에 도달했을때 최소 값인지 비교하여 대입한다.



```java
class Solution {
    //target과 써야하는 숫자 n을 함수 호출시 매개변수가 늘어나므로 매개변수로 쓰기보다 전역변수로 빼 놓는다.
    int target,n,min=Integer.MAX_VALUE;
    
    public int solution(int N, int number) {
        target = number;
        n = N;
        //0부터 시작
        dfs(0, 0);
        return min == Integer.MAX_VALUE ? -1 : min;
    }
    

    //카운트는 0부터 8, 이전에 생성된 숫자를 num으로 받는다.
    public void dfs(int count, int num) {
        //count는 0부터 8로 9번 그보다 크면 -1을 돌려준다.
        if (count > 8) {
            min = -1;
            return;
        }
        //생성된 숫자가 목표 값일 경우
        if (num == target) {
            //기존의 목표 생성까지 최소 카운트 값과 비교하여 더 작을 경우 min에 대입한다.
            min = min<count?min:count;
            return;
        }


        int tempN = n;
        //현재 카운트에서 8까지 접근할 만큼 dfs를 반복한다.
        for (int i = 0; i < 8 - count; i++) {
            int newCount = count + i + 1;
            dfs(newCount, num + tempN);
            dfs(newCount, num - tempN);
            dfs(newCount, num * tempN);
            dfs(newCount, num / tempN);

            //현재 만든 숫자를 한칸 앞으로 밀고 n을 추가하여 숫자를 만든다.
            tempN = tempN * 10 + n;
        }
    }
}
```