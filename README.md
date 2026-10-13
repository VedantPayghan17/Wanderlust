# Wanderlust

## GitHub Pages preview

The repository deploys the static preview in `docs/` to GitHub Pages whenever changes to that folder or its deployment workflow are pushed to `main`.

1. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**.
2. Push the workflow and preview files to `main`, or run **Deploy static preview to GitHub Pages** from the Actions tab.
3. Open https://vedantpayghan17.github.io/Wanderlust/ after the deployment completes.

The Pages preview uses sample listings and supports searching, country filtering, and listing details. It is static: creating or editing listings, user accounts, reviews, and MongoDB-backed data remain available only when the Express server is deployed separately.

## Run the Express app

Install dependencies with `npm install`, configure a MongoDB connection, then start the server with `node server.js`.