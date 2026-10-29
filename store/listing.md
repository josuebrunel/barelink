# Chrome Web Store listing

**Name:** Barelink
**Category:** Productivity (or Privacy & Security)
**Summary (132 max):** Strips tracking params from links you copy, share or open on X, YouTube, Reddit, Instagram, Facebook, Threads and Bluesky.

## Description
Ever notice how a shared link grows a tail like `?s=20&t=Ab12` or `?si=...&igsh=...`? Those parameters tell the platform who shared the link and who clicked it. Barelink removes them.

When you click Copy link or Share, or paste a tracked link and open it, Barelink gives you the bare URL, nothing else.

Supported: X/Twitter, YouTube, Reddit, Instagram, Facebook, Threads, Bluesky.

- Works silently, no buttons or settings.
- Keeps params that matter (YouTube timestamps, Facebook post ids).
- No data collected, no network requests, no accounts. Open source: https://github.com/josuebrunel/barelink

## Single purpose
Remove tracking parameters from links on supported social platforms.

## Permission justifications
- declarativeNetRequest: redirect page loads to the same URL without tracking params.
- Host permissions (x.com, twitter.com, youtube.com, youtu.be, reddit.com, redd.it, facebook.com, fb.watch, instagram.com, threads.net, threads.com, bsky.app): run the link cleaner on those sites only.
- Remote code: none.

## Privacy
Barelink collects, stores and transmits no user data. Everything runs locally in the browser.
Privacy policy URL: https://github.com/josuebrunel/barelink/blob/main/PRIVACY.md
