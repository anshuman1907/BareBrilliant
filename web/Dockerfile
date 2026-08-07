FROM node:22-slim AS build
WORKDIR /repo
COPY package.json package-lock.json tsconfig.base.json ./
COPY web/package.json web/package.json
RUN npm ci --workspace=web
RUN arch="$(dpkg --print-architecture)" \
  && case "$arch" in \
    arm64) rollup_pkg='@rollup/rollup-linux-arm64-gnu' ;; \
    amd64) rollup_pkg='@rollup/rollup-linux-x64-gnu' ;; \
    *) echo "unsupported architecture: $arch" >&2; exit 1 ;; \
  esac \
  && npm install --no-save "$rollup_pkg@4.62.2" --workspace=web
COPY web/ web/
RUN npm run build --workspace=web

FROM nginx:1.27-alpine AS runtime
COPY web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/web/dist /usr/share/nginx/html
EXPOSE 80
