---
title: Google / Known Logs
url: /google
layout: markdown
aliases:
  - /known-logs
---

# Known Logs

The list of CT Logs that are currently compliant with Chrome's CT policy (or
have been and were disqualified), and are **included in Chrome**:
https://www.gstatic.com/ct/log_list/v2/log_list.json

`log_list.json` is signed by Google, the signature being hosted at:
https://www.gstatic.com/ct/log_list/v2/log_list.sig

`log_list.json` and the corresponding log_list.sig can also be obtained by
downloading the zip file containing both of them, found at:
https://www.gstatic.com/ct/log_list/v2/log_list.zip

The public key to verify `log_list.sig` can be found at:
https://www.gstatic.com/ct/log_list/v2/log_list_pubkey.pem

The list of all known and announced CT Logs:
https://www.gstatic.com/ct/log_list/v2/all_logs_list.json

Both `log_list.json` and `all_logs_list.json` conform with the following schema:
https://www.gstatic.com/ct/log_list/v2/log_list_schema.json

To check whether Logs are currently **pending inclusion in Chrome**, check the
Chromium inclusion bugs:
[https://crbug.com/?q=component%3AInternals>Network>CertTrans](https://crbug.com/?q=component%3AInternals>Network>CertTrans)

## Special Purpose Logs

{{< log-callout url="https://ct.googleapis.com/daedalus/" base64LogID="HQJLjrFJizRN/YfqPvwJlvdQbyNdHUlwYaR3PEOcJfs=" operator="Google" contact="google-ct-logs@googlegroups.com" >}}

Daedalus is not trusted by Chrome. It only logs certificates that have expired.
See the announcement post [announcement post](https://groups.google.com/forum/#!topic/certificate-transparency/GUgWzCSN30I).

{{< log-callout url="https://ct.googleapis.com/submariner/" base64LogID="qJnYeAySkKr0YvMYgMz71SRR6XDQ+/WR73Ww2ZtkVoE=" operator="Google" contact="google-ct-logs@googlegroups.com" >}}

Submariner is not trusted by Chrome. It only logs certificates that chain to
roots that are on track for inclusion in browser roots or were trusted at some
previous point
[announcement blog post](https://security.googleblog.com/2016/03/certificate-transparency-for-untrusted.html).

## Test Logs

These logs are intended for **testing purposes only** and will only log
certificates that chain to a test root explicitly added to it.

To add a test root to the Google test Logs, please email
`google-ct-logs@googlegroups.com`

A test root should:

1.  have a certificate `Subject` field that:

    a) includes the word `test`, `dev`, `demo` or `staging` (to reduce the
    chance of real certificates being mixed up with test certificates).

    b) identifies the organization that the test root is for (to allow easy
    classification of test traffic).

2.  not allow real certificates to chain to it, either because:

    a) it is a self-signed root CA certificate identified as a test certificate
    (as above).

    b) it is an intermediate CA certificate that chains to a root certificate
    that is also identified as a test certificate.

3.  be a CA certificate, by:

    a) having CA:TRUE in the Basic Constraints extension.

    b) include the 'Certificate Sign' bit in the Key Usage extension.

4.  be in PEM format (with a .cer or .pem extension).

For historical reasons, Google's test logs include some test roots that do not
comply with all of the above requirements.

Google's test Logs are:

{{< log-callout url="https://ct.googleapis.com/logs/crucible/" base64LogID="w78Dp+HKiEHGB7rj/0Jw/KXsRbGG675OLPP8d4Yw9fY=" operator="Google" contact="google-ct-logs@googlegroups.com" >}}

{{< log-callout url="https://ct.googleapis.com/logs/solera2018/" base64LogID="UutLIl7IlpdIUGdfI+Q7wdAh4yFM5S7NX6h8IDzfygM=" operator="Google" contact="google-ct-logs@googlegroups.com" expiryRange="Jan 01 2018 00:00:00Z inclusive to Jan 01 2019 00:00:00Z exclusive" >}}

{{< log-callout url="https://ct.googleapis.com/logs/solera2019/" base64LogID="C3YOmouaaC+ImFsV6UdQGlZEa7qIMHhcOEKZQ4ZFDAA=" operator="Google" contact="google-ct-logs@googlegroups.com" expiryRange="Jan 01 2019 00:00:00Z inclusive to Jan 01 2020 00:00:00Z exclusive" >}}

{{< log-callout url="https://ct.googleapis.com/logs/solera2020/" base64LogID="H8cs5aG3mfQAw1m/+WyjkTVI6GRCIGEJUum6F3T3usc=" operator="Google" contact="google-ct-logs@googlegroups.com" expiryRange="Jan 01 2020 00:00:00Z inclusive to Jan 01 2021 00:00:00Z exclusive" >}}

{{< log-callout url="https://ct.googleapis.com/logs/solera2021/" base64LogID="o8mYRegKt84AFXs3Qt8CB90nKytgLs+Y7iwS25xa5+c=" operator="Google" contact="google-ct-logs@googlegroups.com" expiryRange="Jan 01 2021 00:00:00Z inclusive to Jan 01 2022 00:00:00Z exclusive" >}}

{{< log-callout url="https://ct.googleapis.com/logs/solera2022/" base64LogID="aXqvyhprU2+uISBQRt661+Dq6hPSQy5unY+zefK5qvM=" operator="Google" contact="google-ct-logs@googlegroups.com" expiryRange="Jan 01 2022 00:00:00Z inclusive to Jan 01 2023 00:00:00Z exclusive" >}}

{{< log-callout url="https://ct.googleapis.com/logs/solera2023/" base64LogID="+X6XuNM+96FZAqU6GeF5kOXcQGoDGCW6rZPpj5ucacs=" operator="Google" contact="google-ct-logs@googlegroups.com" expiryRange="Jan 01 2023 00:00:00Z inclusive to Jan 01 2024 00:00:00Z exclusive" >}}

{{< log-callout url="https://ct.googleapis.com/testtube/" base64LogID="sMyD5aX5fWuvfAnMKEkEhyrH6IsTLGNQt8b9JuFsbHc=" operator="Google" contact="google-ct-logs@googlegroups.com" >}}
