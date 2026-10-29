# Chrome Web Store listing

**Name:** Barelink
**Category:** Productivity (or Privacy & Security)
**Summary (132 max):** Removes tracking parameters from the links you copy, share or open on social media, so you share the bare link.

## Description
Shared links often grow a tail like `?s=20&t=Ab12` or `?si=...`. Those parameters tell the platform who shared the link and who clicked it. Barelink removes them.

When you click Copy link or Share, or open a link that carries tracking parameters, Barelink gives you the plain URL and nothing else.

- Works silently, no buttons or settings.
- Keeps parameters that matter, like video timestamps.
- Collects no data and makes no network requests. Open source: https://github.com/josuebrunel/barelink

## Single purpose
Remove tracking parameters from links on supported social platforms.

## Permission justifications
- declarativeNetRequest: redirect page loads to the same URL without tracking params.
- Host permissions (x.com, twitter.com, youtube.com, youtu.be, reddit.com, redd.it, facebook.com, fb.watch, instagram.com, threads.net, threads.com, bsky.app): run the link cleaner on those sites only.
- Remote code: none.

## Privacy
Barelink collects, stores and transmits no user data. Everything runs locally in the browser.
Privacy policy URL: https://github.com/josuebrunel/barelink/blob/main/PRIVACY.md
