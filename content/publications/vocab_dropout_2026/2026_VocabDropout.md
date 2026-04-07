---
title: "Vocabulary Dropout for Curriculum Diversity in LLM Co-Evolution"
slug: "/publications/vocab-dropout-2026"
authors: Jacob Dineen, Aswin RRV, Zhikun Xu, Ben Zhou
date: 2026-01-02
venue: "Pending COLM 2026"
collection: publications
arxiv: "https://arxiv.org/abs/2604.03472"
semanticscholar: "https://www.semanticscholar.org/paper/6a758138df371e7386112005d64cd31c29cd5039"
paperurl: "https://arxiv.org/pdf/2604.03472"
abstract: "Co-evolutionary self-play, where one language model generates problems and another solves them, promises autonomous curriculum learning without human supervision. In practice, the proposer quickly converges to a narrow distribution of problems that satisfy the reward function. This diversity collapse renders the curriculum uninformative for the solver, stalling the co-evolutionary loop. We introduce vocabulary dropout, a random mask applied to the proposer's output logits during both policy training and curriculum generation, as a lightweight mechanism to sustain diversity. The mask is hard and non-stationary, preventing the proposer from locking into fixed token sequences. Training Qwen3-4B and Qwen3-8B on mathematical reasoning via R-Zero, we find that vocabulary dropout sustains proposer diversity across lexical, semantic, and functional metrics throughout training, and yields solver improvements averaging +4.4 points at 8B, with the largest gains on competition-level benchmarks. Our findings suggest that explicit action-space constraints, analogous to the structural role that game rules play in classical self-play, can help sustain productive co-evolution in language. Vocabulary dropout is one simple instantiation of this principle."
bibtex: |
  @misc{dineen2026vocabularydropoutcurriculumdiversity,
    title={Vocabulary Dropout for Curriculum Diversity in LLM Co-Evolution},
    author={Jacob Dineen and Aswin RRV and Zhikun Xu and Ben Zhou},
    year={2026},
    eprint={2604.03472},
    archivePrefix={arXiv},
    primaryClass={cs.CL},
    url={https://arxiv.org/abs/2604.03472},
  }
---
