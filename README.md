<p align="center"><img src="icons/logo.png" width="96" alt="Barelink logo"></p>

# Barelink

A small browser extension that strips tracking parameters from links you copy, share or open.

It cleans links on these platforms:

| Platform | Hosts | Stripped params |
|---|---|---|
| X / Twitter | `x.com`, `twitter.com` (status links) | `s`, `t`, `a`, `ref_src`, `ref_url` |
| YouTube | `youtube.com`, `youtu.be` | `si`, `feature`, `pp` |
| Reddit | `reddit.com`, `redd.it` | `utm_*`, `share_id`, `ref`, `ref_source` |
| Bluesky | `bsky.app` | `utm_*` |
| Facebook | `facebook.com`, `fb.watch` | `fbclid`, `mibextid`, `ref`, `__tn__`, `__cft__[0]` |
| Instagram | `instagram.com` | `igsh`, `igshid`, `utm_source`, `mdxt`, `rpxt` |
| Threads | `threads.net`, `threads.com` | `xmt`, `slof`, `igshid` |

Params that change what you see (YouTube `t`, Reddit `context`, Facebook `id`) are kept.

## How it works

- `rules.json` redirects page loads to the same URL minus the tracking params (declarativeNetRequest).
- `content.js` wraps `navigator.clipboard.writeText`, `navigator.share` and the `copy` event so links you copy or share are cleaned.
- `clean.js` holds the per-platform rule table and the cleaning logic, shared by the content script, the build script and the tests.

## Adding a platform

Add an entry to `RULES` in `clean.js`, then run `node scripts/build.js` to regenerate `rules.json` and the manifest host lists. The tests fail if they drift.

## Install

Chrome Web Store: coming soon (submitted for review).

### Unpacked

1. Open `chrome://extensions` and turn on Developer mode.
2. Click "Load unpacked" and pick this folder.

## Build the store package

```
node scripts/build.js
zip -r dist/barelink-<version>.zip manifest.json clean.js content.js rules.json icons/icon-*.png
```

Store listing copy and assets live in `store/`.

## Privacy

Barelink collects no data and makes no network requests. See [PRIVACY.md](PRIVACY.md).

## Tests

```
node --test
```

## License

MIT
