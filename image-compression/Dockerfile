FROM node:18.20.4-alpine
WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install

RUN yarn install --frozen-lockfile --production
COPY . .

RUN yarn run build
RUN yarn install --production --frozen-lockfile --ignore-scripts
CMD ["yarn", "start:prod"]
