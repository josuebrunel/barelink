// Shared by the content script and tests. Removes tracking params from X status URLs.
const BareLink = (() => {
  const TRACKING = ["s", "t", "ref_src", "ref_url"];
  const STATUS_URL = /https?:\/\/(?:www\.)?(?:x|twitter)\.com\/[^\s/?#]+\/status\/\d+[^\s]*/g;

  function cleanUrl(raw) {
    try {
      const url = new URL(raw);
      TRACKING.forEach((p) => url.searchParams.delete(p));
      return url.toString();
    } catch {
      return raw;
    }
  }

  function cleanText(text) {
    return typeof text === "string" ? text.replace(STATUS_URL, cleanUrl) : text;
  }

  return { cleanUrl, cleanText };
})();
if (typeof module !== "undefined") module.exports = BareLink;
