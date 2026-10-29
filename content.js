// Runs in the page world so the site's own "Copy link" / "Share" calls go through the cleaners.
(() => {
  const clean = (t) => BareLink.cleanText(t);

  // Patch the prototype so calls that bypass the navigator.clipboard instance are caught too.
  const proto = typeof Clipboard !== "undefined" ? Clipboard.prototype : null;
  if (proto && proto.writeText) {
    const writeText = proto.writeText;
    proto.writeText = function (text) {
      return writeText.call(this, clean(text));
    };
  }

  if (proto && proto.write && typeof ClipboardItem !== "undefined") {
    const write = proto.write;
    proto.write = async function (items) {
      try {
        const cleaned = await Promise.all(
          Array.from(items, async (item) => {
            const data = {};
            for (const type of item.types) {
              const blob = await item.getType(type);
              data[type] = /^text\/(plain|html)$/.test(type)
                ? new Blob([clean(await blob.text())], { type })
                : blob;
            }
            return new ClipboardItem(data);
          })
        );
        return write.call(this, cleaned);
      } catch {
        return write.call(this, items);
      }
    };
  }

  if (navigator.share) {
    const share = navigator.share.bind(navigator);
    navigator.share = (data) =>
      share(data && { ...data, url: data.url && clean(data.url), text: clean(data.text) });
  }

  // Fallback path: execCommand("copy") on a selection or on a temporary input/textarea.
  document.addEventListener("copy", (e) => {
    const el = document.activeElement;
    const selected =
      el && typeof el.value === "string" && el.selectionStart !== el.selectionEnd
        ? el.value.slice(el.selectionStart, el.selectionEnd)
        : String(document.getSelection());
    const cleaned = clean(selected);
    if (selected && cleaned !== selected && e.clipboardData) {
      e.clipboardData.setData("text/plain", cleaned);
      e.preventDefault();
    }
  }, true);
})();
