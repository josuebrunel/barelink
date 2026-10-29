const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { generate } = require("../scripts/build.js");

const read = (f) => JSON.parse(fs.readFileSync(path.join(__dirname, "..", f), "utf8"));

test("manifest.json is in sync with RULES (run node scripts/build.js)", () => {
  const { manifest } = generate();
  const onDisk = read("manifest.json");
  assert.deepStrictEqual(onDisk.host_permissions, manifest.host_permissions);
  assert.deepStrictEqual(onDisk.content_scripts[0].matches, manifest.content_scripts[0].matches);
});

test("rules.json is in sync with RULES (run node scripts/build.js)", () => {
  assert.deepStrictEqual(read("rules.json"), generate().rules);
});

test("generated DNR regex matches tracked URLs only", () => {
  const re = new RegExp(read("rules.json")[0].condition.regexFilter);
  assert.ok(re.test("https://x.com/user/status/1?s=20"));
  assert.ok(re.test("https://mobile.twitter.com/user/status/1?lang=en&t=abc"));
  assert.ok(!re.test("https://x.com/user/status/1?lang=en"));
  assert.ok(!re.test("https://x.com/home?s=20"));
});
