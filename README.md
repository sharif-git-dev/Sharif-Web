# Sharif Jamo — portfolio

A single-page React site (Create React App, React Router, Framer Motion).

## Run it

```bash
npm start
```

```bash
npm test
```

```bash
npm run build
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/redesign/data.js` | **All content.** Profile, projects, experience, resume, services, FAQs. Edit text here. |
| `src/redesign/styles.css` | The whole design system. Colours for dark and light mode are the tokens at the top. |
| `src/redesign/ui.js` | Shared building blocks: buttons, icons, logo, reveals, project cards, marquee. |
| `src/redesign/Project.js` | The one template every case study uses. |
| `src/redesign/projectMedia.js` | Active covers, curated screenshots, captions and their matching deliverable sections. |
| `src/redesign/Timeline.js` | The experience timeline (Home and Resume). |
| `src/redesign/motion.js` | The animation preference (system setting plus the footer switch). |
| `src/assets/Project_img/` | Project covers and gallery images. |
| `public/` | Favicon, app icons, social-share image, `index.html`. |
| `_removed/` | Everything taken out during the audit, with a log of what and why. |

## Common edits

- **Change your title or bio:** `profile` in `data.js`.
- **Add a project:** copy an entry in `projectEntries` in `data.js`, keep every field, then add its media entry in `projectMedia.js`. The work index, filters, case study page and tests pick it up.
- **Change the accent colour:** `--accent` in `styles.css` (once for dark, once for light).
- **Swap a project image:** update `projectMedia.js`. Each gallery image's `relatedTo` must match the deliverable heading it illustrates. Keep complete screens, explanatory captions and intentional image counts; WhisperLM uses one cover and one supporting image.

## Notes

The Resume page's print button opens the checked, two-page PDF in `public/resume/` so its layout does not depend on browser print settings or expanded timeline items. To update it after changing resume content, run `node scripts/export-resume-data.cjs`, then `python scripts/build_resume.py` with ReportLab installed. The complete web resume retains the longer experience descriptions; the print edition uses concise highlights.

- The site follows the visitor's system "reduce motion" setting. The switch in the footer overrides it.
- The theme follows the system light/dark setting until the visitor picks one.
- The contact form posts to `public/api/contact.php`, which uses authenticated SMTP on Plesk. Configure the mailbox password outside the document root before deployment. See `deployment/plesk/PLESK-SETUP.txt`; never add SMTP credentials to React environment variables.
