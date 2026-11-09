# Memphis MX Aircraft Reference — isolated test package

This is a complete static GitHub Pages trial build of the Aircraft Reference app, with the existing reference data transcribed from `kwvin81q/Reference-FedEx-Fleet` (main/index.html, checked 2026-11-09), enhanced borders on every fleet page, the Memphis MX Contacts design and Security at the bottom of every aircraft page.

## TEST FIRST — NO LIVE CHANGES
1. Create a **new public or private GitHub repository**, for example `Reference-FedEx-Fleet-Test`.
2. Upload **all files from this ZIP** to the **repository root** (index.html, app.js, styles.css, icon.svg, manifest.webmanifest, README.md).
3. For a public test: Settings → Pages → Deploy from a branch → main → /(root) → Save. Wait for GitHub's deployment confirmation, then open its Pages URL.
4. Verify all five aircraft cards, oxygen, references, fuel loads, tether sizes, colorful fleet outlines, calls, favorites, personal contacts, and the bottom FedEx Security card.
5. To avoid mistakenly changing production, DO NOT upload these test files to the original repository until the test is approved.

## Design match
- Home layout: original 5 fleet selections, oxygen block, six small utility cards, Request a Change, Usage on This Device, disclaimer, then contacts panel.
- New contacts panel: purple fading/glowing outer border; favorite contacts with outlined blue gradient cards and green call controls; All Contacts; Security bright restrained red glowing outline at far bottom.
- Fleet detail pages: original reference cards/data with aircraft-color tinted gradient borders, more saturated panels, and bottom Security quick link.
- Favorites are user-customizable and stored per browser via `localStorage`, not shared with other mechanics. All Contacts can be searched and filtered. Personal contacts can be added and deleted.
- Every department number includes the 901 area code. Each call button invokes the device dialer (`tel:` link). Calls may not work on desktop hardware without a configured calling app.

## Assets and isolation
- The package includes its own icon.svg and all HTML, JS, and CSS.
- **The aircraft photo wallpaper is deliberately referenced from the existing public production site**: `https://kwvin81q.github.io/Reference-FedEx-Fleet/aircraft-wallpaper.webp`. No production files are modified, but that one image requires an internet connection. To make the test entirely self-contained, copy `aircraft-wallpaper.webp` from your existing repository into the new one, then replace its URL in `styles.css` with `./aircraft-wallpaper.webp`.
- Usage counters are isolated in the new browser storage key (`acmx-usage-isolated-test-v1`). **There is no network usage/Cloudflare tracking in this test**, intentionally, to avoid counting test usage on your live dashboard.
- No service worker is installed, so test updates are not stuck in a cached app. If a Home Screen icon is pinned, refresh/reopen after each deploy.
- No backend, API keys, or write permissions are needed.

## Color and border specifications
- Home contacts outer: `#9453fa` solid 2px, radius 23px, purple outer glow.
- Favorites: `#83c8ec` 1px stroke, dark navy gradient, 14px corners.
- All Contacts: steel-blue gradient, `#91bdd8` 1px stroke.
- Security: red `#ff6673` 1px border, secondary inner red glow, red gradient (`#510609` → `#aa1018` → `#5f090e`), radius 13px.
- Fleet outlines: A300 orange `#ffa54a`, MD-11 green `#46ec86`, 757 blue `#57bafa`, 767 yellow `#fff76b`, 777 purple `#bf78ff`; each with darker tinted panel fill and soft colored shadows.
- Oxygen: green gradient and `#56ed89` outline.

## Pre-live checklist
- Compare all operational values to current approved manuals and your original live app. This is not approved reference data.
- Verify the source directory/phone numbers and correct them as needed before sharing widely.
- If using any private codes or internal contacts on a public GitHub Pages site, assess whether they should be public; GitHub Pages from public repos is publicly accessible. This test preserves the original page's displayed EFB passcode and FCD field.
- Confirm iPhone/iPad and laptop layouts, accessibility/focus, and dialer behavior.
- Copy the image into the new repository if full visual independence from the old repository is required.

## Contact edits
Default directory: edit `CONTACTS` in `app.js`; defaults for favorites in the `FAVORITES_KEY` initialization. End users use the UI to save their own favorites and personal contacts locally. To reset trial settings, clear site data for the test URL.

## v1.1 UI refinements
- Green telephone handset SVG replaces the red telephone emoji in the call buttons (home favorites, security, aircraft pages, and full contact directory).
- Home and directory branding now reads **FedEx MX Quick Connect** rather than Hangar 10 Quick Links.
- The contact directory does not autofocus its search field, so mobile keyboards stay closed until the user taps Search.
