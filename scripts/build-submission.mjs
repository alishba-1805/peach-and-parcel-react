import { execFileSync } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import path from "node:path";

const gitArgs = ["-c", "safe.directory=" + process.cwd()];
function git(...args) {
  return execFileSync("git", [...gitArgs, ...args], {
    encoding: "utf8",
  }).trim();
}
if (git("status", "--porcelain", "--untracked-files=no"))
  throw new Error(
    "Commit tracked changes before generating final submission artifacts.",
  );
const commit = git("rev-parse", "HEAD");
const output = path.join(tmpdir(), "PeachAndParcel-submission");
await mkdir(output, { recursive: true });
const [roll = "24i-2036", student = "AlishbaInam", section = "Section"] =
  process.argv.slice(2);
const safe = (value) => value.replace(/[^a-zA-Z0-9_-]/g, "");
const archive = path.join(
  output,
  safe(roll) + "_" + safe(student) + "_" + safe(section) + "_A#02.zip",
);
git("archive", "--format=zip", "--output=" + archive, "HEAD");
let report = (await readFile("docs/REPORT.html", "utf8")).replaceAll(
  "[FINAL_COMMIT_HASH]",
  commit,
);
// Embed only local report images so the standalone report works outside the repository.
for (const match of [...report.matchAll(/src="(screenshots\/[^"]+)"/g)]) {
  const bytes = await readFile(path.join("docs", match[1]));
  report = report.replace(
    match[0],
    'src="data:image/png;base64,' + bytes.toString("base64") + '"',
  );
}
const reportPath = path.join(output, "Peach_and_Parcel_Report.html");
await writeFile(reportPath, report);
const manifest = {
  commit,
  archive,
  reportHtml: reportPath,
  reportPdf: path.join(output, "Peach_and_Parcel_Report.pdf"),
  archiveSha256: createHash("sha256")
    .update(await readFile(archive))
    .digest("hex"),
  publicDeployment:
    "BLOCKED: Vercel login, deployment and public verification required",
  identity: "Alishba Inam, 24i-2036; section still required",
};
await writeFile(
  path.join(output, "submission-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log(JSON.stringify(manifest, null, 2));
