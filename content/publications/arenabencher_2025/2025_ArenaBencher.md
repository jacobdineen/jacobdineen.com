---
title: "ArenaBencher: Automatic Benchmark Evolution via Multi-Model Competitive Evaluation"
slug: "/publications/arenabencher-2025"
authors: Qin Liu, Jacob Dineen, Yuxi Huang, Sheng Zhang, Hoifung Poon, Ben Zhou, Muhao Chen
date: 2025-10-09
venue: "arXiv preprint"
arxiv: https://arxiv.org/abs/2510.08569
paperurl: "https://arxiv.org/pdf/2510.08569.pdf"
semanticscholar: https://www.semanticscholar.org/paper/ArenaBencher%3A-Automatic-Benchmark-Evolution-via-Liu-Dineen/588205ed40fa03b87bfb4741e69f22a513265b61
collection: publications
abstract: "Benchmarks are central to measuring the capabilities of large language models and guiding model development, yet widespread data leakage from pretraining corpora undermines their validity. Models can match memorized content rather than demonstrate true generalization, which inflates scores, distorts cross-model comparisons, and misrepresents progress. We introduce ArenaBencher, a model-agnostic framework for automatic benchmark evolution that updates test cases while preserving comparability. Given an existing benchmark and a diverse pool of models to be evaluated, ArenaBencher infers the core ability of each test case, generates candidate question-answer pairs that preserve the original objective, verifies correctness and intent with an LLM as a judge, and aggregates feedback from multiple models to select candidates that expose shared weaknesses. The process runs iteratively with in-context demonstrations that steer generation toward more challenging and diagnostic cases. We apply ArenaBencher to math problem solving, commonsense reasoning, and safety domains and show that it produces verified, diverse, and fair updates that uncover new failure modes, increase difficulty while preserving test objective alignment, and improve model separability. The framework provides a scalable path to continuously evolve benchmarks in step with the rapid progress of foundation models."
bibtex: |
  @misc{liu2025arenabencherautomaticbenchmarkevolution,
    title={ArenaBencher: Automatic Benchmark Evolution via Multi-Model Competitive Evaluation}, 
    author={Qin Liu and Jacob Dineen and Yuxi Huang and Sheng Zhang and Hoifung Poon and Ben Zhou and Muhao Chen},
    year={2025},
    eprint={2510.08569},
    archivePrefix={arXiv},
    primaryClass={cs.CL},
    url={https://arxiv.org/abs/2510.08569}
  }
---
