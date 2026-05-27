---
title: "VisAnalog: A Diagnostic Suite for Visual Concept Transfer on Natural Images"
slug: "/publications/visual-analogies-2025"
authors: Zhaonan Li, Kyle R. Chickering, Bangzheng Li, Jacob Dineen, Xiao Ye, Zhikun Xu, Shijie Lu, Yuxi Huang, Ming Shen, Bach Nguyen, Jaya Adithya Pavuluri, Mau Son Nguyen, Sanika Chavan, Ngoc Minh Thu Le, Muhao Chen, Ben Zhou
date: 2025-11-02
venue: "CVPR Workshop on Visual Concepts (VisCon), 2026 (Oral)"
arxiv: https://arxiv.org/abs/2605.23141
paperurl: "https://arxiv.org/pdf/2605.23141.pdf"
semanticscholar: https://www.semanticscholar.org/paper/VisAnalog%3A-A-Diagnostic-Suite-for-Visual-Concept-on-Li-Chickering/c3711c1658825f4d4ccf603577be1ae7752420b6
collection: publications
tags: [multimodal, evaluation, reasoning]
abstract: |
  A useful test of visual concept learning is not just whether a model can recognize a concept in a single image, but whether it can preserve and manipulate concept-level properties under transformation and transfer them to new scenes. We introduce VisAnalog, a controlled suite for this setting on natural images. Each example instantiates A:B::C:?, where images B and a hidden target image D are produced by applying the same deterministic transformation sequence to source images A and C. Given A, B, and C, a model must answer a multiple-choice question about D. The benchmark contains 617 human-validated questions spanning one- to four-step transformations such as zoom, quadrant swap, rotation, flip, and hue rotation. Across strong proprietary and open-source VLMs, end-to-end accuracy is substantially lower than oracle accuracy when D is directly shown, and degrades sharply as transformation depth increases, while human performance remains near the ceiling. A program-conditioned evaluation further separates failures of relation inference from failures of transformation application, showing that inferring the visual relation from A to B is the dominant bottleneck, with additional application errors emerging on harder multi-step cases.
---
