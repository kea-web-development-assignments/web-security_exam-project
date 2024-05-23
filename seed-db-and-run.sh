#!/bin/sh
npm run build
npx prisma generate
npx prisma db push
npx prisma db seed
node build
