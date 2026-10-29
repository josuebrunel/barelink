// Shared by the content script, the build script and tests. Removes tracking params from supported links.
const BareLink = (() => {
  const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

  // One entry per platform. `path` limits cleaning to matching URL paths; omit it to clean every path.
  // Keep entries exact-match params only: declarativeNetRequest cannot do prefixes.
  const RULES = [
    {
      name: "x",
      hosts: ["x.com", "twitter.com"],
      path: "^/[^/?#]+/status/[0-9]+",
      params: ["s", "t", "ref_src", "ref_url"],
    },
    {
      name: "youtube",
      hosts: ["youtube.com", "youtu.be"],
      params: ["si", "feature", "pp"],
    },
    {
      name: "reddit",
      hosts: ["reddit.com", "redd.it"],
      params: [...UTM, "share_id", "ref", "ref_source"],
    },
  ];

  const URL_PATTERN = /https?:\/\/[^\s]+/g;

  function ruleFor(url) {
    return RULES.find(
      (r) =>
        r.hosts.some((h) => url.hostname === h || url.hostname.endsWith("." + h)) &&
        (!r.path || new RegExp(r.path).test(url.pathname))
    );
  }

  function cleanUrl(raw) {
    try {
      const url = new URL(raw);
      const rule = ruleFor(url);
      if (!rule) return raw;
      rule.params.forEach((p) => url.searchParams.delete(p));
      return url.toString();
    } catch {
      return raw;
    }
  }

  function cleanText(text) {
    return typeof text === "string" ? text.replace(URL_PATTERN, cleanUrl) : text;
  }

  return { RULES, UTM, cleanUrl, cleanText };
})();
if (typeof module !== "undefined") module.exports = BareLink;
