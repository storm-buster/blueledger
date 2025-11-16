# NeeLedger (local copy)

This is a local working copy of the NeeLedger admin dashboard project.

To run locally:

```powershell
cd C:\Users\rajat\Downloads\Neeledger\project
npm install
npm run dev
```

To create a GitHub repo and push from your machine (replace <repo> with the repo name):

```powershell
# create the remote repository on GitHub (you can use the web UI or gh cli)
# using gh (GitHub CLI):
gh repo create rajopensource01/<repo> --public --source=. --remote=origin

# or via the web: create repo then
git remote add origin git@github.com:rajopensource01/<repo>.git

# push from local
```markdown
# NeeLedger — Developer README

This repository contains a local working copy of the NeeLedger admin dashboard (frontend Vite + backend Express). This README documents every main feature, pages/components, server endpoints, how to run locally, tests, and common troubleshooting steps.

Table of contents
- Project overview
- What’s included (features)
- Frontend: pages & key components
- Backend: endpoints
- Run locally (frontend + backend)
- Quick smoke tests (browser + API tests)
- Git / push notes (SSH and HTTPS options)
- Troubleshooting & common fixes
- Next steps and suggestions

Project overview
----------------
NeeLedger is an admin dashboard for managing carbon credit projects, verification workflows, and XAI-based satellite/tree analysis. The UI uses React + TypeScript + Vite and Tailwind CSS. A small Express backend provides demo endpoints (geocoding & a mock XAI inference endpoint) for local testing.

What’s included
----------------
- Themed UI and responsive layout (custom `nee-*` Tailwind palette).
- Sidebar with collapse/hover-expand behavior and persistence (localStorage key `nee_sidebar_collapsed`).
- Pages: Home, Projects, KYC, Validation, Verification, ACVA, Map, XAI, Settings.
- Document viewer modal (`DocumentViewer`) used by several pages to display documents.
- Mock backend (Express) with:
	- `/api/geocode?q=...` — proxy to OpenStreetMap Nominatim (demo geocoding)
	- `/api/xai` — mock XAI endpoint that simulates liveness and tree/carbon outputs (deterministic-ish based on input)

Frontend: pages & key components
--------------------------------
Files are under `src/components` and pages are in `src/components/Pages`.

- `HomePage.tsx` — Hero / platform statistics cards and overview.
- `ProjectsPage.tsx` — Searchable, responsive grid of projects with detailed project view and document viewer. (cards, search, details, Docs)
- `KYCPage.tsx`, `ValidationPage.tsx`, `VerificationPage.tsx`, `ACVAPage.tsx` — workflows for reviewing KYC, validation, verification, and ACVA tasks. Each opens documents in `DocumentViewer` when available.
- `MapPage.tsx` — map view (placeholder) and uses backend geocode for address lookups where needed.
- `XAIPage.tsx` — UI to upload a selfie/video and provide a code phrase; calls `/api/xai` and displays:
	- Liveness: movementScore, lipSyncScore, livenessScore (0–1), authenticity Pass/Fail
	- Tree metrics: treeCount, canopyCover (%), CO₂ tonnes, uncertainty
	- Decision mapping: Auto Pre-approve / ACVA Manual Review / Field Audit (based on livenessScore)
- `SettingsPage.tsx` — basic settings and profile placeholders.
- `Layout` components: `Sidebar.tsx`, `Header.tsx`, `NotificationPopover.tsx` — header/sidebar layout and notifications.
- `Common/DocumentViewer.tsx` — modal component for viewing text documents, used widely.

Backend: endpoints
------------------
The backend server is a small Express app in `server/` with the following endpoints:

- GET `/` — health endpoint (returns "NeeLedger server running").
- GET `/api/geocode?q=<query>` — proxies to OpenStreetMap Nominatim and returns geocode results (used by the Map page).
- POST `/api/xai` — mock XAI inference. Accepts JSON { codePhrase, fileName } and returns deterministic-ish mock results:
	- treeCount: number (50–1000)
	- canopyCover: number (20.0–80.0 percent)
	- co2Tonnes: number
	- uncertainty: number (0.05–0.35)
	- liveness: { movementScore, lipSyncScore, livenessScore, authenticity }
	- decisionCategory: one of "Auto Pre-approve", "ACVA Manual Review", "Field Audit"

Decision mapping used by the mock XAI service
- livenessScore >= 0.95 → Auto Pre-approve
- 0.70 ≤ livenessScore < 0.95 → ACVA Manual Review
- livenessScore < 0.70 → Field Audit

Run locally
-----------
Prerequisites
- Node.js (16+ recommended)
- npm (bundled with Node) or yarn

1) Install frontend dependencies

```powershell
cd C:\Users\rajat\Downloads\Neeledger\project
npm install
```

2) Start the frontend dev server (Vite)

```powershell
npm run dev
```

Vite prints a Local URL (usually http://localhost:5173/). If 5173 is in use it will pick another port (5174, 5175, ...).

3) Install and start the backend (server)

