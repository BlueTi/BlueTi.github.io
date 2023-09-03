---
title: "순위 검색"
date: "2021-10-07T15:13:37.121Z"
template: "post"
draft: false
slug: "programmers_72412"
category: "알고리즘"
tags:
  - "알고리즘"
  - "프로그래머스"
  - "KAKAO BLIND RECRUITMENT"
  - "이분탐색"
  - "문제풀이"
  - "java"
description: "프로그래머스 큐 연습문제"
socialImage: "/media/algorithm.png"
---

[![프로그래머스](https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png)](https://programmers.co.kr/learn/courses/30/lessons/72412)
<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/60058">https://programmers.co.kr/learn/courses/30/lessons/72412</a></div>

- Map안에 List를 넣어 관리한다
- 검색가능한 쿼리 키를 미리 만들어 목록을 작성한다
- 조건맞을 맞춘 목록에서 이분 탐색으로 속도를 구해야한다


```java
import java.util.*;

class Solution {
    Map<String, List<Integer>> allInfo;
    List<Integer> scores;

    public int[] solution(String[] info, String[] query) {
        int[] answer = new int[query.length];
        allInfo = new HashMap<String, List<Integer>>();//모든 데이터를 담기 위한 Map
        for (String infoDetail : info) {
            saveData(0, "", infoDetail.split(" "));
        }
        for (String key : allInfo.keySet()) {
            allInfo.get(key).sort(Comparator.naturalOrder());//저장해둔 리스트들을 모두 정렬
        }

        for (int i = 0; i < query.length; i++) {
            String[] columns = query[i].replace(" and ", "").split(" ");
            answer[i] = search(columns[0], Integer.parseInt(columns[1]));//조건 검색
        }

        return answer;
    }

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
        // 해당 조건에 대한 키 생성
        saveData(depth + 1, key + "-", details);
        saveData(depth + 1, key + details[depth], details);
    }

    public int search(String query, int score) {
        if (!allInfo.containsKey(query))//포함된 조건 키가 없을 경우 0반환
            return 0;
        List<Integer> list = allInfo.get(query);//조건 키가 있을 경우 이분탐색
        int left = 0, right = list.size() - 1; 
        while (left <= right) {
            int mid = (left + right) / 2;
            if (list.get(mid) < score)
                left = mid + 1;
            else
                right = mid - 1;

        }
        return list.size() - left;
    }
}
```