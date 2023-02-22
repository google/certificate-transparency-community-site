# Known Logs

The list of CT Logs that are currently compliant with Chrome's CT policy (or
have been and were disqualified), and are **included in Chrome**:
https://www.gstatic.com/ct/log_list/v3/log_list.json

`log_list.json` is signed by Google, the signature being hosted at:
https://www.gstatic.com/ct/log_list/v3/log_list.sig

`log_list.json` and the corresponding log_list.sig can also be obtained by
downloading the zip file containing both of them, found at:
https://www.gstatic.com/ct/log_list/v3/log_list.zip

The public key to verify `log_list.sig` can be found at:
https://www.gstatic.com/ct/log_list/v3/log_list_pubkey.pem

The list of all known and announced CT Logs:
https://www.gstatic.com/ct/log_list/v3/all_logs_list.json

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

To verify that your test root complies with the policy listed above, you can run the following `openssl` command:
```
$ openssl x509 -in google-test-monitor.cert -noout -serial -issuer -subject -ext keyUsage,basicConstraints
serial=BF90A6BDBEFC149E
issuer=C = GB, L = London, O = Google UK Ltd., OU = Certificate Transparency, CN = Test Monitor Root
subject=C = GB, L = London, O = Google UK Ltd., OU = Certificate Transparency, CN = Test Monitor Root
X509v3 Key Usage: critical
    Digital Signature, Certificate Sign
X509v3 Basic Constraints: critical
    CA:TRUE
```

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
<b>https://ct.googleapis.com/testtube/</b>
Base64 Log ID: sMyD5aX5fWuvfAnMKEkEhyrH6IsTLGNQt8b9JuFsbHc=
Operator: Google
Contact: google-ct-logs@googlegroups.com
</pre>
