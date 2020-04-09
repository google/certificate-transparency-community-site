---
title: Chrome enforces CT for new TLS certificates
date: 2018-05-01
---
In version 68, Chrome began enforcing that all TLS server certificates issued after April 30, 2018 comply with the Chromium CT Policy in order to be trusted. Main page connections served over a non-compliant connection began to display a full page warning, and sub-resources served over a non-compliant connection stopped loading.
