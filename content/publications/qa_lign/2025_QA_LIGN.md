---
title: "QA-LIGN: Aligning LLMs through Constitutionally Decomposed QA"
slug: "/publications/qa-lign-2025"
authors: Jacob Dineen, Aswin RRV, Qin Liu, Zhikun Xu, Xiao Ye, Ming Shen, Zhaonan Li, Shijie Lu, Chitta Baral, Muhao Chen, Ben Zhou
date: 2025-01-02
venue: "EMNLP 2025"
arxiv: https://arxiv.org/abs/2506.08123
paperurl: "https://arxiv.org/pdf/2506.08123.pdf"
semanticscholar: https://www.semanticscholar.org/paper/QA-LIGN%3A-Aligning-LLMs-through-Constitutionally-QA-Dineen-Rrv/706b4a2e443aaf81039aa1f531ad75a4e53c7ab6
collection: publications
abstract: "Alignment of large language models (LLMs) with principles like helpfulness, honesty, and harmlessness typically relies on scalar rewards that obscure which objectives drive the training signal. We introduce QA-LIGN, which decomposes monolithic rewards into interpretable principle-specific evaluations through structured natural language programs. Models learn through a draft, critique, and revise pipeline, where symbolic evaluation against the rubrics provides transparent feedback for both initial and revised responses during GRPO training. Applied to uncensored Llama-3.1-8B-Instruct, QA-LIGN reduces attack success rates by up to 68.7% while maintaining a 0.67% false refusal rate, achieving Pareto optimal safety-helpfulness performance and outperforming both DPO and GRPO with state-of-the-art reward models given equivalent training. These results demonstrate that making reward signals interpretable and modular improves alignment effectiveness, suggesting transparency enhances LLM safety."
bibtex: |
  @misc{dineen2025qalignaligningllmsconstitutionally,
        title={QA-LIGN: Aligning LLMs through Constitutionally Decomposed QA}, 
        author={Jacob Dineen and Aswin RRV and Qin Liu and Zhikun Xu and Xiao Ye and Ming Shen and Zhaonan Li and Shijie Lu and Chitta Baral and Muhao Chen and Ben Zhou},
        year={2025},
        eprint={2506.08123},
        archivePrefix={arXiv},
        primaryClass={cs.CL},
        url={https://arxiv.org/abs/2506.08123}, 
  }
---
