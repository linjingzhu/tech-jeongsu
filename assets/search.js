(function (root) {
  const normalize = (value) => String(value ?? "").normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
  const hashLink = (path, section) => "#" + path + (section ? "::" + section : "");
  function sections(doc, blocks, link = hashLink) {
    const entries = [{ ...doc, href: link(doc.path, ""), context: doc.group, text: "" }];
    let current = entries[0], section = 0;
    for (const block of blocks) {
      if (block.level === 2 || block.level === 3) {
        current = {
          title: block.text,
          context: doc.group + " · " + doc.title,
          href: link(doc.path, "section-" + section++),
          text: "",
        };
        entries.push(current);
      } else {
        current.text += " " + block.text;
      }
    }
    return entries;
  }
  function prepare(entries) {
    return entries.map((entry) => ({
      ...entry,
      text: String(entry.text ?? "").replace(/\s+/g, " ").trim(),
      searchable: normalize(entry.title + " " + (entry.text || "")),
    }));
  }
  function find(entries, value) {
    const query = normalize(value);
    if (!query) return [];
    return entries.filter((entry) => entry.searchable.includes(query)).map((entry) => {
      const at = normalize(entry.text).indexOf(query);
      const start = Math.max(0, at - 45);
      const snippet = (start ? "…" : "") + entry.text.slice(start, start + 170) +
        (entry.text.length > start + 170 ? "…" : "");
      return { ...entry, snippet };
    }).sort((a, b) => Number(normalize(b.title).includes(query)) - Number(normalize(a.title).includes(query)));
  }
  const api = { normalize, sections, prepare, find };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.DocumentSearch = api;
})(typeof window !== "undefined" ? window : globalThis);
