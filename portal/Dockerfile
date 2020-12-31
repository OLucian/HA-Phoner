FROM node:14 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN yarn install
COPY ./ /app/
ENV NODE_PATH=src/
RUN yarn run build


FROM nginx:alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/nginx/nginx.conf
COPY --from=build-stage /app/nginx/frontend.conf /etc/nginx/conf.d/frontend.conf
EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"] 
