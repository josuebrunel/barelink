const test = require("node:test");
const assert = require("node:assert");
const { cleanUrl, cleanText } = require("../clean.js");

const cases = [
  ["https://x.com/user/status/123?s=20&t=abc", "https://x.com/user/status/123"],
  ["https://twitter.com/user/status/123?s=20&ref_src=twsrc", "https://twitter.com/user/status/123"],
  ["https://x.com/user/status/123?lang=en&s=20", "https://x.com/user/status/123?lang=en"],
  ["https://x.com/LemmySour/status/2115619109874332051?a=7A-GYZKVgGNDK_wQ_eY&s=20", "https://x.com/LemmySour/status/2115619109874332051"],
  ["https://x.com/search?s=1&q=cats", "https://x.com/search?s=1&q=cats"],
  ["https://youtu.be/abc123?si=XyZ&t=42", "https://youtu.be/abc123?t=42"],
  ["https://www.reddit.com/r/go/comments/1/x/?utm_source=share&utm_medium=web&share_id=q", "https://www.reddit.com/r/go/comments/1/x/"],
  ["https://www.facebook.com/story.php?story_fbid=1&id=2&mibextid=abc", "https://www.facebook.com/story.php?story_fbid=1&id=2"],
  ["https://www.instagram.com/p/Abc/?igsh=xyz", "https://www.instagram.com/p/Abc/"],
  ["https://www.threads.net/@u/post/Abc?xmt=1&slof=1", "https://www.threads.net/@u/post/Abc"],
  ["https://bsky.app/profile/a.bsky.social/post/3k?utm_source=x", "https://bsky.app/profile/a.bsky.social/post/3k"],
  ["https://example.com/a?s=1", "https://example.com/a?s=1"],
];
for (const [input, want] of cases) {
  test(`cleanUrl ${input}`, () => assert.strictEqual(cleanUrl(input), want));
}

test("cleanUrl returns invalid input untouched", () => assert.strictEqual(cleanUrl("not a url"), "not a url"));

test("cleanText cleans links inside text", () => {
  assert.strictEqual(
    cleanText("look https://x.com/u/status/9?s=20 wow"),
    "look https://x.com/u/status/9 wow"
  );
});

test("cleanText ignores non strings", () => assert.strictEqual(cleanText(undefined), undefined));
