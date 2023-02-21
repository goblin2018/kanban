FROM nginx:1.21.6-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./scripts/nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
