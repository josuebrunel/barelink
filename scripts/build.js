// Regenerates rules.json and the manifest host lists from the RULES table in clean.js.
const fs = require("node:fs");
const path = require("node:path");
const { RULES } = require("../clean.js");

const root = path.join(__dirname, "..");
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function dnrRules() {
  return RULES.map((r, i) => ({
    id: i + 1,
    priority: 1,
    action: {
      type: "redirect",
      redirect: { transform: { queryTransform: { removeParams: r.params } } },
    },
    condition: {
      regexFilter:
        "^https://(?:[^/?#]+\\.)?(?:" + r.hosts.map(escapeRe).join("|") + ")" +
        (r.path ? r.path.replace(/^\^/, "") : "") +
        "[^#]*[?&](?:" + r.params.map(escapeRe).join("|") + ")=",
      resourceTypes: ["main_frame"],
    },
  }));
}

function generate() {
  const matches = RULES.flatMap((r) => r.hosts).map((h) => `https://*.${h}/*`);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
  manifest.host_permissions = matches;
  manifest.content_scripts[0].matches = matches;
  manifest.declarative_net_request.rule_resources[0].path = "rules.json";
  return { manifest, rules: dnrRules() };
}

if (require.main === module) {
  const { manifest, rules } = generate();
  fs.writeFileSync(path.join(root, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  fs.writeFileSync(path.join(root, "rules.json"), JSON.stringify(rules, null, 2) + "\n");
}
module.exports = { generate };
