# Etapa 1: Dependencias base
FROM node:20-alpine AS base
# Instalar libc6-compat es recomendado para Alpine Linux y Node
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Etapa 2: Instalar dependencias
FROM base AS deps
WORKDIR /app
# Copiamos solo los archivos de dependencias para aprovechar el caché de Docker
COPY package.json package-lock.json* ./
# Si usas npm. (Si usas pnpm o yarn, cambia este comando)
RUN npm ci

# Etapa 3: Construcción (Build)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Deshabilitar telemetría de Next.js (opcional pero recomendado)
ENV NEXT_TELEMETRY_DISABLED 1

# Compilamos la aplicación
RUN npm run build

# Etapa 4: Producción (Imagen final)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Creamos un usuario no root por seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos los archivos públicos y estáticos
COPY --from=builder /app/public ./public

# Configuramos los permisos correctos para el prerenderizado
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiamos el build "standalone" generado por Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
# Permite que el servidor escuche en todas las interfaces de red dentro de Docker
ENV HOSTNAME "0.0.0.0"

# Ejecutamos el servidor empaquetado
CMD ["node", "server.js"]