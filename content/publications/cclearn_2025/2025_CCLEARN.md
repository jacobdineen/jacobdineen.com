---
title: "CC-LEARN: Cohort-based Consistency Learning"
authors: Xiao Ye, Shaswat Shrivastava, Zhaonan Li, Jacob Dineen, Shijie Lu, Avneet Ahuja, Ming Shen, Zhikun Xu, Ben Zhou
date: 2025-06-18
venue: "arXiv preprint"
arxiv: https://arxiv.org/abs/2506.15662
paperurl: "https://arxiv.org/pdf/2506.15662.pdf"
collection: publications
abstract: "Large language models excel at many tasks but still struggle with consistent, robust reasoning. We introduce Cohort-based Consistency Learning (CC-Learn), a reinforcement learning framework that improves the reliability of LLM reasoning by training on cohorts of similar questions derived from shared programmatic abstractions. To enforce cohort-level consistency, we define a composite objective combining cohort accuracy, a retrieval bonus for effective problem decomposition, and a rejection penalty for trivial or invalid lookups that reinforcement learning can directly optimize, unlike supervised fine-tuning. Optimizing this reward guides the model to adopt uniform reasoning patterns across all cohort members. Experiments on challenging reasoning benchmarks (including ARC-Challenge and StrategyQA) show that CC-Learn boosts both accuracy and reasoning stability over pretrained and SFT baselines. These results demonstrate that cohort-level RL effectively enhances reasoning consistency in LLMs."
bibtex: |
  @misc{ye2025cclearn,
    title={CC-LEARN: Cohort-based Consistency Learning}, 
    author={Xiao Ye and Shaswat Shrivastava and Zhaonan Li and Jacob Dineen and Shijie Lu and Avneet Ahuja and Ming Shen and Zhikun Xu and Ben Zhou},
    year={2025},
    eprint={2506.15662},
    archivePrefix={arXiv},
    primaryClass={cs.CL},
    url={https://arxiv.org/abs/2506.15662}
  }
---
