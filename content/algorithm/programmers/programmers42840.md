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

class Solution {
    public int[] solution(int[] answers) {
        int[] counter = new int[3];
        int[][] pattern = { { 1, 2, 3, 4, 5 }, { 2, 1, 2, 3, 2, 4, 2, 5 }, { 3, 3, 1, 1, 2, 2, 4, 4, 5, 5 } };
        int[] lens = { 5, 8, 10 };
        int max = 0;
        for (int i = 0; i < 3; i++) {
            int count = 0;
            for (int j = 0; j < answers.length; j++) {
                if (pattern[i][(j % lens[i])] == answers[j]) {
                    count++;
                }
            }
            if (max < count)
                max = count;
            counter[i] = count;
        }
        ArrayList<Integer> list = new ArrayList<Integer>();
        for (int i = 0; i < 3; i++)
            if (counter[i] == max)
                list.add(i + 1);

        return list.stream().mapToInt(i -> i).toArray();
    }
}
```
