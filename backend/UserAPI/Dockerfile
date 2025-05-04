FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y \
  curl \
  gnupg \
  ca-certificates \
  && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g npm@9.2.0 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY ./API/package*.json ./

RUN npm install express@5.1.0 mongoose@8.14.0 nodemon@3.1.10

COPY ./API .

EXPOSE 3000

CMD ["npm", "run", "dev"]
