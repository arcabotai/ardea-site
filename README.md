# Ardea Site

Public node page for **Ardea**, Arca's Hypersnap/Snapchain node.

- Live public-safe node status at `/api/status`
- No Grafana exposure
- No SSH/Tailscale/private hostname leakage
- Operator guide links back to <https://hypersnap.org>

## Local dev

```bash
npm install
ARDEA_INFO_URL="https://your-node.example.com/v1/info" npm run dev
```

`ARDEA_INFO_URL` is server-side only. Keep it out of client code.
