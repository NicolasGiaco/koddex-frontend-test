# ===== STAGE 1: Dependencies =====
FROM node:20-alpine AS deps
# Installe uniquement les dépendances système nécessaires
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copie les fichiers de dépendances
COPY package.json pnpm-lock.yaml* ./

# Installation optimisée des dépendances
RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile --prod --no-scripts && \
    # Nettoie le cache pnpm pour réduire la taille
    pnpm store prune

# ===== STAGE 2: Builder =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile --no-scripts

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN pnpm run build && \
    pnpm prune --prod

FROM node:20-alpine AS runner

# Créé un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV NODE_OPTIONS "--max-old-space-size=512"

USER nextjs

EXPOSE 3000

# Utilise exec form pour un meilleur signal handling
CMD ["node", "server.js"]