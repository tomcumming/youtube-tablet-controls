const couldNotParse = "Could not parse url";

/** @argument {string} url */
export default function getCode(url) {
  const parsed = new URL(url);
  if (parsed.pathname === "/watch") {
    const v = parsed.searchParams.get("v");
    if (v !== null) return v;
    else throw new Error(couldNotParse);
  } else if (parsed.pathname.startsWith("/embed/"))
    return parsed.pathname.substr("/embed/".length);
  else if (parsed.hostname === "youtu.be") return parsed.pathname.substr(1);
  else throw new Error(couldNotParse);
}
