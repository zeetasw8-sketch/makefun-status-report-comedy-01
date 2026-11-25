import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function validateLine(sentence: string): void {
  if (sentence.length < 1 || sentence.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${sentence.length}`);
  }
  if (sentence.includes("\n") || sentence.includes("\r")) {
    throw new Error("line must be a single line");
  }
  const stops = (sentence.match(/[.!?]/g) ?? []).length;
  if (stops !== 1 || !/[.!?]$/.test(sentence)) {
    throw new Error("line must be exactly one sentence");
  }
}

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "line.txt"), "utf8");
const sentence = raw.replace(/\r?\n$/, "");
validateLine(sentence);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), sentence, "utf8");
