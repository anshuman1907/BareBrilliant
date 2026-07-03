FROM node:22-alpine AS build
WORKDIR /repo
COPY package.json package-lock.json tsconfig.base.json ./
COPY server/package.json server/package.json
RUN npm ci --workspace=server
COPY server/ server/
RUN npm run build --workspace=server

FROM node:22-alpine AS runtime
WORKDIR /repo
ENV NODE_ENV=production
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/server/package.json ./server/package.json
COPY --from=build /repo/server/dist ./server/dist
EXPOSE 4000
CMD ["node", "server/dist/server.js"]
