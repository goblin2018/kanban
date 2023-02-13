
# 构建应用
FROM node:lts-alpine3.17 as builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

# 封装到nginx
FROM nginx:1.21.6-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

