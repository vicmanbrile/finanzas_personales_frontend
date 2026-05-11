# Etapa 1: Dependencias base
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Etapa 2: Instalar dependencias
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Etapa 3: Construcción (Build)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# CORRECCIÓN: Usando el nuevo formato con el signo de igual (=)
ENV NEXT_TELEMETRY_DISABLED=1
ENV API_URL=http://go-app:8000
RUN npm run build

# Etapa 4: Producción (Imagen final)
FROM base AS runner
WORKDIR /app

# CORRECCIÓN: Usando el nuevo formato con el signo de igual (=)
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Si en el futuro agregas imágenes o un favicon a tu app, quítale el '#' del inicio.
# COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# CORRECCIÓN: Usando el nuevo formato con el signo de igual (=)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
