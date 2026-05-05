---
title: "Skill Reuse as Compression in Agentic RL"
slug: "/publications/skill-reuse-2026"
authors: Zhikun Xu, Yu Feng, Jacob Dineen, Taiwei Shi, Jieyu Zhao, Ben Zhou
date: 2026-01-03
venue: "Pending NeurIPS 2026"
collection: publications
abstract: "Large language model (LLM) agents trained with reinforcement learning frequently overfit to training task distributions and fail to generalize robustly to novel scenarios. We propose ReuseRL, a framework that unifies skill-reuse objectives under a single Minimum Description Length (MDL) principle, revealing that the widely-used round-length penalty is not a heuristic baseline but the fixed-code member of a broader MDL family: it minimizes description length under a trivial dictionary in which every atomic action is encoded independently. ReuseRL instead extracts a shared BPE skill dictionary from successful trajectories, applying a description length penalty that rewards structurally compressible, and thus genuinely reusable, behavioral patterns. We establish that lower description length implies tighter PAC-Bayes bounds on future trajectory complexity, grounding the compression objective in formal generalization theory. Critically, we identify the conditions under which the learned dictionary supersedes the fixed-code alternative: environments where successful trajectories reflect process-correct, compositional reasoning rather than terminal-answer shortcuts. In such settings, the learned MDL isolates true reusable subroutines rather than shared statistical noise, a distinction currently evidenced by progress-score gains on ScienceWorld, where success metrics are confounded by reward hacking."
---
