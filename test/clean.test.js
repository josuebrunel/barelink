const test = require("node:test");
const assert = require("node:assert");
const { cleanUrl, cleanText } = require("../clean.js");

const cases = [
  ["https://x.com/user/status/123?s=20&t=abc", "https://x.com/user/status/123"],
  ["https://twitter.com/user/status/123?s=20&ref_src=twsrc", "https://twitter.com/user/status/123"],
  ["https://x.com/user/status/123?lang=en&s=20", "https://x.com/user/status/123?lang=en"],
  ["https://x.com/search?s=1&q=cats", "https://x.com/search?s=1&q=cats"],
  ["https://youtu.be/abc123?si=XyZ&t=42", "https://youtu.be/abc123?t=42"],
  ["https://www.reddit.com/r/go/comments/1/x/?utm_source=share&utm_medium=web&share_id=q", "https://www.reddit.com/r/go/comments/1/x/"],
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
