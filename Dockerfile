# --- Build aşaması ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Production aşaması ---
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./  # .env dosyası varsa
RUN npm install --omit=dev --ignore-scripts
EXPOSE 3000
CMD ["node", "dist/app.js"] 