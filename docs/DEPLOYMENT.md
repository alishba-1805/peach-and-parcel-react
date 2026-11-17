# Deployment

Peach & Parcel is a Vite React application. Deploy the production build as a static site with a fallback to index.html for client-side routes.

## Vercel

1. Sign in at [vercel.com](https://vercel.com/) and select **Add New → Project**.
2. Import [alishba-1805/peach-and-parcel-react](https://github.com/alishba-1805/peach-and-parcel-react).
3. Use the following settings:

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Root directory | ./ |
| Install command | npm install |
| Build command | npm run build |
| Output directory | dist |
| Production branch | main |

No environment variables or backend service are required.

The included [vercel.json](../vercel.json) sends nested requests to index.html so React Router can resolve the page.

## Release checks

Before deploying:

```bash
npm test
npm run build
npm run preview
```

After deploying, check:

- The site opens without requiring a Vercel login.
- Product images and styles load correctly.
- Direct links and refreshes work on /products/strawberry-bento, /cart and /checkout.
- Search, product selection, quantity changes and checkout work on desktop and mobile.
- The deployed source commit matches the release you intend to publish.
- Checkout retains its simulated-order notice.

For browser regression checks, follow [TESTING.md](TESTING.md).

## Other static hosts

Build with npm run build and publish the contents of dist. Configure an SPA fallback to index.html; otherwise direct requests to nested routes may return a server 404.

## Current status

Vercel configuration is ready. A public deployment URL has not yet been configured.
