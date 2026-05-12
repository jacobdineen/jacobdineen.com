---
title: "Mid-Training With Self-Generated Data Improves Reinforcement Learning in Language Models"
slug: "/publications/midtraining-2026"
authors: Aswin RRV, Jacob Dineen, Divij Handa, Mihir Parmar, Ben Zhou, Swaroop Mishra, Chitta Baral
date: 2026-01-01
venue: "Pending NeurIPS 2026"
arxiv: https://arxiv.org/abs/2605.08472
paperurl: "https://arxiv.org/pdf/2605.08472.pdf"
collection: publications
tags: [rl, post-training, reasoning]
abstract: "The effectiveness of Reinforcement Learning (RL) in Large Language Models (LLMs) depends on the nature and diversity of the data used before and during RL. In particular, reasoning problems can often be approached in multiple ways that rely on different forms of reasoning, and exposure to only a limited range of such approaches in the training data may limit the effectiveness of RL. Motivated by this, we investigate using diverse self-generated data during mid-training as an intermediate step before RL training. Specifically, we adopt a bootstrapped data-generation framework guided by George Pólya's problem-solving approaches for generating multiple variants of correct answers for each question in the training data, and then perform fine-tuning. We first provide a theoretical perspective on how mid-training on such data improves RL and explain how policy-gradient updates can incentivize combining multiple approaches. We then empirically demonstrate that RL-trained models initialized with our mid-training data achieve consistent improvements across various mathematical reasoning benchmarks and other OOD tasks like code generation and narrative reasoning. Overall, our investigative study shows that a language model learning multiple problem-solving approaches, through self-generated data helps subsequent RL."
bibtex: |
  @misc{rrv2026midtrainingselfgenerateddataimproves,
    title={Mid-Training with Self-Generated Data Improves Reinforcement Learning in Language Models},
    author={Aswin RRV and Jacob Dineen and Divij Handa and Mihir Parmar and Ben Zhou and Swaroop Mishra and Chitta Baral},
    year={2026},
    eprint={2605.08472},
    archivePrefix={arXiv},
    primaryClass={cs.AI},
    url={https://arxiv.org/abs/2605.08472},
  }
---
