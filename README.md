<p align="center">
<img src="https://onsitejs.org/offsite_rec.png" alt="OffSiteJS" style="width:250px;"/>
</p>

<p align="center">
📊 Tiny, decentralized analytics<br>
🧠 privacy by design<br>
🎉 Free and open source
</p>

<p align="center">
<a href="https://deploy.workers.cloudflare.com/?url=https://github.com/onsitejs/offsitejs">
<img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare Workers" style="width:130px;"/></a> <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
</p>


------------

**Features:**
- 🦐 Tiny serverless function with both pixel and lite analytics payload in Javascript
- 🔐 Privacy-conscious, with ability to hash or delete traffic like IP address or cookies
- 🚢 Forward-anywhere logging (see function `logData`)
- 🔥 Host local with [`miniflare`](https://github.com/cloudflare/miniflare), or
- ⛈️ Deploy on the Cloudflare Worker platform for global edge script delivery

**To-Do:**
- ✅ Pixel payload
- ✅ Lite Javascript payload
- ⏹️ Integration with [Orbit](https://orbitdb.org/) as a logging destination
- ⏹️ Integration with [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html) as a logging destination
- ⏹️ WebUI for folks to create-their-own analytics tag
- ⏹️ Web3 integration to encrypt analytics data and store user-sepcific content

## Contents
- [Running Locally](#running-locally-and-on-server)
- [Using offsitejs](#using-offsitejs)
- [Publishing to Cloudflare](#publishing-to-cloudflare)
- [Building From TypeScript](#building-from-typescript)
- [Contributions Welcome](#contributions-welcome)
- [Design and Development Decisions](#design-and-development-decisions)
  - [Core Principles](#core-principles)
  - [About Cloudflare and Miniflare](#about-cloudflare-and-miniflare)
  - [Room for Improvement](#room-for-improvement)
- [References](#references)

## Using OffSiteJS
There are two options for using OffSiteJS: the use of a pixel, or with the JavaScript payload.

⛔ **Logging is currently limited to `console.log()`. Integrations forthcoming.** ⛔

### Pixel analytics
Place the following tag on your webpage:
```
<img src="https://s.offsitejs.org/pixel.gif" style="display:none"></img>
```
### Javascript payload analytics
Place the following tag in the `<body>` tag, near the bottom before `</body>`:
```
<script src="https://s.offsitejs.org/offsite.js"></script>
```

From a signals collection standpoint, there is no benefit to using both tags.

### Hosting your own OffSiteJS instance 
If you are hosting OffSiteJS yourself, you would replace the hostname in the tags aboe like so.
```
https://s.yourwebsite.com/offsite.js
```
or maybe you could even put the record to a subdomain like
```
https://analytics.yourwebsite.com/offsite.js
```

## Running Locally and On Server
With [`miniflare`](https://github.com/cloudflare/miniflare) (recommended):
```
miniflare src/index.js  -c wrangler.toml -w -d --host 127.0.0.1 --port 8080
```
As you might imagine for `miniflare`, the host can be changed to `0.0.0.0` and the port `80` should you want to run this on a host, server, VPS. There are no dependencies other than `miniflare` needed to do this.

with [`wrangler`](https://github.com/cloudflare/wrangler):
```
wrangler dev
```

## Publishing to Cloudflare
Assuming you are logged into Cloudflare with [`wrangler`](https://github.com/cloudflare/wrangler):
```
# must be in src/ directory: cd src
wrangler publish
```
Ensure the proper configuration of `route`, and `zone_id` in `src/wrangler.toml`.

## Building from TypeScript
While it is possible to compile TypeScript source to a Javascript worker acceptable by the Cloudflare Workers platform / `miniflare`, there are some eccentricities that prevent it from working out of the box. Namely, the use of `exports.module` in TS is not accepted, and Workers insists on the `export {function | const | etc}` syntax.

To accomplish a portable worker in this repo, there is a `patchfile` in the `src/` directory intended to be applied on `index.js` after it is built from TypeScript. The patch was created like so:
1. First, command `tsc --lib es2020,dom index.ts` was run to compile `index.ts` into `index.js`
2. After adding and commiting `index.js` with git, the proper changes were made to the source file (e.g. deletion of certain lines).
3. A patchfile was generated with the command `git diff index.js > patchfile` and saved in the `src/` directory.

Now anyone can compile the `index.ts` file as it is in the `src/` directory, and then apply the patch to the newly generated `index.js` with `patch -p1 < patchfile`. This process is run as a `build` command everytime the worker is built locally with `miniflare` or `wrangler dev`.

There are some limitations, of course, as `index.ts` becomes more and more modified over time and by users. The `patch` command can only do so much to find the necessary changes to be made. But hopefully this description of how this system works will help future users, or, will indicate that the benefits of writing in TypeScript are not worth the hassle and that we should just move to pure JavaScript instead :)

## Contributions welcome
Please help yourself to filing bugs, features, comments in the [**Issues tab**](https://github.com/onsitejs/offsitejs/issues)!
And of course, you are welcome to [**launch a pull request**](https://github.com/onsitejs/offsitejs/pulls) if you'd like to contribute directly.

## Design and Development Decisions
The point of this project is to provide web analytics without the hassle of signing up for a service or a 3rd party.

There is false dichotomy between being able to conduct deep signals collection and protecting user privacy. Several proponents of the *privacy by design* school of thought [have demonstrated there are plenty of technological opportunites](https://epjdatascience.springeropen.com/articles/10.1140/epjds/s13688-014-0010-4) to provide better privacy-conscious experiences on the web.

We also don't want to lose out on data key to valuable insights. But those insights cannot come at the cost of  sacrificing privacy. Ideally, OffSiteJS would provide a library to automate the aggregation of data so no one individual session can being targeted, or is perhaps presented in the context of a *frequency vector* for that specific field to show anomalies without showing individual sessions.

### Core Principles
1. Decentralize where possible.
2. Distributed when necessary.
3. Do good.

The principles above extend the Privacy By Design principles of:
1. **Minimise**: The amount of personal information that is processed should be minimal.
2. **Hide**: Any personal information that is processed should be hidden from plain view.
3. **Separate**: The processing of personal information should be done in a distributed fashion whenever possible.
4. **Aggregate**: Personal information should be processed at the highest level of aggregation and with the least possible detail in which it is (still) useful.
5. **Inform**: Data subjects should be adequately informed whenever personal information is processed.
6. **Control**: Data subjects should have agency over the processing of their personal information.
7. **Enforce**: A privacy policy compatible with legal requirements should be in place and should be enforced.
8. **Demonstrate**: Demonstrate compliance with the privacy policy and any applicable legal requirements.


### About Cloudflare and Miniflare
Cloudflare was chosen due to its ability to provide lightweight edge services with little infrastructure configuration on the part of the user. Obviously, Cloudflare isn't exactly what comes to mind when people think of a decentralized computing paradigm. Perhaps one might consider Cloudflare's Workers platform a step in the right direction towards distributed computing, as there is no central server where OffSiteJS is running. Ultimately, the hosted flavor of OffSiteJS won't store any logs. This can be verified by the source code here and the GitHub deploy action that deploys the serverless worker.

`miniflare` also poses some challenges. It is excellent in many ways, as it does IP WHOIS and geolocation lookup at request time; this is great, as we can get approximate location information without storing the IP address and looking it up ourselves. However, the way this works is that `miniflare` does the lookup to a trusted Cloudflare endpoint, meaning by default, `miniflare` will be doing a lookup on an external service. In their own words:
> For a more accurate development experience, Miniflare automatically fetches the cf object for incoming requests (containing IP and location data) from a trusted Cloudflare endpoint, caching it for 30 days. You can disable this behaviour, falling back to a default cf object, using the `--no-cf-fetch` flag.

So using the `--no-cf-fetch` flag with `miniflare` will make sure it won't do lookups to Cloudflare, albeit at the cost of IP WHOIS and location data. If you wish to get that data at request time, the solution would to integrated with the industry-preferred [MaxMind Geolite DB](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data?lang=en).

### Room for Improvement
OffSiteJS is a fork of an ongoing project, **OnSiteJS**(https://onsitejs.org) whose mission is to provide a better alternative to Google Analytics. Where OffSiteJS will differ most will hopefully be its focus on decentralization. This will in part be accomplished with integrations with great projects like [IPFS](https://ipfs.io/), [Orbit](https://orbitdb.org/), [web3.js](https://web3js.readthedocs.io/en/v1.7.0/) and more. But it will also require some radical thinking as to:
- what is "enough" data for an average user to be able to make great insights about their website?
- what is "too much" data for the software, data pipeline, infrastructure provider, etc, to be able to see in transit?

Let's say Google Analytics is the ceiling of what is acceptable. That is not because they give the *customer* sooooo much data, but rather they are collecting *sooooooooooooooooo* much data for themselves. In comparison, many projects will surely suffice the overall goal of providing privacy-conscious analytics.

**So, the goal of OffSiteJS should be to make the most decentralized web analytics possible, without sacrificing usability or utility**.

The roadmap is somewhat open, as I am not completely sure how this will be accomplished (yet). Integration with a web3 wallet is an interesting concept, not just because it offers user authentication without a central services provider, but also due to the great APIs and developer community around the use of web3. 

## References
- [Privacy by Design: Little Blue Book](https://www.cs.ru.nl/~jhh/publications/pds-booklet.pdf)
- [Privacy-by-design in big data analytics and social mining](https://epjdatascience.springeropen.com/articles/10.1140/epjds/s13688-014-0010-4)
- [Ask HN: Good open source alternatives to Google Analytics?](https://news.ycombinator.com/item?id=29888599)
- [@aeolianeth on Twitter: "are dapps tracking you?"](https://twitter.com/aeolianeth/status/1485460799540051968)
- [Cloudflare blog on Web3](https://blog.cloudflare.com/what-is-web3/)

## Related Projects
- [OnSiteJS](https://onsitejs.org)
- [OnSiteJS GitHub](https://github.com/onsitejs)
- [Telex Shortlinks](https://telex.run)