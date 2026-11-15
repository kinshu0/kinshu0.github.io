---
layout: post
title: "First in the OpenAI, Citadel Securities and Sequoia Castle Challenge"
date: 2026-11-22 14:00:00 -0500
permalink: /castle-challenge/
math: true
description: "First in both games of the No Limit Castle Challenge, hosted by OpenAI, Citadel Securities and Sequoia, out of about six thousand entries. The method: use the leaderboard to measure the field, one castle at a time."
thumb: /assets/castle/four-way-rank-1.png
image: /assets/castle/four-way-rank-1.png
---

I finished first in both games of the No Limit Castle Challenge, a strategy puzzle hosted by OpenAI, Citadel Securities and Sequoia in November 2026, with about six thousand entries.

| Game | My allocation | Leaderboards after my entry landed |
|---|---|---|
| Head to Head | 4-5-36-48-7 | 1st on all 105 |
| Four-Way | 3-41-54-1-1 | 1st on 31 of 105, more than any other entry |

<figure>
<img src="/assets/castle/head-to-head-rank-1.png" alt="Leaderboard card: number 1 in Head to Head, Kinshu Gupta, 9.32" width="1200" height="675">
<img src="/assets/castle/four-way-rank-1.png" alt="Leaderboard card: number 1 in Four-Way Battle, Kinshu Gupta, 5.92" width="1200" height="675">
<figcaption>The cards the site generated for my entry on 7 November, the night of the deadline.</figcaption>
</figure>

The leaderboard was recomputed about every half hour. The counts cover the 105 versions published in the 45 hours after my entry appeared, on the last update before the Boston deadline.

Two caveats. In Head to Head, first place was shared: with one of my own measurement entries (explained below), and later with five entries that copied the allocation. Four-Way is scored on randomly drawn groups, so entries change order every time the board is recomputed. Mine was third on the first board, first more often than any other entry (the next best had 29), and never lower than tenth.

## The challenge

You have 100 soldiers to split across five castles worth 1, 2, 3, 4 and 5 points. Everyone submits one allocation for each of two games.

**Head to Head.** Your allocation plays every other entry once. Each castle goes to whoever sent more soldiers, and a tie splits the points. Your score is your average points per opponent, out of 15.

**Four-Way.** Your allocation is grouped with three other entries. Each castle goes to the one entry of the four that sent the most soldiers there. The four are ranked by castle points and paid by rank: 9, 4, 2 and 0, with ties splitting.

The organisers draw 1,000,000 random groups of four from the field, and your score is your average payout, out of 9.

## Why there is no optimal answer

Every allocation loses to some other allocation: put 48 on castle 4 and someone with 49 takes it and spends the difference elsewhere. The best allocation depends on the entries actually submitted.

Those entries come from people reasoning about each other, usually described as level-k thinking: a level-0 player splits evenly or piles onto the big castles, level 1 best-responds to level 0, level 2 to level 1, and so on.

Formally, the field is an empirical distribution $$P$$ over the $$\binom{104}{4} = 4{,}598{,}126$$ ways to split 100 soldiers across five castles, and the task is to find the allocation with the highest expected score against an opponent drawn from it. $$P$$ is not published: the leaderboard shows each entry's score and nothing about its allocation. The problem is to infer $$P$$ from scores. Head to Head depends on $$P$$ only through five one-dimensional distributions, one per castle.

## Approach 1: a fitted model of the field

My first approach was to fit a model of the field to the published scores: a large set of candidate allocations, each with a weight, fitted to reproduce the distribution of scores and the exact scores of the few entries whose allocations I knew.

It was wrong at the top. A calibration entry of 20 soldiers on every castle was predicted to score 7.7 to 8.5 and scored 6.13. Three of the first four entries the model chose came in 0.5 to 0.7 below prediction. It said 41 soldiers on castle 4 would beat 87% of the field; the measured figure was 71%.

Many different fields produce the same distribution of scores, and the fit had picked one softer at the top than the real one. This took two days.

## Approach 2: measuring the field

Head to Head scores add up castle by castle. Write $$X_c$$ for the number of soldiers a randomly drawn opponent sends to castle $$c$$. The score of an allocation $$a = (a_1, \dots, a_5)$$ is

$$
S(a) = 1 \cdot F_1(a_1) + 2 \cdot F_2(a_2) + 3 \cdot F_3(a_3) + 4 \cdot F_4(a_4) + 5 \cdot F_5(a_5)
$$

where $$F_c(x)$$ is the share of the field that $$x$$ soldiers beat on castle $$c$$, counting ties as half:

$$
F_c(x) = \Pr[X_c < x] + \tfrac{1}{2} \Pr[X_c = x]
$$

The score depends on the field only through $$F_1, \dots, F_5$$. An entry with soldiers on a single castle reads one value of one $$F_c$$ from its published score.

Start with the five entries that put all 100 soldiers on one castle. On the last leaderboard I saved, the one on castle 5 scored 5.610. Its score has two parts.

