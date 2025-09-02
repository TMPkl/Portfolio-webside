# Etap 1: budowanie aplikacji
FROM node:18-alpine AS builder
WORKDIR /app

# kopiujemy package.json i package-lock.json
COPY package*.json ./

# instalujemy zależności
RUN npm install

# kopiujemy resztę projektu
COPY . .

# budujemy projekt Next.js
RUN npm run build

# Etap 2: uruchamianie serwera produkcyjnego
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# kopiujemy pliki tylko potrzebne do uruchomienia
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
