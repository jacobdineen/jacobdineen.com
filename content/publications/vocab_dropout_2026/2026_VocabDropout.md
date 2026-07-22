---
title: "Vocabulary Dropout for Curriculum Diversity in LLM Co-Evolution"
slug: "/publications/vocab-dropout-2026"
authors: Jacob Dineen, Aswin RRV, Zhikun Xu, Ben Zhou
date: 2026-01-02
venue: "COLM 2026"
collection: publications
tags: [rl, post-training, self-play, reasoning]
featured: 2
arxiv: "https://arxiv.org/abs/2604.03472"
semanticscholar: "https://www.semanticscholar.org/paper/6a758138df371e7386112005d64cd31c29cd5039"
paperurl: "https://arxiv.org/pdf/2604.03472"
googlescholar: https://scholar.google.com/citations?view_op=view_citation&hl=en&user=2sYaEtQAAAAJ&citation_for_view=2sYaEtQAAAAJ:ufrVoPGSRksC
code: "https://github.com/ARC-ASU/vocab_dropout"
abstract: "Co-evolutionary self-play, where one language model generates problems and another solves them, promises curriculum learning without human supervision. The promise breaks down early in practice. The proposer converges to a narrow distribution of problems that satisfy the reward function, and the collapsed curriculum teaches the solver little, stalling the loop. We introduce vocabulary dropout, a lightweight intervention that randomly masks the proposer's output logits during both policy training and curriculum generation. The mask is hard and non-stationary, so the proposer cannot lock into fixed token sequences. Training Qwen3-4B and Qwen3-8B on mathematical reasoning via R-Zero, vocabulary dropout sustains proposer diversity throughout training across lexical, semantic, and functional measures, and improves the solver by an average of +4.4 points at 8B with the largest gains on competition-level benchmarks. Explicit action-space constraints, filling the structural role that game rules fill in classical self-play, can keep co-evolution in language productive. Vocabulary dropout is one simple way to impose them."
bibtex: |
  @inproceedings{dineen2026vocabularydropout,
    title={Vocabulary Dropout for Curriculum Diversity in LLM Co-Evolution},
    author={Jacob Dineen and Aswin RRV and Zhikun Xu and Ben Zhou},
    booktitle={Conference on Language Modeling (COLM)},
    year={2026},
    url={https://arxiv.org/abs/2604.03472},
  }
---
