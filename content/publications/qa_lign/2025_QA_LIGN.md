---
title: "QA-LIGN: Aligning LLMs through Constitutionally Decomposed QA"
authors: Jacob Dineen, Aswin RRV, Qin Liu, Zhikun Xu, Xiao Ye, Ming Shen, Zhaonan Li, Shijie Lu, Chitta Baral, Muhao Chen, Ben Zhou
date: 2025-01-02
venue: "arXiv preprint"
arxiv: https://arxiv.org/abs/2506.08123
paperurl: "https://arxiv.org/pdf/2506.08123.pdf"
semanticscholar: https://www.semanticscholar.org/paper/QA-LIGN%3A-Aligning-LLMs-through-Constitutionally-QA-Dineen-Rrv/706b4a2e443aaf81039aa1f531ad75a4e53c7ab6
collection: publications
abstract: "Alignment of large language models with explicit principles (such as helpfulness, honesty, and harmlessness) is crucial for ensuring safe and reliable AI systems. However, standard reward-based alignment methods typically collapse diverse feedback into a single scalar reward, entangling multiple objectives into one opaque training signal, which hinders interpretability. In this work, we introduce QA-LIGN, an automatic symbolic reward decomposition approach that preserves the structure of each constitutional principle within the reward mechanism. Instead of training a black-box reward model that outputs a monolithic score, QA-LIGN formulates principle-specific evaluation questions and derives separate reward components for each principle, making it a drop-in reward model replacement. Experiments aligning an uncensored large language model with a set of constitutional principles demonstrate that QA-LIGN offers greater transparency and adaptability in the alignment process. At the same time, our approach achieves performance on par with or better than a DPO baseline. Overall, these results represent a step toward more interpretable and controllable alignment of language models, achieved without sacrificing end-task performance."
bibtex: |
  @misc{dineen2025qalignaligningllmsconstitutionally,
    title={QA-LIGN: Aligning LLMs through Constitutionally Decomposed QA}, 
    author={Jacob Dineen and Aswin RRV and Qin Liu and Zhikun Xu and Xiao Ye and Ming Shen and Zhaonan Li and Shijie Lu and Chitta Baral and Muhao Chen and Ben Zhou},
    year={2025},
    eprint={2506.08123},
    archivePrefix={arXiv},
    primaryClass={cs.CL},
    url={https://arxiv.org/abs/2506.08123}
  }
---
