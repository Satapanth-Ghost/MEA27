# MEA 27 — standalone source package

MEA 27 is a custom Next.js public website backed by a Payload CMS and MongoDB. It contains no copied runtime dependencies or secrets: install dependencies and create local environment files from the examples.

## What is included

- A responsive MEA public website: Home, Highlights, About, Initiatives, Projects, Good to Know, Career Craft, Proceed, member login, and CMS admin entry pages.
- DAuth-based member access for study materials, including semesters, courses, question papers, and resource links.
- Payload CMS collections and globals for Highlights, Initiatives, Projects, study resources, and MEA information content.

## Local setup

1. Install Node.js 20+ and Yarn 1.x. If Yarn is not globally available, use the included helper: `node tools/yarn-1.22.22.js` in place of `yarn`.
2. Copy `web/.env.example` to `web/.env` and `cms/.env.example` to `cms/.env`.
3. Set `DATABASE_URI` in `cms/.env` to a running MongoDB instance. The default local value is `mongodb://127.0.0.1:27017/mea`.
4. Install dependencies:

   ```powershell
   cd web; yarn install
   cd ..\cms; yarn install
   ```

5. Start the CMS, then the website:

   ```powershell
   cd cms; yarn dev
   cd ..\web; yarn dev
   ```

Open the public website at `http://localhost:3000`, Payload admin at `http://localhost:3001/admin`, member login at `http://localhost:3000/login`, and the website&apos;s CMS entry page at `http://localhost:3000/admin`.

On Windows, double-click `Start Mia 27.bat` in the project root to start both services when they are not already running and open the website and Payload admin panel.

The first visit to Payload Admin creates the initial administrator. Do not place production secrets in any `.env.example` file. DAuth variables are needed only for member authentication, and `SENDER_EMAIL`/`PASSKEY` are needed only for real outbound email.

## Public deployment and search indexing

`localhost` is private to this computer and cannot be indexed by Google. To make the site publicly discoverable, deploy the web and CMS services to a public host, configure a real domain and HTTPS, set the production environment variables, then submit the deployed site to Google Search Console. Search indexing is controlled by the search engine and cannot be claimed or guaranteed by this source package.
