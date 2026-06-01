---
title: "HINDCAST: Replaying Prediction Markets to Evaluate LLM Forecasters"
slug: "/publications/hindcast-2026"
authors: Xiao Ye, Jacob Dineen, Evan Zhu, Shijie Lu, Kevin Song, Ben Zhou
date: 2026-05-15
venue: "Pending EMNLP 2026"
collection: publications
tags: [evaluation, retrieval, agents]
abstract: |
  Forecasters are evaluated by backtesting, replaying resolved questions to grade the probability the system would have assigned before the outcome was known. For LLMs, two channels leak the answer into this test. Web retrieval can surface reports written after the event, turning forecasting into a lookup task. And each new model is trained on more recent data, so a question that lay in the future for last year's models lies inside this year's training data, where the answer is already memorized. Either way, the test rewards recall rather than foresight. We introduce HINDCAST, which closes both leaks by grading a model as if it stood at a chosen past date τ, before the outcome existed in either channel. HINDCAST replays resolved Polymarket prediction markets against a frozen snapshot of public Reddit, lets the model read only posts written before τ, and scores each forecast against both what actually happened and the market's own price at τ, which is itself a human forecast made from the same past information. Because the cutoff is set per market and the snapshot never changes, the evaluation re-runs on new markets as models improve, without going stale. With this leakage removed, we find that retrieval helps most models forecast, but only when Reddit discussed the event beforehand. Otherwise it feeds on speculation and backfires.
---
