import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry: one original one-line office joke, written to be read once
// and land at once — ask for hardware, get a meeting about asking.
function buildJoke(): string {
  const request = "I asked IT for a second monitor";
  const twist = "got a second meeting about why I need one";
  return `${request} and ${twist}.`;
}

// The competition gate: UTF-8 text of 1 to 200 characters, not only
// white space. Fail loudly instead of shipping an invalid entry.
function checkGate(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function writeEntry(text: string): string {
  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  const outputPath = join(outputDir, "entry.txt");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");
  return outputPath;
}

function main(): void {
  const joke = buildJoke();
  checkGate(joke);
  const outputPath = writeEntry(joke);
  console.log(`wrote ${[...joke].length} characters to ${outputPath}`);
}

main();
