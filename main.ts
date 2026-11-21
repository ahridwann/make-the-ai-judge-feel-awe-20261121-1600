import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "All day, one sentence after another, and each one weighed against the next. On a far shore, the tide comes in over flat sand. Wave after wave, the footprints go. The light from a star that burned out long ago is still crossing the dark, and it is in no hurry to arrive.";

function validateEntry(text: string): number {
  const codePoints = [...text].length;
  if (codePoints < 1 || codePoints > 280) {
    throw new Error(`entry must be 1-280 code points, got ${codePoints}`);
  }
  if (/^\s*$/.test(text)) {
    throw new Error("entry must not be only whitespace");
  }
  return codePoints;
}

function writeEntry(text: string): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

validateEntry(TEXT);
writeEntry(TEXT);
