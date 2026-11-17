# Publishing and submission

## Current state

Public repository: **https://github.com/alishba-1805/peach-and-parcel-react**. The public branch is master. This environment could not write .git/config, so publication used the explicit repository URL rather than a persisted origin remote. Genuine incremental local commits were created from the empty folder and published; the original public-at-the-beginning requirement was not met and no chronology was fabricated.

The first restricted-network auth check failed; the working Windows tool later confirmed GitHub authentication and created the public repository. Vercel CLI account configuration was not present. No Vercel deployment is claimed. The deploy-to-vercel skill's no-auth fallback was attempted: its endpoint now returns instructions to authenticate with the Vercel CLI/dashboard, without a preview URL. This is an external-service/account limitation, not an application build failure.

## GitHub: next steps

1. Open the public repository in a private/logged-out browser. Review commits, source, tests and evidence.
2. Fill student identity and the eventual Vercel URL in README.md and docs/REPORT.html. Keep [FINAL_COMMIT_HASH] as a placeholder in the tracked report template.
3. Commit and push those real updates:

```powershell
git add README.md docs/REPORT.html docs/VERIFICATION.md
git commit -m "docs: record student details and verified deployment"
git push https://github.com/alishba-1805/peach-and-parcel-react.git master
```

If Git reports dubious ownership because the tool-created .git belongs to the sandbox account, prepend each Git command with `git -c safe.directory="E:/OneDrive - FAST National University/FAST/BS (CY)/5th Semester/Web/Assignment 2"`. This trusts only this specific repository; do not set a wildcard exception. If login expires, run `gh auth login --hostname github.com --web` and choose the intended account.

When .git/config is writable in your own terminal, you may run `git remote add origin https://github.com/alishba-1805/peach-and-parcel-react.git` and then `git push -u origin master`. If you intended a different existing repository, inspect that repository's history first. Do not force push or overwrite remote work.

## Vercel: exact clicks/settings

1. Sign into Vercel with your own account. Click **Add New → Project → Import Git Repository**, authorize GitHub access if needed, and select the repository.
2. Framework preset **Vite**; root **./**; install **npm install**; build **npm run build**; output **dist**. No environment variables required.
3. Production branch is currently **master**. Keep that branch or deliberately rename/push main and adjust Vercel. Click **Deploy**.
4. Copy the real public production URL. Open it in a private window. Directly open and refresh **/products/strawberry-bento**, **/cart** and **/checkout**; verify images and full demo order flow at 390/1280.
5. In Vercel deployment details, compare the source SHA to `git rev-parse HEAD`. The included vercel.json rewrites nested paths to index.html.

## Finish student details and matching artifacts

Fill student name, roll, section and real repository/deployment links in README and docs/REPORT.html. Student identity is intentionally blank; Git author identity is not treated as student identity. The generated report is a **draft until these details and public evidence are supplied**.

After publishing, commit the real URLs/details and push; allow Vercel to redeploy that commit. Re-run tests/build and public checks. Keep **[FINAL_COMMIT_HASH]** in the tracked report template. Never hardcode its own commit hash in that tracked file.

```powershell
npm test
npm run build
git status --short
git add README.md docs/REPORT.html docs/VERIFICATION.md
git commit -m "docs: record student details and verified public deployment"
git push https://github.com/alishba-1805/peach-and-parcel-react.git master
git rev-parse HEAD
node scripts/build-submission.mjs '24I1234' 'YourNameWithoutSpaces' 'B'
```

Replace example arguments with your own details. The generator archives **HEAD**, verifies tracked source is clean, inserts the actual final hash into a standalone HTML report and writes artifacts to the printed temporary folder outside this repository. With no arguments it deliberately uses **RollNo_Name_Section_A#02.zip**, a placeholder-safe draft filename.

Open the generated report HTML in Chrome/Edge → **Ctrl+P → Save as PDF**, paper A4, background graphics on, browser headers/footers off. Save PDF beside the HTML, outside Git. A headless Playwright script can instead open that HTML and call `page.pdf({path:'.../Peach_and_Parcel_Report.pdf',format:'A4',printBackground:true})`.

The generator also writes submission-manifest.json with the final hash, archive SHA-256 and actual output paths. If you change source afterward, recommit, redeploy, reverify and regenerate **both** artifacts. Do not commit the final rendered PDF afterward.

Submit to Google Classroom: final PDF, correctly named source ZIP, public GitHub link and public Vercel link. Confirm the due date in Classroom; none is specified in the PDF. Review the 10-minute VIVA_GUIDE.md.
