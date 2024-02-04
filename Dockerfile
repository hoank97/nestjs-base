FROM node:18-alpine as stage1
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .

FROM node:18-alpine as main
COPY --from=stage1 /app /
RUN yarn run build
EXPOSE 3000
CMD [ "yarn", "start" ]