# === Etapa 1: Construcción ===
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar pnpm globalmente en el contenedor
RUN npm install -g pnpm

# Copiar archivos de dependencias reales de pnpm
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias usando el lockfile real de pnpm
RUN pnpm install --frozen-lockfile

# Copiar el resto del código del frontend
COPY . .

# Construir la aplicación Next.js
RUN pnpm build

# === Etapa 2: Servidor de Producción Ligero ===
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copiar únicamente lo necesario para producción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["pnpm", "start"]