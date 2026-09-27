# Embedded SDK Playground v0.2.6

A developer testing tool for the Salla Embedded SDK.

## Overview

This test console allows you to simulate and debug the communication between an embedded third-party app (iframe) and the Salla Dashboard (host). It sends and receives events using the `@salla.sa/embedded-sdk` package.

## Bootstrap Flow

The test console demonstrates the complete authentication flow:

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
3. The console will auto-run the bootstrap flow
4. Use the buttons to trigger and test the available events, or use the playground to test through code
5. You can monitor the message log for incoming/outgoing events

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
