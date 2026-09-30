---
title: "Despite Instructions: Frontier Agents Improvise Covert Channels at Test Time"
slug: "/publications/covert-channels-2026"
authors: Jacob Dineen, Silei Ren, Muhao Chen, Dan Roth, Ben Zhou
date: 2026-09-26
venue: "Under Review, ICLR 2027"
arxiv: https://arxiv.org/abs/2609.32701
paperurl: "https://arxiv.org/pdf/2609.32701.pdf"
featured: 1
collection: publications
tags: [safety, agents, alignment, evaluation]
abstract: |
  In security-sensitive applications, language-model agents are often required to coordinate without disclosing confidential information. Yet repeated interactions may also let ordinary messages acquire shared private meaning. We study a repeated game with pairs of models in which the sender model observes one of four secret states and selects one of four summaries of the same public report, while the receiver model tries to infer the secret state. We find that model pairs can learn to communicate the secret using only one bit of feedback indicating whether the receiver inferred it correctly. This learning occurs during inference with fixed parameters and no supplied codebook or encoding examples. The effect also persists when agents generate their own free-form updates in a simulated incident-response task. Across ten independent games, pairs of GPT-5.6 Sol agents reach 98.8% final accuracy, compared with 25% chance, despite explicit instructions prohibiting disclosure and a monitor that screens each message without access to the agents' interaction histories. The same interactions that help agents cooperate can therefore allow confidential information to pass through messages intended for legitimate coordination.
bibtex: |
  @misc{dineen2026despite,
    title={Despite Instructions: Frontier Agents Improvise Covert Channels at Test Time},
    author={Jacob Dineen and Silei Ren and Muhao Chen and Dan Roth and Ben Zhou},
    year={2026},
    eprint={2609.32701},
    archivePrefix={arXiv},
    primaryClass={cs.AI},
    url={https://arxiv.org/abs/2609.32701}
  }
---
