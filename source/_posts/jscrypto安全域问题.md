---
title: jscrypto安全域问题
tags:
  - js
  - crypto
cover: 'https://picsum.photos/400'
abbrlink: cdfb4f0e
date: 2023-05-07 15:32:25
---

// let new_bid = crypto.randomUUID(); //保证BID唯一; This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.But localhost is considered a secure origin https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features https://stackoverflow.com/questions/46670556/how-to-enable-crypto-subtle-for-unsecure-origins-in-chrome





localhost视为安全域;
