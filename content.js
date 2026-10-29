// Runs in the page world so X's own "Copy link" / "Share" calls go through the cleaners.
(() => {
  const clip = navigator.clipboard;
  if (clip && clip.writeText) {
    const writeText = clip.writeText.bind(clip);
    clip.writeText = (text) => writeText(BareLink.cleanText(text));
  }

  if (navigator.share) {
    const share = navigator.share.bind(navigator);
    navigator.share = (data) =>
      share(data && { ...data, url: data.url && BareLink.cleanText(data.url), text: BareLink.cleanText(data.text) });
  }

  document.addEventListener("copy", (e) => {
    const selected = String(document.getSelection());
    const cleaned = BareLink.cleanText(selected);
    if (selected && cleaned !== selected) {
      e.clipboardData.setData("text/plain", cleaned);
      e.preventDefault();
    }
  }, true);
})();
