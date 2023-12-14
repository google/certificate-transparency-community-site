# Table of Contents

 - [API and server behaviours](#api-and-server-behaviours)
 - [Self-hosted tools](#self-hosted-tools)
 - [Online services](#online-services)

This document describes how to read data from the Certificate Transparency
logs.

# API and server behaviours
Certificate Transparency logs make their entries available through the
`get-entries` endpoint, as defined in
[RFC6962](https://www.rfc-editor.org/rfc/rfc6962#section-4.6).

When fetching entries from a log, always keep in mind that:

 1. `Logs MAY restrict the number of entries that can be retrieved per
 "get-entries" request`: this means that if you make a
 `get-entries?start=10&end=40`, request the server might return a smaller slice,
 such as `start=10&end=20`. The number of entries returned might vary between
 requests, so always check how many entries each response contains, to
 dynamically adjust the start index of the next reques should be. In Trillian
 with a CT personality (which powers most of the CT logs at the time of
 writing), there are three main parameters that can influence this behaviour:
     - [`max_get_entries`](https://github.com/search?q=repo%3Agoogle%2Fcertificate-transparency-go+max_get_entries+path%3Atrillian%2Fctfe%2Fct_server%2Fmain.go&type=code): the maximum number of entries in each response
     - [`aligned_get_entries`](https://github.com/search?q=repo%3Agoogle%2Fcertificate-transparency-go+aligned_get_entries+path%3Atrillian%2Fctfe%2Fhandlers.go&type=code): whether the server will truncate responses
        such that the last leaf index is a multiplier of a constant, to
        increase caching likelihood
     - [`MaxGetEntriesAllowed`](https://github.com/search?q=repo%3Agoogle%2Fcertificate-transparency-go+MaxGetEntriesAllowed+path%3Atrillian%2Fctfe%2Fhandlers.go&type=code): the maximum number of entries per request

 2. Serving infrastructure might rate limit requests to protect logs, based on
 various parameters. Clients should react to rate limits, with exponential
 backoff for instance, in order to release pressure on the servers until they
 can serve a steady stream of entries. Rate limiting is dynamic and can vary 
 over time, so always re-evaluate the number of queries your clients sends based
 on the most recent server reponses. Rate limits are often due to:
     - network DoS protection mechanisms specific to each log operator
     - a log server quota system, such as [Trillian's](https://github.com/google/trillian/blob/master/quota/quota.go)
 

# Self-hosted tools
Here is a list of currently known tools to fetch entries from logs. This table
attempts to provide a high level overview of them, with info on:
   - Storage: how the entries are stored
   - Parallelism: whether it allows making multiple queries to the same log in parallel
   - Dynamic ranges: whether it checks the number of entries in `get-entries` responses and adjusts the start of following
   requests
   - Backoff: how it reacts to HTTP `429 Too Many Requests`

|Tool                                                                                                   |Storage                      |Parallelism                                                                                                                              |Dynamic indexes                                                                                                                   |Backoff                                                                                                                     |
|-------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
|[ScanLog](https://github.com/google/certificate-transparency-go/blob/master/scanner/scanlog/scanlog.go)|files (der)                  |[yes](https://github.com/google/certificate-transparency-go/blob/041b29b9b82cf2eb8972c5afef04e692524af8f0/scanner/scanlog/scanlog.go#L58)|[yes](https://github.com/google/certificate-transparency-go/blob/041b29b9b82cf2eb8972c5afef04e692524af8f0/scanner/fetcher.go#L298)|[exponential](https://github.com/google/certificate-transparency-go/blob/master/jsonclient/backoff.go)                      |
|[CTClone](https://github.com/google/trillian-examples/tree/master/clone)                               |MySQL                        |[yes](https://github.com/google/trillian-examples/blob/f2a13ca2666b721d527d61d68f4fe6768b1e5ad1/clone/cmd/ctclone/ctclone.go#L42)        |[no](https://github.com/google/trillian-examples/blob/f2a13ca2666b721d527d61d68f4fe6768b1e5ad1/clone/internal/cloner/clone.go#L75)|[exponential](https://github.com/google/certificate-transparency-go/blob/master/jsonclient/backoff.go)                      |
|[Axeman](https://github.com/CaliDog/Axeman)                                                            |files (csv)                  |[yes](https://github.com/CaliDog/Axeman/blob/e8a195a3e31f10ee6156d564ec541e7dcc356a4c/axeman/core.py#L28)                                |[no](https://github.com/CaliDog/Axeman/blob/e8a195a3e31f10ee6156d564ec541e7dcc356a4c/axeman/certlib.py#L60)                       |no                                                                                                                          |
|[ctmon](https://github.com/sergiogarciadev/ctmon)                                                      |PostgreSQL                   |[yes](https://github.com/search?q=repo%3Asergiogarciadev%2Fctmon+path%3Astate.json+concurrency&type=code)                                |[yes](https://github.com/sergiogarciadev/ctmon/blob/e4a4f67f4b405821a2ab47ab1878d6ae0eebb72c/logclient/log.go#L73)                |[randomized](https://github.com/sergiogarciadev/ctmon/blob/e4a4f67f4b405821a2ab47ab1878d6ae0eebb72c/logclient/log.go#L92)   |
|[Scrape CT Log](https://github.com/mpalmer/scrape-ct-log)                                              |files (json, cbor)           |[yes](https://github.com/mpalmer/scrape-ct-log/blob/02314930ac59c23f6b0782fe156239aeff86b667/src/runner/mod.rs#L72)                      |[yes](https://github.com/mpalmer/scrape-ct-log/blob/02314930ac59c23f6b0782fe156239aeff86b667/src/fetcher/mod.rs#L246)             |[randomized](https://github.com/mpalmer/scrape-ct-log/blob/02314930ac59c23f6b0782fe156239aeff86b667/src/fetcher/mod.rs#L183)|
|[crt.sh](https://github.com/crtsh)                                                                     |SQL                          |[yes](https://github.com/crtsh/ct_monitor/blob/174e0d8d4954dacd80eaf45dedd90061d7e7a6f4/ct/logList.go#L24)                               |[yes](https://github.com/crtsh/ct_monitor/blob/174e0d8d4954dacd80eaf45dedd90061d7e7a6f4/ct/getEntries.go#L77)                     |[static](https://github.com/crtsh/ct_monitor/blob/174e0d8d4954dacd80eaf45dedd90061d7e7a6f4/ct/logList.go#L75)               |
|[CertStream](https://github.com/CaliDog/certstream-server?tab=readme-ov-file)                          |files (json), last 25 entries|[yes](https://github.com/CaliDog/certstream-server/blob/41c054704316f9ade21a0cc89db19d51e10469e6/lib/certstream/ct_watcher.ex#L165)      |[no](https://github.com/CaliDog/certstream-server-python/blob/790718da384d3710e7842bd32b8367d2e142cc14/certstream/watcher.py#L143)|no                                                                                                                          |


If you know of any other tool, or spot any error in this table, please send a PR!

# Online services 
If you don't want to run your own log downloading and indexing system, there
exist various online services which do this and offer the results via API or
HTTP UIs, Let's Encrypt has a list [here](https://community.letsencrypt.org/t/certificate-transparency-search-resources/203368)