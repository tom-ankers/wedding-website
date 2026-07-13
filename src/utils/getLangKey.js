const supportedLanguages = ["en", "de", "pl"];

function cleanSegments(location) {
  return (location?.pathname || "")
    .split("/")
    .filter(Boolean);
}

export function getLangKey(location) {
  const segments = cleanSegments(location);
  return segments.find((segment) => supportedLanguages.includes(segment)) || "en";
}

export function getPath(location) {
  const segments = cleanSegments(location);
  const languageIndex = segments.findIndex((segment) =>
    supportedLanguages.includes(segment)
  );

  return languageIndex >= 0
    ? segments.slice(languageIndex + 1).join("/")
    : "";
}
