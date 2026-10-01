# Embedded App

A Salla embedded app built with React + Vite and the `@salla.sa/embedded-sdk` package.

## Bootstrap Flow

When the app is opened inside the Salla merchant dashboard, it bootstraps automatically:

```
1. embedded.init() - Initialize SDK and get layout info
2. embedded.auth.getToken() - Get token from URL (?token=XXX)
3. Verify token with Salla API (via /api/verify-token)
4. embedded.ready() - Signal app is ready (removes host loading)
   OR embedded.destroy() - Exit embedded view
```

Token verification goes through a Vercel Serverless Function ([api/verify-token.js](api/verify-token.js)), which proxies the request to the Salla exchange authority service.

## Usage

1. Add the deployment link for this app to your test app in Salla Partners
2. "Run App" from the installed app page in merchant dashboard
3. The app will auto-run the bootstrap flow

## Project Structure

```
api/                 Vercel serverless functions
src/
  components/        Reusable UI (Header, StatusBar, Tabs, forms/Button, forms/Checkbox)
  contexts/          ThemeContext, ToastContext
  hooks/             SDK hooks (useAppBootstrap, useIframeAutoBootstrap, useThemeSubscription,
                     useActionClickSubscription, useNavSync, useCheckoutFlow,
                     useCheckoutResultSubscription)
  utils/             logger, token verification, constants
```

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (frontend only, /api/verify-token is not available)
pnpm dev

# Start dev server with the serverless function (requires Vercel CLI)
npx vercel dev

# Build for production
pnpm build
```

## Deployment

The app is deployed on [Vercel](https://vercel.com). Vercel builds it with `pnpm build`, serves `dist`, and deploys everything under `api/` as serverless functions.

### Environment variables

| Name  | Values          | Default | Description                                       |
| ----- | --------------- | ------- | ------------------------------------------------- |
| `ENV` | `dev` \| `prod` | `prod`  | Selects which Salla verify API the function calls |

## License

MIT
# Salek-AI
