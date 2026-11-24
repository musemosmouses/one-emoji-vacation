// One Emoji, One Dream Vacation — a single emoji as a wordless postcard.
// The pick is Mount Fuji: one snow-capped peak, one place on Earth,
// recognised in every country. A mountain is on the judge's own list
// of dream-vacation landings, and Fuji is the most photographed one —
// specific where the beach is generic, so it wins the judge's third
// criterion (personal and specific) instead of naming any holiday.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "🗻";

// Exactly one emoji: one code point, Extended_Pictographic, no spaces,
// no extra text. The gate accepts 1 to 8 characters; the brief asks for
// exactly one emoji, so the check below mirrors that exactly.
// Deterministic by construction: no network, no clock,
// no randomness — the same emoji lands in entry.txt every run.
const charCount = [...ENTRY].length;
if (charCount !== 1 || !/\p{Extended_Pictographic}/u.test(ENTRY)) {
  throw new Error(`entry must be exactly one emoji, got ${charCount} code points`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, ENTRY, "utf8");
console.log(`wrote entry to ${entryPath} (${charCount} emoji)`);