- **Castle 5.** It beats every opponent except the 37 other entries that also sent all 100 there, which tie it and split the 5 points. Those 37 are 0.61% of its 6,037 opponents, and they are easy to count: they have the identical score. That gives $$5 \times (0.9939 + \tfrac{1}{2} \times 0.0061) = 4.985$$ points.
- **Castles 1 to 4.** It sent zero, so it gets half of a castle's points from each opponent that also sent zero there. Write $$z_c$$ for the share of the field sending zero to castle $$c$$.

$$
5.610 = 4.985 + \tfrac{1}{2} \left( 1 z_1 + 2 z_2 + 3 z_3 + 4 z_4 \right)
$$

Each of the five all-in entries gives one equation of this kind. An entry's equation leaves out its own castle, so no single entry gives any $$z_c$$:

| All 100 on | Score | Entries with that score | Its equation contains |
|---|---|---|---|
| Castle 1 | 1.919 | 7 | $$z_2, z_3, z_4, z_5$$ |
| Castle 2 | 2.829 | 7 | $$z_1, z_3, z_4, z_5$$ |
| Castle 3 | 3.788 | 10 | $$z_1, z_2, z_4, z_5$$ |
| Castle 4 | 4.723 | 22 | $$z_1, z_2, z_3, z_5$$ |
| Castle 5 | 5.610 | 38 | $$z_1, z_2, z_3, z_4$$ |

Five equations, five unknowns. Solved together they give the share of the field sending zero to each castle:

$$
z_1 = 10.9\%, \quad z_2 = 14.4\%, \quad z_3 = 12.2\%, \quad z_4 = 12.2\%, \quad z_5 = 13.9\%
$$

The other values need one more kind of entry: soldiers on one castle, the rest parked on castle 1. For example, 59-0-0-41-0 scored 4.468.

- Castle 1, with 59 soldiers, wins: $$F_1(59) \approx 1$$, so 1 point.
- Castles 2, 3 and 5, with zero soldiers, are ties at zero, already measured: $$F_c(0) = z_c / 2$$.
- The rest belongs to castle 4.

$$
4 \, F_4(41) = 4.468 - 1 - \tfrac{1}{2} \left( 2 z_2 + 3 z_3 + 5 z_5 \right) = 4.468 - 1 - 0.676 = 2.792
$$

So $$F_4(41) = 2.792 / 4 = 0.70$$: 41 soldiers on castle 4 beat 70% of the field on that board (71% when first measured).

About eighty such entries mapped all five castles. Each dot below is one. Set an allocation and the page computes its score from those measurements alone.

<div id="castle-predictor" class="castle-predictor"></div>

### Checking it

42 other entries on the board had every castle value measured directly. For all 42, the score computed from the probes was below the real score by 0.107 to 0.111. Differences between entries, which decide rank, were right to within 0.004.

<details>
<summary>All 42 entries</summary>
<div id="castle-known" class="castle-known"></div>
</details>

The constant 0.109 is an error in the probe design, found while writing this up. A probe for $$F_c(x)$$ parks its other $$100 - x$$ soldiers on castle 1, and I assumed $$F_1(100 - x) = 1$$. A small share of the field sends more than that to castle 1, so each measured value is low by $$\left(1 - F_1(100 - x)\right) / c$$, and for a full allocation the errors add up to

$$
S(a) - \hat{S}(a) = \sum_{c=2}^{5} \left( 1 - F_1(100 - a_c) \right)
$$

which is about 0.03 per castle. It is nearly the same for every allocation near the top, so it did not change which looked best.

## Search

The measurements pointed to a region: almost nothing on castles 1 and 2, about 36 on castle 3, 46 to 48 on castle 4, and a handful on castle 5. My first entry there, 4-4-36-48-8, scored 9.290 and ranked 30th.

From there I searched on the leaderboard. Head to Head scores are exact, so submitting an entry's neighbours (one soldier moved between two castles) and reading their scores on the next update gives the slope in each direction. Three hours and forty entries later, 4-6-36-47-7 was first. By the evening of the deadline the field had shifted and its neighbour 4-5-36-48-7 had overtaken it; I submitted that one under my name.

## Four-Way

Four-Way does not separate. The payout depends on place in the group, which depends on all five castles and all three opponents, so single-castle entries measure nothing.

I used the same neighbour search on averages. The same entry moves about 0.02 between boards, more than the gap between good neighbours. Over 24 boards, 3-41-54-1-1 averaged 6.003 and its two closest neighbours 6.000 and 5.997: a plateau, where first place on any one board is a draw.

## Errors

- **Two days on the model.** Ten single-castle entries on day one would have told me more.
- **The castle 1 assumption** above. A few entries split between castles 1 and 2 only would have measured it.
- **Misreading the Four-Way rule** until the last night: I assumed each castle was decided pairwise within the group. A batch of entries built on that reading moved the scores in a way only the real rule allows.
- **Twenty-eight entries never appeared on the board,** and for a day I read that as delay.

I directed the work and Claude Code, running as an agent, did most of the execution: collecting every version of the leaderboard, fitting the model, and running the submit-and-measure loop overnight.

<link rel="stylesheet" href="/assets/castle/predictor.css">
<script src="/assets/castle/predictor-data.js"></script>
<script src="/assets/castle/predictor.js"></script>
