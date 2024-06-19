# Table of Contents

 - [Known Logs](#known-logs)
 - [Special Purpose Logs](#special-purpose-logs)
 - [Mirrors](#mirrors)
 - [Test Logs](#test-logs)

# Known Logs

The list of CT Logs that are currently compliant with Chrome's CT policy (or
have been and were disqualified), and are **included in Chrome**:
https://www.gstatic.com/ct/log_list/v3/log_list.json

The list of all known and announced CT Logs:
https://www.gstatic.com/ct/log_list/v3/all_logs_list.json

`log_list.json` and `all_logs_list.json` are signed by Google, the signatures
being hosted at: https://www.gstatic.com/ct/log_list/v3/log_list.sig and
https://www.gstatic.com/ct/log_list/v3/all_logs_list.sig respectively.

`log_list.json` and the corresponding log_list.sig can also be obtained by
downloading the zip file containing both of them, found at:
https://www.gstatic.com/ct/log_list/v3/log_list.zip

Similarly, `all_logs_list.json` and the corresponding all_logs_list.sig can be
obtained by downloading the zip file containing both of them, found at:
https://www.gstatic.com/ct/log_list/v3/all_logs_list.zip

The public key to verify `log_list.sig` and `all_logs_list.sig` can be found at:
https://www.gstatic.com/ct/log_list/v3/log_list_pubkey.pem

Both `log_list.json` and `all_logs_list.json` conform with the following schema:
https://www.gstatic.com/ct/log_list/v3/log_list_schema.json

To check whether Logs are currently **pending inclusion in Chrome**, check the
Chromium inclusion bugs:
[https://crbug.com/?q=component%3AInternals>Network>CertTrans](https://crbug.com/?q=component%3AInternals>Network>CertTrans)

## Special Purpose Logs

<pre>
<b>https://ct.googleapis.com/daedalus/</b>
Base64 Log ID: HQJLjrFJizRN/YfqPvwJlvdQbyNdHUlwYaR3PEOcJfs=
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

Daedalus is not trusted by Chrome. It only logs certificates that have expired.
See the
[announcement post](https://groups.google.com/forum/#!topic/certificate-transparency/GUgWzCSN30I).

<pre>
<b>https://ct.googleapis.com/submariner/</b>
Base64 Log ID: qJnYeAySkKr0YvMYgMz71SRR6XDQ+/WR73Ww2ZtkVoE=
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

Submariner is not trusted by Chrome. It only logs certificates that chain to
roots that are on track for inclusion in browser roots or were trusted at some
previous point
[announcement blog post](https://security.googleblog.com/2016/03/certificate-transparency-for-untrusted.html).

## Mirrors
These logs are hosted by Google and mirror the logs served at `Source URL`.
These mirrors run with no SLA.

<pre>
<b>https://ct.googleapis.com/logs/eu1/mirrors/letsencrypt_oak2023/</b>
Source URL: https://oak.ct.letsencrypt.org/2023/
Base64 Log ID: tz77JN+cTbp18jnFulj0bF38Qs96nzXEnh0JgSXttJk=
Operator: Let’s Encrypt
Contact: sre@letsencrypt.org
</pre>

<pre>
<b>https://ct.googleapis.com/logs/eu1/mirrors/letsencrypt_oak2022/</b>
Source URL: https://oak.ct.letsencrypt.org/2022/
Base64 Log ID: 36Veq2iCTx9sre64X04+WurNohKkal6OOxLAIERcKnM=
Operator: Let’s Encrypt
Contact: sre@letsencrypt.org
</pre>

<pre>
<b>https://ct.googleapis.com/logs/eu1/mirrors/digicert_yeti2022_2/</b>
Source URL: https://yeti2022-2.ct.digicert.com/log/
Base64 Log ID: BZwB0yDgB4QTlYBJjRF8kDJmr69yULWvO0akPhGEDUo=
Operator: DigiCert
Contact: ctops@digicert.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/eu1/mirrors/digicert_yeti2023/</b>
Source URL: https://yeti2023.ct.digicert.com/log/
Base64 Log ID: Nc8ZG7+xbFe/D61MbULLu7YnICZR6j/hKu+oA8M71kw=
Operator: DigiCert
Contact: ctops@digicert.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/us1/mirrors/digicert_nessie2022/</b>
Source URL: https://nessie2022.ct.digicert.com/log/
Base64 Log ID: UaOw9f0BeZxWbbg3eI8MpHrMGyfL956IQpoN/tSLBeU=
Operator: DigiCert
Contact: ctops@digicert.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/us1/mirrors/digicert_nessie2023/</b>
Source URL: https://nessie2023.ct.digicert.com/log/
Base64 Log ID: s3N3B+GEUPhjhtYFqdwRCUp5LbFnDAuH3PADDnk2pZo=
Operator: DigiCert
Contact: ctops@digicert.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/us1/mirrors/cloudflare_nimbus2022/</b>
Source URL: https://ct.cloudflare.com/logs/nimbus2022/
Base64 Log ID: QcjKsd8iRkoQxqE6CUKHXk4xixsD6+tLx2jwkGKWBvY=
Operator: Cloudflare
Contact: ct-logs@cloudflare.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/us1/mirrors/cloudflare_nimbus2023/</b>
Source URL: https://ct.cloudflare.com/logs/nimbus2023/
Base64 Log ID: ejKMVNi3LbYg6jjgUh7phBZwMhOFTTvSK8E6V6NS61I=
Operator: Cloudflare
Contact: ct-logs@cloudflare.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/us1/mirrors/cloudflare_nimbus2024/</b>
Source URL: https://ct.cloudflare.com/logs/nimbus2024/
Base64 Log ID: 2ra/az+1tiKfm8K7XGvocJFxbLtRhIU0vaQ9MEjX+6s=
Operator: Cloudflare
Contact: ct-logs@cloudflare.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/us1/mirrors/cloudflare_nimbus2025/</b>
Source URL: https://ct.cloudflare.com/logs/nimbus2025/
Base64 Log ID: zPsPaoVxCWX+lZtTzumyfCLphVwNl422qX5UwP5MDbA=
Operator: Cloudflare
Contact: ct-logs@cloudflare.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/us1/mirrors/comodo_mammoth/</b>
Source URL: https://mammoth.ct.comodo.com/
Base64 Log ID: b1N2rDHwMRnYmQCkURX/dxUcEdkCwQApBo2yCJo32RM=
Operator: Sectigo
Contact: ctops@sectigo.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/us1/mirrors/comodo_sabre/</b>
Source URL: https://sabre.ct.comodo.com/
Base64 Log ID: VYHUwhaQNgFK6gubVzxT8MDkOHhwJQgXL6OqHQcT0ww=
Operator: Sectigo
Contact: ctops@sectigo.com
</pre>

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

<pre>
<b>https://ct.googleapis.com/logs/crucible/</b>
Base64 Log ID: w78Dp+HKiEHGB7rj/0Jw/KXsRbGG675OLPP8d4Yw9fY=
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/solera2018/</b>
Base64 Log ID: UutLIl7IlpdIUGdfI+Q7wdAh4yFM5S7NX6h8IDzfygM=
Expiry range: Jan 01 2018 00:00:00Z inclusive to Jan 01 2019 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/solera2019/</b>
Base64 Log ID: C3YOmouaaC+ImFsV6UdQGlZEa7qIMHhcOEKZQ4ZFDAA=
Expiry range: Jan 01 2019 00:00:00Z inclusive to Jan 01 2020 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/solera2020/</b>
Base64 Log ID: H8cs5aG3mfQAw1m/+WyjkTVI6GRCIGEJUum6F3T3usc=
Expiry range: Jan 01 2020 00:00:00Z inclusive to Jan 01 2021 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/solera2021/</b>
Base64 Log ID: o8mYRegKt84AFXs3Qt8CB90nKytgLs+Y7iwS25xa5+c=
Expiry range: Jan 01 2021 00:00:00Z inclusive to Jan 01 2022 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/solera2022/</b>
Base64 Log ID: aXqvyhprU2+uISBQRt661+Dq6hPSQy5unY+zefK5qvM=
Expiry range: Jan 01 2022 00:00:00Z inclusive to Jan 01 2023 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/solera2023/</b>
Base64 Log ID: +X6XuNM+96FZAqU6GeF5kOXcQGoDGCW6rZPpj5ucacs=
Expiry range: Jan 01 2023 00:00:00Z inclusive to Jan 01 2024 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/eu1/solera2024/</b>
Base64 Log ID: MCTOfusWiGJyS+pwLv/5ks/kVkNBkapZWyX4AibIABc=
Expiry range: Jan 01 2024 00:00:00Z inclusive to Jan 01 2025 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/eu1/solera2025h1/</b>
Base64 Log ID: P+HLRu1HNXmvAUH5ck2dxENHLXVuhedxnFWCSF3U4eQ=
Expiry range: Jan 01 2025 00:00:00Z inclusive to Jul 01 2025 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/eu1/solera2025h2/</b>
Base64 Log ID: JgI5SIdM9/zQ+2RxpD6EfrsgCubi+iQjbfbRpgZjD7E=
Expiry range: Jul 01 2025 00:00:00Z inclusive to Jan 01 2026 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/eu1/solera2026h1/</b>
Base64 Log ID: yEuQege+qimmFMJFhLej9mJDlGh7Jf5ig4tx7EIq0vk=
Expiry range: Jan 01 2026 00:00:00Z inclusive to Jul 01 2026 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/logs/eu1/solera2026h2/</b>
Base64 Log ID: YukAYASjB5VadUS01YSpYmjKHW5Fha3wkW3+X9wfBNs=
Expiry range: Jul 01 2026 00:00:00Z inclusive to Jan 01 2027 00:00:00Z exclusive
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>

<pre>
<b>https://ct.googleapis.com/testtube/</b>
Base64 Log ID: sMyD5aX5fWuvfAnMKEkEhyrH6IsTLGNQt8b9JuFsbHc=
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>
