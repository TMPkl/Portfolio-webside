# Etap 1: build aplikacji
FROM node:18-alpine AS builder
WORKDIR /app

# kopiujemy package.json i package-lock.json (albo pnpm/yarn)
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etap 2: serwer produkcyjny
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production


COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
