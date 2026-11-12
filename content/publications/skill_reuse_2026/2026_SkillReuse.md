---
title: "Skill Reuse as Compression in Agentic RL"
slug: "/publications/skill-reuse-2026"
tldr: "Grounds agentic RL in minimum description length by rewarding trajectories that compress into a small dictionary of reusable skills."
authors: Zhikun Xu, Yu Feng, Jacob Dineen, Taiwei Shi, Jieyu Zhao, Ben Zhou
date: 2026-05-29
venue: "EMNLP 2026"
arxiv: https://arxiv.org/abs/2605.31509
paperurl: "https://arxiv.org/pdf/2605.31509.pdf"
pdf: "/papers/skill-reuse-2026.pdf"
googlescholar: https://scholar.google.com/citations?view_op=view_citation&hl=en&user=2sYaEtQAAAAJ&citation_for_view=2sYaEtQAAAAJ:0EnyYjriUFMC
semanticscholar: https://www.semanticscholar.org/paper/Skill-Reuse-as-Compression-in-Agentic-RL-Xu-Feng/3a5f9c55e401a7809c5fa822df2d56dabd3ec9d1
teaser: "/teasers/skill-reuse-2026.webp"
collection: publications
tags: [rl, post-training, agents, reasoning]
abstract: |
  Large language model agents trained with reinforcement learning (RL) often learn brittle, task-specific shortcuts. We hypothesize that agents generalize better when their successful trajectories are structurally compressible, decomposed into a small set of reusable abstract patterns. To formalize this, we introduce ReuseRL, which grounds agentic RL in the Minimum Description Length (MDL) principle. ReuseRL extracts a shared skill dictionary from successful trajectories and augments the RL objective with a segmentation cost, explicitly penalizing idiosyncratic behaviors that encode poorly. We prove a PAC-Bayes generalization bound for this objective. Across ALFWorld, TextWorld-Cooking, and Countdown-Stepwise, ReuseRL improves in- and out-of-distribution success over vanilla GRPO and strong round-length baselines.
bibtex: |
  @inproceedings{xu-etal-2026-skill-reuse,
      title = "Skill Reuse as Compression in Agentic {RL}",
      author = "Xu, Zhikun  and
        Feng, Yu  and
        Dineen, Jacob  and
        Shi, Taiwei  and
        Zhao, Jieyu  and
        Zhou, Ben",
      editor = "Lee, Hung-Yi  and
        Dev, Sunipa  and
        Li, Junyi Jessy  and
        Elliott, Desmond",
      booktitle = "Proceedings of the 2026 Conference on Empirical Methods in Natural Language Processing",
      month = oct,
      year = "2026",
      address = "Budapest, Hungary",
      publisher = "Association for Computational Linguistics",
      url = "https://aclanthology.org/2026.emnlp-main.821/",
      doi = "10.18653/2026.emnlp-main.821",
      pages = "19092--19110",
      ISBN = "979-8-89176-459-0"
  }
---