```powershell
cd C:\Users\rajat\Downloads\Neeledger\project\server
npm install
npm start
```

By default the Express server listens on port 4000. You should see: "NeeLedger server listening on 4000".

Mapbox integration (optional)
----------------------------
This project supports using Mapbox for the Map page when you provide a Mapbox access token via a Vite environment variable. If no token is provided the Map page falls back to an OpenStreetMap embed.

1) Create a file named `.env` in the project root (do not commit this file) and add your Mapbox token:

```text
VITE_MAPBOX_TOKEN=pk.your_mapbox_token_here
```

2) Get a Mapbox token:
	- Sign up at https://www.mapbox.com/
	- Create an access token at https://account.mapbox.com/access-tokens/

3) Restart the Vite dev server so the token is picked up.

Mapbox API pattern used by the app (example):

```
https://api.mapbox.com/{endpoint}?access_token={your_access_token}
```

Note: this repo includes `.env.example` with the `VITE_MAPBOX_TOKEN` key to show the expected variable name.

Quick smoke tests (API)
-----------------------
After both servers are running you can test them from PowerShell or curl.

Frontend health check (from PowerShell):
```powershell
Invoke-RestMethod -Uri 'http://localhost:5173/' -Method GET -UseBasicParsing
```

Backend health check:
```powershell
Invoke-RestMethod -Uri 'http://localhost:4000/' -Method GET -UseBasicParsing
```

Test the mock XAI endpoint (replace values as needed):
```powershell
$body = @{ codePhrase = 'demoPhrase42'; fileName = 'selfie_test.mp4' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:4000/api/xai' -Method POST -Body $body -ContentType 'application/json' | ConvertTo-Json -Depth 5
```

Expected server JSON keys: `treeCount`, `canopyCover`, `co2Tonnes`, `uncertainty`, `liveness` (movementScore, lipSyncScore, livenessScore, authenticity), `decisionCategory`.

Git / push notes
----------------
You can push this local repo to GitHub with SSH or HTTPS. Two common methods:

- Using SSH (recommended if you have SSH keys configured):

```powershell
git remote add origin git@github.com:rajopensource01/NeeLedger.git
git branch -M main
git push -u origin main
```

If you see a `Permission denied (publickey)` error, add an SSH key to your GitHub account:
1. Generate an SSH key (ed25519 recommended):
```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```
2. Copy the public key (`%USERPROFILE%/.ssh/id_ed25519.pub`) and add it to GitHub -> Settings -> SSH and GPG keys.
3. Test with: `ssh -T git@github.com`

- Using HTTPS + Personal Access Token (if you can't use SSH):

```powershell
git remote add origin https://github.com/rajopensource01/NeeLedger.git
git branch -M main
git push -u origin main
```

When prompted for credentials, use your GitHub username and a Personal Access Token (PAT) as the password. Create a PAT at https://github.com/settings/tokens with `repo` scope.

Troubleshooting & common fixes
-----------------------------
- Vite port in use: Vite will automatically pick a new port and print the Local URL. Open the printed URL.
- Browserslist outdated warning: run `npx update-browserslist-db@latest` to silence the warning. This is non-fatal.
- Backend 'punycode' deprecation warning: harmless; can be ignored for this demo.
- PowerShell Invoke-RestMethod "Unable to connect to the remote server": ensure the target server process is running and listening on the expected port.
- If `npm run dev` doesn't serve files, ensure you ran `npm install` in the project root and started the backend from `server/` separately.

Developer notes (important internals)
------------------------------------
- Sidebar collapse state: persisted in localStorage under key `nee_sidebar_collapsed` (boolean-ish string).
- Document viewer: `src/components/Common/DocumentViewer.tsx` — simple modal, accepts `title`, `content`, `open`, `onClose`.
- Projects: `src/components/Pages/ProjectsPage.tsx` — searchable grid, deterministic mock document views for demonstration.
- XAI mock server: `server/index.js` uses a simple hash of `codePhrase|fileName` to create deterministic pseudorandom outputs (useful for demos/reproducible results).

Security note and limitations
------------------------------
- All backend endpoints are demo/mock implementations intended for local development only. Do not expose the server to the public without adding proper auth, rate-limiting, and input validation.
- The XAI endpoint is a mock. Liveness checks and tree/carbon calculations are simulated with pseudorandom math and are not production-grade.

Next steps and suggestions
-------------------------
- Add authentication (JWT / session) for the admin dashboard.
- Replace the XAI mock with an actual inference service or integrate with a real liveness/CNN pipeline.
- Add unit/integration tests for key components (Jest + React Testing Library) and API tests for the server endpoints.
- Improve the Map page by integrating a map library (Leaflet/Mapbox) and visualizing the `coordinates` field from project metadata.

If you want, I can also:
- Add an automatic test flow on the XAI page that uploads a sample file and shows the returned decision mapping.
- Sweep all pages to ensure every clickable is wired to something useful and implement a notification bell with example notifications.

---
Thank you — open an issue or message me here with any behavior you want changed or additional features to add.

``` 
