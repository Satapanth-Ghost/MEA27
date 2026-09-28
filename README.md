# MEA27

This is the MEA27 project folder.

## Start the new website

Double-click **Start MEA27.bat**. It starts the full website, local database, and Payload CMS.

- Website: http://localhost:3000
- CMS admin: http://localhost:3001/admin

Keep the two service terminals open while using the site. To stop the application, press `Ctrl+C` in both service terminals.

## Project layout

- `platform/` — the real MEA27 React/Next.js website, Payload CMS, and Docker database configuration.
- `Open MEA27 Admin Login.bat` — opens the CMS administration page.
- `legacy-visual-prototype/` — the earlier standalone visual prototype, kept only as a reference. It is not part of the running application.

The local CMS starts with its own empty database. Production content from the existing MEA site needs an authorized export or approved import before it appears in MEA27.
