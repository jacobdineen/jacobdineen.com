---
title: "Skill Reuse as Compression in Agentic RL"
slug: "/publications/skill-reuse-2026"
authors: Zhikun Xu, Yu Feng, Jacob Dineen, Taiwei Shi, Jieyu Zhao, Ben Zhou
date: 2026-05-29
venue: "Pending NeurIPS 2026"
arxiv: https://arxiv.org/abs/2605.31509
paperurl: "https://arxiv.org/pdf/2605.31509.pdf"
semanticscholar: https://www.semanticscholar.org/paper/Skill-Reuse-as-Compression-in-Agentic-RL-Xu-Feng/3a5f9c55e401a7809c5fa822df2d56dabd3ec9d1
collection: publications
tags: [rl, post-training, agents, reasoning]
abstract: |
  Large language model agents trained with reinforcement learning (RL) often learn brittle, task-specific shortcuts. We hypothesize that agents generalize better when their successful trajectories are structurally compressible, decomposed into a small set of reusable abstract patterns. To formalize this, we introduce ReuseRL, which grounds agentic RL in the Minimum Description Length (MDL) principle. ReuseRL extracts a shared skill dictionary from successful trajectories and augments the RL objective with a segmentation cost, explicitly penalizing idiosyncratic behaviors that encode poorly. We prove a PAC-Bayes generalization bound for this compression penalty. Across ALFWorld, TextWorld-Cooking, and Countdown-Stepwise, ReuseRL improves in- and out-of-distribution success over vanilla GRPO and strong round-length baselines.
---
