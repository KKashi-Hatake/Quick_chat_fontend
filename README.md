# Quick Chat Frontend

Next.js frontend for Quick Chat.

## Supported Features

- 1:1 real-time chat
- 1:1 video calling (WebRTC + Socket.IO signaling)
- Call history view in the main chat panel

## Prerequisites

- Node.js 18+
- Running backend server

## Environment

Create `.env.local` (or update existing) with:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_TURN_URL=turn:turn.example.com:3478
NEXT_PUBLIC_TURN_USERNAME=your_turn_username
NEXT_PUBLIC_TURN_PASSWORD=your_turn_password
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

Important:
- `NEXT_PUBLIC_BACKEND_URL` is used for all API and socket connections.
- Do not point it to frontend URL.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Using ngrok

If frontend is public over HTTPS, backend should also be publicly reachable over HTTPS.

1. Start frontend (`3000`) and backend (`5000`).
2. Create ngrok tunnels for both ports.
3. Set frontend env:
   - `NEXTAUTH_URL=<frontend_ngrok_url>`
   - `NEXT_PUBLIC_APP_URL=<frontend_ngrok_url>`
   - `NEXT_PUBLIC_BACKEND_URL=<backend_ngrok_url>`
4. Restart frontend server after env update.

## CORS / Socket Notes

- Socket uses `NEXT_PUBLIC_BACKEND_URL` in `src/lib/socket.config.ts`.
- API client uses `NEXT_PUBLIC_BACKEND_URL` in `src/lib/axios.ts`.
- No custom `ngrok-skip-browser-warning` header is used in axios.

## Troubleshooting

- CORS error with `No 'Access-Control-Allow-Origin' header`:
  - Check backend `CLIENT_URL` matches current frontend origin exactly.
- WebSocket fails:
  - Ensure backend URL is reachable and uses HTTPS/WSS when frontend is HTTPS.
- API works but UI empty in call history:
  - Verify backend `/api/v1/call/history` response data and auth token.
