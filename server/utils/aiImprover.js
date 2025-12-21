export function improveSummary(summary = "") {
  if (!summary) return "";

  return summary
    .replace(/worked with/gi, "experienced in")
    .replace(/good knowledge of/gi, "strong expertise in")
    .replace(/interested in/gi, "passionate about")
    .replace(/\.$/, "") +
    ". Proven ability to deliver scalable and high-quality solutions.";
}

const actionVerbs = [
  "Developed",
  "Designed",
  "Implemented",
  "Optimized",
  "Built",
  "Integrated",
  "Led",
  "Improved",
];

export function improveBullets(text = "") {
  if (!text) return [];

  const lines = text
    .split(/[.\n]/)
    .map(l => l.trim())
    .filter(Boolean);

  return lines.map((line, i) => {
    const verb = actionVerbs[i % actionVerbs.length];
    return `${verb} ${line.charAt(0).toLowerCase() + line.slice(1)}`;
  });
}
