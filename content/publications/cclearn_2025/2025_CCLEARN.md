---
title: "Learning Verifiable Reasoning Programs through Cohort Consistency"
slug: "/publications/cc-learn-2025"
authors: Xiao Ye, Zhaonan Li, Jacob Dineen, Zhikun Xu, Shijie Lu, Ming Shen, Shaswat Shrivastava, Avneet Ahuja, Ben Zhou
date: 2025-06-18
venue: "Pending EMNLP 2026"
arxiv: https://arxiv.org/abs/2506.15662
paperurl: "https://arxiv.org/pdf/2506.15662.pdf"
googlescholar: https://scholar.google.com/citations?view_op=view_citation&hl=en&user=2sYaEtQAAAAJ&citation_for_view=2sYaEtQAAAAJ:IjCSPb-OGe4C
collection: publications
tags: [rl, reasoning, program-synthesis, interpretability]
abstract: |
  In high-stakes settings, a correct answer from a large language model (LLM) is not enough: the decision procedure must also be auditable. Free-form chain-of-thought is poorly suited to this: it is a natural-language rationale rather than an explicit rule, and may not faithfully reflect the computation that produced the answer. We instead have the model emit a short executable program whose execution defines the answer, making the decision logic explicit and checkable. The central challenge is not writing runnable code but producing logic that is complete and reusable rather than an instance-specific shortcut. Our hypothesis is that a genuine reasoning rule survives factual substitution while a shortcut does not; hence consistency across a cohort of factually varied questions is a verifiable signal of reuse. We therefore train a single program to run unchanged across each cohort, using consistency as the main reinforcement-learning signal. Across five in-domain and three out-of-domain benchmarks at two model scales, our method delivers 10–20 absolute-point gains over strong vanilla, SFT, and per-instance RL baselines. Together, these results show that cohort consistency is an effective, checkable signal for learning complete and reusable reasoning.
bibtex: |
  @misc{ye2025cclearn,
    title={Learning Verifiable Reasoning Programs through Cohort Consistency},
    author={Xiao Ye and Zhaonan Li and Jacob Dineen and Zhikun Xu and Shijie Lu and Ming Shen and Shaswat Shrivastava and Avneet Ahuja and Ben Zhou},
    year={2025},
    eprint={2506.15662},
    archivePrefix={arXiv},
    primaryClass={cs.CL},
    url={https://arxiv.org/abs/2506.15662}
  }
---
