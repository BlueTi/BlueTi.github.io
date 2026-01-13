---
emoji: 🧢
title: 모의고사
date: '2021-03-25T15:25:37.121Z'
categories: 알고리즘
author: Jard
description: '프로그래머스 큐 연습문제'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/42840)

<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42840">https://programmers.co.kr/learn/courses/30/lessons/42840</a></div>

- 수포자 셋의 패턴을 배열로 바꾼다.
- 맞은 갯수를 배열에 저장하고 제일 큰 값을 표시한다.
- 가변 배열을 위해 ArrayList를 써서 제일 큰 값과 같은 수포자를 넣고 배열을 반환한다.

```java
import java.util.ArrayList;

/**
 * 모의고사 문제 해결
 * 세 수포자의 찍기 패턴과 정답을 비교하여 가장 많이 맞춘 사람을 찾는 문제
 */
class Solution {
    public int[] solution(int[] answers) {
        int[] counter = new int[3]; // 각 수포자가 맞춘 개수
        // 수포자 셋의 패턴을 배열로 저장
        int[][] pattern = { { 1, 2, 3, 4, 5 }, { 2, 1, 2, 3, 2, 4, 2, 5 }, { 3, 3, 1, 1, 2, 2, 4, 4, 5, 5 } };
        int[] lens = { 5, 8, 10 }; // 각 패턴의 길이
        int max = 0; // 최대 맞춘 개수
        
        // 각 수포자의 정답 개수 계산
        for (int i = 0; i < 3; i++) {
            int count = 0;
            for (int j = 0; j < answers.length; j++) {
                // 패턴이 반복되므로 나머지 연산 사용
                if (pattern[i][(j % lens[i])] == answers[j]) {
                    count++;
                }
            }
            if (max < count)
                max = count;
            counter[i] = count;
        }
        
        // 가장 많이 맞춘 수포자들을 리스트에 추가
        ArrayList<Integer> list = new ArrayList<Integer>();
        for (int i = 0; i < 3; i++)
            if (counter[i] == max)
                list.add(i + 1); // 수포자 번호는 1부터 시작

        return list.stream().mapToInt(i -> i).toArray();
    }
}
```
