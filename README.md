# Rocket Money — Telegram Mini App frontend

A responsive React + TypeScript frontend starter for Rocket Money.

## Included
- Home dashboard with demo $5 welcome balance
- Referral overview ($0.25 direct / $0.05 second level)
- Withdrawal form UI with $25 minimum validation
- Tasks placeholder
- Profile placeholder
- Responsive dark / neon-purple design

## Important: demo frontend only
This repository currently contains the frontend prototype. It does **not** yet connect to Telegram authentication, a database, a referral ledger, real balances, anti-fraud checks, admin tools, or payout providers. The displayed $5 is demo UI data and is not a real payable balance. Do not advertise or process real rewards until the backend and accounting rules are implemented and tested.

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Next implementation stages
1. Telegram Mini App initData validation on the server.
2. Node.js API + PostgreSQL + Prisma schema.
3. Transaction ledger and idempotent referral attribution.
4. Anti-self-referral and abuse controls.
5. Admin review queue and manual payout workflow.
6. Automated tests and deployment.
