---
title: "ThinkTuning: Instilling Cognitive Reflections without Distillation"
slug: "/publications/thinktuning-2025"
tldr: "Teaches base models to reflect by having a same-size teacher inject corrective feedback into GRPO rollouts."
authors: Aswin RRV, Jacob Dineen, Divij Handa, Md Nayem Uddin, Mihir Parmar, Chitta Baral, Ben Zhou
date: 2025-08-11
venue: "EMNLP 2025"
arxiv: https://arxiv.org/abs/2508.07616
paperurl: "https://arxiv.org/pdf/2508.07616.pdf"
pdf: "/publications/thinktuning-2025.pdf"
googlescholar: https://scholar.google.com/citations?view_op=view_citation&hl=en&user=2sYaEtQAAAAJ&citation_for_view=2sYaEtQAAAAJ:2osOgNQ5qMEC
code: https://github.com/3rdAT/ThinkTuning
teaser: "/teasers/thinktuning-2025.webp"
collection: publications
tags: [rl, post-training, reasoning]
featured: 4
semanticscholar: https://www.semanticscholar.org/paper/ThinkTuning%3A-Instilling-Cognitive-Reflections-Rrv-Dineen/bd882244d2d84d7a455fdd1af5198f8fbdcdd228
slides: "/slides/ThinkTuningSlides.pdf"
abstract: |
  Recent advances in test-time scaling have led to the emergence of thinking LLMs that exhibit self-reflective behaviors and multi-step reasoning. While RL drives this self-improvement paradigm, a recent study (Gandhi et al., 2025) shows that RL alone does not truly instill these new reasoning abilities - it merely draws out behaviors already present in the base models. This raises a question: How can we train the models that don't exhibit such thinking behavior to develop it in the first place? To this end, we propose ThinkTuning, a GRPO-based interactive training approach where we augment the rollouts of a student model with the guidance from a teacher model. A simple idea from classroom practice inspires our method: a teacher poses a problem, lets the student try an answer, then gives corrective feedback -- enough to point the mind in the right direction and then show the solution. Each piece of feedback reshapes the student's thoughts, leading them to arrive at the correct solution. Similarly, we find that this type of implicit supervision through feedback from a teacher model of the same size improves the reasoning capabilities of the student model. In particular, on average, our method shows a 3.85% improvement over zero-shot baselines across benchmarks, and on MATH-500, AIME and GPQA-Diamond it shows 2.08%, 2.23% and 3.99% improvements over the vanilla-GRPO baseline. Source code is available at this https URL.
bibtex: |
  @inproceedings{rrv-etal-2025-thinktuning,
      title = "{T}hink{T}uning: Instilling Cognitive Reflections without Distillation",
      author = "Rrv, Aswin  and
        Dineen, Jacob  and
        Handa, Divij  and
        Uddin, Md Nayem  and
        Parmar, Mihir  and
        Baral, Chitta  and
        Zhou, Ben",
      editor = "Christodoulopoulos, Christos  and
        Chakraborty, Tanmoy  and
        Rose, Carolyn  and
        Peng, Violet",
      booktitle = "Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing",
      month = nov,
      year = "2025",
      address = "Suzhou, China",
      publisher = "Association for Computational Linguistics",
      url = "https://aclanthology.org/2025.emnlp-main.1592/",
      doi = "10.18653/v1/2025.emnlp-main.1592",
      pages = "31248--31262",
      ISBN = "979-8-89176-332-6"
  }
---
