
FROM node:18-alpine AS build

WORKDIR /app

ARG VITE_API_URL=http://localhost:8081


RUN apk add --no-cache git python3 make g++


RUN npm install -g pnpm

RUN npm install -g typescript

COPY package.json pnpm-lock.yaml ./

ENV NODE_ENV=development
RUN pnpm install --frozen-lockfile


COPY . .


ENV VITE_API_URL=${VITE_API_URL}


RUN tsc -b && npx vite build


FROM nginx:alpine


COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
