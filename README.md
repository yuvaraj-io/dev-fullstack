This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## MongoDB and Uploads

The app stores blog/content data in MongoDB and stores uploaded image binaries on disk. Blog image blocks keep a URL plus `assetId`, while image metadata lives in the `assets` collection.

Local defaults:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB_NAME=u816628190_yuvidev
UPLOAD_DIR=public/uploads
UPLOAD_PUBLIC_PATH=/uploads
```

For VPS deployment, point `UPLOAD_DIR` to a persistent folder outside the app release, for example:

```bash
UPLOAD_DIR=/var/www/yuvidev/uploads
UPLOAD_PUBLIC_PATH=/uploads
```

Then serve that directory with Nginx:

```nginx
location /uploads/ {
  alias /var/www/yuvidev/uploads/;
  expires 30d;
  add_header Cache-Control "public";
}
```

Migration helpers:

```bash
node scripts/migrate-sql-to-mongo.mjs u816628190_yuvidev.sql
node scripts/migrate-base64-images-to-assets.mjs
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
