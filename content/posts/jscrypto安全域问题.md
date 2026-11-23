+++
title = "jscrypto安全域问题"
date = "2023-05-07 15:32:25"
slug = "cdfb4f0e"
aliases = ["/2023/05_07_cdfb4f0e.html"]
description = "crypto.randomUUID 等仅在安全上下文（HTTPS）可用，localhost 被视为安全源，非安全域可参考所附链接启用。"
[taxonomies]
tags = ["js", "crypto", "https"]
[extra]
cover = "https://picsum.photos/400"
+++
// let new_bid = crypto.randomUUID(); //保证BID唯一; This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.But localhost is considered a secure origin https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features https://stackoverflow.com/questions/46670556/how-to-enable-crypto-subtle-for-unsecure-origins-in-chrome





localhost视为安全域;
