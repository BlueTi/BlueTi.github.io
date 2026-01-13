---
emoji: 🧢
title: '순위 검색'
date: '2021-10-07T15:13:37.121Z'
categories: 알고리즘
author: Jard
description: '프로그래머스 큐 연습문제, KAKAO BLIND RECRUITMENT'
---

[![프로그래머스](https://file.newswire.co.kr/data/datafile2/thumb_640/2021/06/1993996598_20210610150326_5364622170.jpg)](https://programmers.co.kr/learn/courses/30/lessons/72412)

<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/60058">https://programmers.co.kr/learn/courses/30/lessons/72412</a></div>

- Map안에 List를 넣어 관리한다
- 검색가능한 쿼리 키를 미리 만들어 목록을 작성한다
- 조건맞을 맞춘 목록에서 이분 탐색으로 속도를 구해야한다

```java
import java.util.*;

/**
 * 순위 검색 문제 해결
 * 지원자 정보를 조건별로 분류하고, 쿼리에 맞는 지원자 수를 구하는 문제
 * Map을 사용하여 조건별로 점수를 저장하고, 이분 탐색으로 효율적으로 검색
 */
class Solution {
    Map<String, List<Integer>> allInfo; // 조건별 점수 리스트를 저장하는 Map
    List<Integer> scores;

    public int[] solution(String[] info, String[] query) {
        int[] answer = new int[query.length];
        allInfo = new HashMap<String, List<Integer>>(); // 모든 데이터를 담기 위한 Map
        
        // 지원자 정보를 모든 가능한 조건 조합으로 저장
        for (String infoDetail : info) {
            saveData(0, "", infoDetail.split(" "));
        }
        
        // 저장해둔 리스트들을 모두 정렬 (이분 탐색을 위해)
        for (String key : allInfo.keySet()) {
            allInfo.get(key).sort(Comparator.naturalOrder());
        }

        // 각 쿼리에 대해 검색
        for (int i = 0; i < query.length; i++) {
            String[] columns = query[i].replace(" and ", "").split(" ");
            answer[i] = search(columns[0], Integer.parseInt(columns[1])); // 조건 검색
        }

        return answer;
    }

    /**
     * 지원자 정보를 모든 가능한 조건 조합으로 저장
     * "-"는 해당 조건을 무시하는 것을 의미
     * @param depth: 현재 처리할 조건의 인덱스 (0~3)
     * @param key: 현재까지 만든 조건 키
     * @param details: 지원자 정보 배열
     */
    public void saveData(int depth, String key, String[] details) {
        // 쿼리 내 변수 4개를 다 채웠을 경우 키에 대한 값을 추가
        if (depth == 4) {
            if (!allInfo.containsKey(key)) {
                scores = new ArrayList<Integer>();
                scores.add(Integer.parseInt(details[4]));
                allInfo.put(key, scores);
            } else {
                allInfo.get(key).add(Integer.parseInt(details[4]));
            }
            return;
        }
        // 해당 조건에 대한 키 생성: "-" (조건 무시) 또는 실제 값
        saveData(depth + 1, key + "-", details);
        saveData(depth + 1, key + details[depth], details);
    }

    /**
     * 조건에 맞는 지원자 수를 이분 탐색으로 찾음
     * @param query: 검색 조건 키
     * @param score: 최소 점수
     * @return: 조건에 맞는 지원자 수
     */
    public int search(String query, int score) {
        if (!allInfo.containsKey(query)) // 포함된 조건 키가 없을 경우 0 반환
            return 0;
        List<Integer> list = allInfo.get(query); // 조건 키가 있을 경우 이분 탐색
        int left = 0, right = list.size() - 1;
        
        // 이분 탐색: score 이상인 점수의 개수를 찾음
        while (left <= right) {
            int mid = (left + right) / 2;
            if (list.get(mid) < score)
                left = mid + 1;
            else
                right = mid - 1;
        }
        // left부터 끝까지가 score 이상인 점수들
        return list.size() - left;
    }
}
```
