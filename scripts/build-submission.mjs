import { execFileSync } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import path from "node:path";

const gitOptions = ["-c", "safe.directory=" + process.cwd()];
function git(...args) {
  return execFileSync("git", [...gitOptions, ...args], { encoding: "utf8" }).trim();
}
if (git("status", "--porcelain")) {
  throw new Error("Commit source and documentation before generating submission artifacts.");
}
const commit = git("rev-parse", "HEAD");
const output = path.join(tmpdir(), "PeachAndParcel-notes-aligned-submission");
await mkdir(output, { recursive: true });
const [roll = "24i-2036", name = "AlishbaInam", section = "Section"] = process.argv.slice(2);
const safe = value => value.replace(/[^a-zA-Z0-9_-]/g, "");
const archive = path.join(output, [roll, name, section].map(safe).join("_") + "_A#02.zip");
execFileSync("git", [...gitOptions, "-c", "core.autocrlf=false", "archive", "--format=zip", "--output=" + archive, "HEAD"]);

let report = (await readFile("docs/REPORT.html", "utf8")).replaceAll("[FINAL_COMMIT_HASH]", commit);
for (const match of [...report.matchAll(/src="(screenshots\/[^"]+)"/g)]) {
  const image = await readFile(path.join("docs", match[1]));
  report = report.replace(match[0], 'src="data:image/png;base64,' + image.toString("base64") + '"');
}
const reportHtml = path.join(output, "Peach_and_Parcel_Report.html");
await writeFile(reportHtml, report);
const manifest = {
  commit,
  branch: git("branch", "--show-current"),
  repository: "https://github.com/alishba-1805/peach-and-parcel-react",
  student: "Alishba Inam",
  roll: "24i-2036",
  section: section === "Section" ? "[SECTION]" : section,
  archive,
  archiveSha256: createHash("sha256").update(await readFile(archive)).digest("hex"),
  reportHtml,
  reportPdf: path.join(output, "Peach_and_Parcel_Report.pdf"),
  deployment: "BLOCKED: no verified production URL",
};
await writeFile(path.join(output, "submission-manifest.json"), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest, null, 2));
