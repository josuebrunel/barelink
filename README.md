# Barelink

A small browser extension that strips tracking parameters from links you copy, share or open.

Today it handles X/Twitter status links (`s`, `t`, `ref_src`, `ref_url`). Support for YouTube, Reddit, Bluesky, Facebook, Instagram and Threads is on the way, see the open issues.

## How it works

- `rules.json` redirects page loads to the same URL minus the tracking params (declarativeNetRequest).
- `content.js` wraps `navigator.clipboard.writeText`, `navigator.share` and the `copy` event so links you copy or share are cleaned.
- `clean.js` holds the cleaning logic, shared by the content script and the tests.

## Install (unpacked)

1. Open `chrome://extensions` and turn on Developer mode.
2. Click "Load unpacked" and pick this folder.

## Tests

```
node --test
```

## License

MIT
