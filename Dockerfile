# ==== CONFIGURE =====
FROM node:18-alpine AS builder

ARG API_BASE_URL='https://lke-dev-vector.andeanwide.com/api/v1'
ENV VITE_API_BASE_URL=${API_BASE_URL}
ENV VITE_SVG_PATH='/public/generated'
ENV VITE_SECRET_HASH='mSSgxIPx$Rmdf4mVAXUENA@zq*gVU$2n6nx6y!#J&mR!MXrYZ6FQA+3yw@VBPASG'

WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build

FROM nginx:1.23-alpine
# ENV NODE_ENV production
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
