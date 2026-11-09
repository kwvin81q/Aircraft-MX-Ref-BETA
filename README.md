# FedEx MX Quick Connect — v1.7 Personal Notes Test Build

This is a **standalone GitHub Pages TEST PACKAGE**, derived from the v1.6 test build. No changes to the live production GitHub repository.

## Added in v1.7

- **ALL MY NOTES** below home-page aircraft references and above FedEx MX Quick Connect. Search notes by aircraft, tail number, or text; filter to one fleet.
- On **every aircraft detail page**: PERSONAL NOTES BY TAIL NUMBER with fleet color-matched glowing border and a tail dropdown drawn from saved notes. Add, view/edit, and delete notes.
- Each note has a saved tail number, aircraft type, text, created/updated timestamps. Multiple notes per tail are supported.
- **Export My Notes** downloads a JSON backup. **Import My Notes** restores/merges compatible backups by note ID with confirmation.
- Data stays in the current browser using `localStorage` key `mx-personal-tail-notes-v1`. No server uploads, shared usage records, or log-in synchronization. Notes can be lost if users clear site data, switch device/browser, or use private browsing. Export periodically.
- All existing fleet reference content, quick links, directory, manager list, Local ATIS display, Request A Change, Usage On This Device and visual styles from v1.6 are retained.

## Installation

1. Create or use your **TEST** GitHub repository.
2. Extract this zip; upload `index.html`, `manifest.webmanifest`, and `icon.svg` to repository root. Replace the existing test versions.
3. In GitHub Settings → Pages, publish branch `main` from `/ (root)`.
4. Open your test site with `?v=17` appended to avoid a cached page.
5. Tap MD-11, scroll to Personal Notes by Tail Number; add a note. Return home to see All My Notes. Test editing, deleting, filtering and export/import.

## Safety and privacy

These notes are personal browser reminders, **not official maintenance records**, aircraft log entries, signoffs or approved maintenance data. Do not store confidential company information, access codes, restricted technical data, or personal data in notes. Although notes are not sent by this app, local browser storage is not encrypted and is accessible to anyone with the browser profile; imported/exported backups are plaintext JSON. The base test app also contains a supplied employee contact directory: confirm distribution authorization before using a public GitHub Pages site.

## Verification

Static JS syntax check should pass using `node --check`. Visually verify iPhone/iPad/desktop and your full reference dataset before any production upgrade.
