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

/**
 * 소수 찾기 문제 해결
 * 주어진 숫자들로 만들 수 있는 소수의 개수를 구하는 문제
 * 순열을 생성하여 모든 숫자 조합을 만들고 소수인지 확인
 */
class Solution {
    TreeSet<Integer> set = new TreeSet<Integer>(); // 중복 제거를 위한 Set
    int count=0; // 소수 개수

    public int solution(String numbers) {
        ArrayList<Character> chars = new ArrayList<Character>();
        ArrayList<Character> results = new ArrayList<Character>();

        int num_len = numbers.length();
        // 입력받은 문자열을 문자 하나씩 배열에 넣음
        for(int i=0;i<num_len;i++) chars.add(numbers.charAt(i));

        // 1자리부터 num_len자리까지 모든 순열 생성
        for(int i=0;i<num_len;i++)
            permutation(chars,results,num_len,i+1);

        return count;
    }

    /**
     * 순열 생성 함수 (백트래킹)
     * @param chars: 사용 가능한 문자들
     * @param result: 현재까지 선택한 문자들
     * @param n: 남은 문자 개수
     * @param r: 선택해야 할 문자 개수
     */
    private void permutation(ArrayList<Character> chars, ArrayList<Character> result, int n, int r) {
        if (r == 0) {
            // 0으로 시작하는 숫자는 제외
            if (result.get(0) != '0') {
                String str = "";
                int len = result.size();
                // 선택한 문자들을 문자열로 합침
                for (int i = 0; i < len; i++) {
                    str += result.get(i);
                }

                int num = Integer.parseInt(str);
                // 중복 체크: 이미 확인한 숫자는 건너뜀
                if (!set.contains(num)) {
                    set.add(num);
                    // 소수인지 확인
                    if (isPrime(num)) {
                        count++;
                    }
                }
                return;
            }

        }
        // 백트래킹: 문자를 하나씩 선택하여 순열 생성
        for (int i = 0; i < n; i++) {
            result.add(chars.remove(i)); // 문자 선택
            permutation(chars, result, n - 1, r - 1); // 재귀 호출
            chars.add(i, result.remove(result.size() - 1)); // 백트래킹: 원상복구
        }
    }

    /**
     * 소수 판별 함수
     * @param num: 판별할 숫자
     * @return: 소수이면 true, 아니면 false
     */
    private boolean isPrime(int num) {
        if (num == 2)
            return true;
        if (num == 1 || num % 2 == 0)
            return false;
        // 3부터 제곱근까지 홀수만 확인
        for (int i = 3; i <= (int) Math.sqrt(num); i += 2)
            if (num % i == 0)
                return false;
        return true;
    }
}
```
