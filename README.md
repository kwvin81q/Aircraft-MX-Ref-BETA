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


## v1.2 manager directory additions
- A separate manager list card appears **below Quick Connect** on the home page.
- April 2026 manager card transcribed from user-supplied photo. 34 entries, with 901 added to each seven-digit number.
- Favorite a manager using the star: the entry also appears in **My Favorites** under Quick Connect.
- Expand **View Full Manager List** to see every manager and use **Add Manager** for personal entries.
- Seven-digit additions default to the 901 area code. Ten-digit numbers are preserved.
- Manager favorites and custom entries stay in localStorage on that browser/device.
- Full Contacts Directory has a **Managers** filter; opening it still does not focus the search box.
- Security changed to **901-922-1945** based on the newer photographed directory. Verify emergency numbers with your operations team.
- **Privacy warning:** the manager badge may contain nonpublic employee information and direct numbers. A public GitHub Pages test site is publicly accessible. Get permission before publishing this list, and do not publish employee IDs or personal numbers to a public website without authorization.


## v1.2: Updated full phone list + Memphis Manager List

- Full contacts updated from the newer Federal Express Hangar 10 Phone List photo. Conference PINs were intentionally excluded. Check all transcribed numbers against the source.
- FedEx Security updated to **901-922-1945**, matching the newer photo; earlier source showed a different number. Verify before operational use.
- New separate **Memphis Manager List** panel at the bottom of the home page. It includes the April 2026 badge roster, employee IDs, and phone numbers.
- Every 7-digit manager phone number is displayed as **901-XXX-XXXX**. Numbers with an existing area code are preserved.
- Manager favorites are independent from contact favorites and saved locally per browser. Tap a star to add/remove; the home panel shows favorites first.
- **Add My Own Manager** accepts a name, optional employee number, and a 7-digit or 10-digit US number. Seven-digit numbers receive 901. Custom managers are saved locally and automatically starred. You can delete custom managers.
- Opening the manager directory does not auto-focus the search field.
- No live usage worker calls are made.

**Privacy / publishing warning:** The built-in roster contains employee identifiers and named individuals' phone numbers from an internal badge. If you upload `managers.js` to a public GitHub Pages repository, anyone can download that information. Obtain authorization for publishing or keep this test private. GitHub Pages sites are generally public even when a source repository is private. For production, use an authenticated backend for staff-only directory data rather than shipping it in static JavaScript.


## v1.3 — Local ATIS preferences (bottom of the home page)
- Each mechanic can set an ICAO airport (four letters), ATIS frequency in MHz, and optional personally entered conditions/notes. Defaults KMEM / 127.750 from existing reference card. Settings use localStorage and do not update other users.
- The airport weather link opens the selected station's METAR on AviationWeather.gov. It is NOT the official ATIS broadcast and is not embedded live data. Live ATIS would require a separately verified service and licensing/availability checks.
- The ATIS setup section is last, after Memphis Manager List. The form is collapsed by default, so no keyboard opens automatically.
- Maintain operational verification of frequencies and observations. Never use the manually entered note as an operational weather source.


## v1.4 — Footer ordering and Local ATIS temperature reference
- HOME ORDER: aircraft cards, oxygen, utilities, disclaimer, FedEx MX Quick Connect, Memphis Manager List, LOCAL ATIS, Request a Change, then Usage on This Device. **Usage is the last panel**.
- Each aircraft page gets the same Local ATIS airport temperature/elevation panel below the reference/security information.
- User sets a four-character airport ICAO code (defaults to KMEM), stored locally for all pages.
- Refresh button requests the official US NWS airport station record and latest observation. Converts temperature from degrees Celsius to degrees Fahrenheit and elevation from meters to feet. Displays the weather observation's exact date and time in America/Chicago.
- Reports lacking a valid recent temperature (over 90 minutes) are shown as unavailable. The UI never invents readings; failure also shows unavailable.
- IMPORTANT: this displays **METAR/airport observation temperature**, not an extracted ATIS broadcast. The panel retains the requested LOCAL ATIS title but states the actual source explicitly. It is not a replacement for the ATIS voice broadcast or approved flight/maintenance weather data.
- NOAA/NWS weather.gov endpoint coverage is US stations; some airport codes or network environments may not return station observations. On failure, temperature and field elevation are shown as unavailable. Field elevation is station metadata rather than an ATIS value. The browser must allow HTTPS calls to api.weather.gov.
- A browser network fetch is intentionally not claimed to have been end-to-end tested here. No live backend deployed.


## v1.5 airport panel hang fix
- Refresh requests now have a hard 9-second timeout and recover to a clickable button.
- Requests for station metadata no longer block temperature; KMEM shows the FAA field elevation 341 ft MSL even offline.
- Previous valid temperature may be retained only while its observation timestamp is under 90 minutes old.
- The reported temperature is from an NWS airport observation, not a decoded ATIS broadcast.
- If the browser/network prevents weather retrieval, the panel displays an error instead of spinning indefinitely.
- After GitHub Pages deployment, refresh the site in Safari to replace cached JS.
