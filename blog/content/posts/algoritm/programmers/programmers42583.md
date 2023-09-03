---
title: "다리를 지나는 트럭"
date: "2021-03-25T15:25:37.121Z"
template: "post"
draft: false
slug: "programmers_42583"
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



[![프로그래머스](https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png)](https://programmers.co.kr/learn/courses/30/lessons/42583)
<div style="text-align:center"><a href="https://programmers.co.kr/learn/courses/30/lessons/42583">https://programmers.co.kr/learn/courses/30/lessons/42583</a></div>

- 대기중인 트럭에서 한대씩 꺼낸다.
- 다리의 현재하중(bridge_weight)를 체크하여 견딜 수 있을 경우 트럭을 올린다(bridge_weight+트럭무게,큐에 트럭삽입).
- 견디지 못할 경우 큐에 0을 집어 넣는다.
- 걸리는 시간에 올라가는 시간을 무게한도 만큼 1씩 더해주고 마지막 트럭이 나가는 다리의 길이 만큼의 시간을 더해준다.


```java
import java.util.Queue;
import java.util.LinkedList;

class Solution {
    public int solution(int bridge_length, int weight, int[] truck_weights) {
        //결과 시간(time)과 현재 다리의 하중(bridge_weight)를 선언한다.
        int time = 0, bridge_weight = 0;
        //다리 위의 상황을 Queue로 선언한다.
        Queue<Integer> on_bridge = new LinkedList<Integer>();
        //나가야하는 트럭 댓수만큼 반복한다.
        for (int i = 0; i < truck_weights.length;) {
            //현재 다리의 하중(bridge_weigth)이 견딜 수 있는 무게(weight)보다 적고 아직 나가야하는 트럭이 남아있다면 반복
            while (bridge_weight < weight && i < truck_weights.length) {
                //올라갈때 시간추가
                time++;
                //현재 다리 하중에 트럭의 무게를 더한다.
                bridge_weight += truck_weights[i];
                //다리상태 큐에 트럭의 무게를 기록한다.
                on_bridge.add(truck_weights[i]);
                i++;
            }

            //위에 조건에서 무게가 초과하여 while문이 끝날 경우
            if (bridge_weight > weight) {
                //다리 위 트럭이 나갈때까지 기다리는 시간을 더한다.
                time += bridge_length;
                //트럭이 나갔으니 Queue를 비운다.
                while (!on_bridge.isEmpty()) {
                    bridge_weight -= on_bridge.poll();
                }
            }
        }
        //무게는 초과하지 않았지만 다리에 남아있는 트럭이 있는 경우
        if (!on_bridge.isEmpty())
            //마지막 트럭이 나가는 시간을 더해준다.
            time += bridge_length;
        return time;
    }
}
```