FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["sh", "-c", "npx prisma generate && npx prisma db push && npx prisma db seed && npm run build && node build"]
