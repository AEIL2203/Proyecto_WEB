# ---------- build ----------
FROM node:20 AS build
WORKDIR /app

# Manifiestos (si faltan, falla aquí)
COPY package.json ./
COPY package-lock.json ./

# Instalar deps (más tolerante que ci)
ENV NPM_CONFIG_LEGACY_PEER_DEPS=true
RUN npm cache clean --force && npm install

# Código y build prod (emitimos SIEMPRE a /out)
COPY . .
RUN mkdir -p /out \
    && npx ng build --configuration=production --output-path=/out \
    && echo "Contenido de /out tras build:" \
    && ls -la /out \
    && echo "Contenido de /out/browser:" \
    && ls -la /out/browser \
    && if [ ! -f /out/browser/index.html ] && [ -f /out/browser/index.csr.html ]; then cp /out/browser/index.csr.html /out/browser/index.html; fi \
    && test -f /out/browser/index.html

# ---------- runtime ----------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copiamos el build del navegador
COPY --from=build /out/browser/ ./
EXPOSE 80
