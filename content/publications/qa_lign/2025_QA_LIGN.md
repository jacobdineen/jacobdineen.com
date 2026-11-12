---
title: "QA-LIGN: Aligning LLMs through Constitutionally Decomposed QA"
slug: "/publications/qa-lign-2025"
tldr: "Replaces scalar rewards with principle-specific QA rubrics during GRPO, cutting attack success by up to 68.7% with a 0.67% false refusal rate."
authors: Jacob Dineen, Aswin RRV, Qin Liu, Zhikun Xu, Xiao Ye, Ming Shen, Zhaonan Li, Shijie Lu, Chitta Baral, Muhao Chen, Ben Zhou
date: 2025-06-09
venue: "EMNLP 2025 Findings"
arxiv: https://arxiv.org/abs/2506.08123
paperurl: "https://arxiv.org/pdf/2506.08123.pdf"
pdf: "/publications/qa-lign-2025.pdf"
googlescholar: https://scholar.google.com/citations?view_op=view_citation&hl=en&user=2sYaEtQAAAAJ&citation_for_view=2sYaEtQAAAAJ:9yKSN-GCB0IC
semanticscholar: https://www.semanticscholar.org/paper/QA-LIGN%3A-Aligning-LLMs-through-Constitutionally-QA-Dineen-Rrv/706b4a2e443aaf81039aa1f531ad75a4e53c7ab6
teaser: "/teasers/qa-lign.webp"
collection: publications
tags: [rl, post-training, alignment, interpretability]
featured: 2
slides: "/slides/EMNLP 2025_Find-3576 slides.pdf"
abstract: "Alignment of large language models (LLMs) with principles like helpfulness, honesty, and harmlessness typically relies on scalar rewards that obscure which objectives drive the training signal. We introduce QA-LIGN, which decomposes monolithic rewards into interpretable principle-specific evaluations through structured natural language programs. Models learn through a draft, critique, and revise pipeline, where symbolic evaluation against the rubrics provides transparent feedback for both initial and revised responses during GRPO training. Applied to uncensored Llama-3.1-8B-Instruct, QA-LIGN reduces attack success rates by up to 68.7% while maintaining a 0.67% false refusal rate, achieving Pareto optimal safety-helpfulness performance and outperforming both DPO and GRPO with state-of-the-art reward models given equivalent training. These results demonstrate that making reward signals interpretable and modular improves alignment effectiveness, suggesting transparency enhances LLM safety."
bibtex: |
  @inproceedings{dineen-etal-2025-qa,
      title = "{QA}{-}{LIGN}: Aligning {LLM}s through Constitutionally Decomposed {QA}",
      author = "Dineen, Jacob  and
        Rrv, Aswin  and
        Liu, Qin  and
        Xu, Zhikun  and
        Ye, Xiao  and
        Shen, Ming  and
        Li, Zhaonan  and
        Lu, Shijie  and
        Baral, Chitta  and
        Chen, Muhao  and
        Zhou, Ben",
      editor = "Christodoulopoulos, Christos  and
        Chakraborty, Tanmoy  and
        Rose, Carolyn  and
        Peng, Violet",
      booktitle = "Findings of the {A}ssociation for {C}omputational {L}inguistics: {EMNLP} 2025",
      month = nov,
      year = "2025",
      address = "Suzhou, China",
      publisher = "Association for Computational Linguistics",
      url = "https://aclanthology.org/2025.findings-emnlp.1123/",
      doi = "10.18653/v1/2025.findings-emnlp.1123",
      pages = "20619--20642",
      ISBN = "979-8-89176-335-7"
  }
---
