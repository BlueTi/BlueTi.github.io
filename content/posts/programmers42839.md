---
emoji: 🧢
title: 소수찾기
date: '2021-04-01T23:38:37.121Z'
categories: 알고리즘
author: Jard
description: '프로그래머스 큐 연습문제'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/42839)

<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42839">https://programmers.co.kr/learn/courses/30/lessons/42839</a></div>

- 입력받은 문자열을 문자하나씩 조개서 배열에 넣는다.
- 작성한 순열 생성 함수에서 한칸씩 진행한다.
- 문자 하나를 결과물에 넣고 순열 생성을 한글자 빼고 다시 문자배열에 넣기.
- 순열 생성 함수는 붙여야할 글자가 없을때까지 문자열을 붙여서 만든다. 단 0으로 시작하는건 제외.
- 문자열을 숫자로 만들어서 검사용 Set에 있는지 확인한다.
- 없다면 소수인지 확인하여 맞을 경우 count ++.

```java
import java.util.TreeSet;
import java.util.ArrayList;


class Solution {
    TreeSet<Integer> set = new TreeSet<Integer>();
    int count=0;

    public int solution(String numbers) {
        ArrayList<Character> chars = new ArrayList<Character>();
        ArrayList<Character> results = new ArrayList<Character>();

        int num_len = numbers.length();
        for(int i=0;i<num_len;i++) chars.add(numbers.charAt(i));

        for(int i=0;i<num_len;i++)
            permutation(chars,results,num_len,i+1);

        return count;
    }

    private void permutation(ArrayList<Character> chars, ArrayList<Character> result, int n, int r) {
        if (r == 0) {
            if (result.get(0) != '0') {
                String str = "";
                int len = result.size();
                for (int i = 0; i < len; i++) {
                    str += result.get(i);
                }

                int num = Integer.parseInt(str);
                if (!set.contains(num)) {
                    set.add(num);
                    if (isPrime(num)) {
                        count++;
                    }
                }
                return;
            }

        }
        for (int i = 0; i < n; i++) {
            result.add(chars.remove(i));
            permutation(chars, result, n - 1, r - 1);
            chars.add(i, result.remove(result.size() - 1));
        }
    }

    private boolean isPrime(int num) {
        if (num == 2)
            return true;
        if (num == 1 || num % 2 == 0)
            return false;
        for (int i = 3; i <= (int) Math.sqrt(num); i += 2)
            if (num % i == 0)
                return false;
        return true;
    }
}
```
