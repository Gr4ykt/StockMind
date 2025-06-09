### Index
- [StockMind](#stockmind)
  - [Backend](#backend)
    - [Start Backend](#start-backend)
    - [Finalize Backend](#finalize-backend)
  - [Frontend](#frontend)
    - [Install dependencies](#install-dependencies)
    - [Run service Frontend](#run-service-frontend)
    - [Images](#images)

# StockMind
Inventory management software with integrated AI, intuitive, creative, innovative, a different way to manage your company.

## Backend
### Start Backend
```bash
docker-compose up --build
```
### Finalize Backend
```bash
docker-compose down -v && docker rmi backend-product_api backend-user_api
```

>If you just want to **stop** the service, use:
>```bash
>docker-compose down
>```
>Or `ctrl_c` and waiting for service stopping.

However, you can also initialize these services with `npm run dev` in the `API` working directory of each working directory, one caveat is that the **mongodb** container is not initialized, but can be started manually.

If you just want to initialize **mongodb**, you can just use the following `docker compose`:
```docker
# mongodb://root:root123.@localhost:27018 -> FOR LOCAL
# mongodb://root:root123.@mongo_api:27017 -> FOR CONTAINERS
version: '3.8'

services:
  mongo_api:
    image: mongo:latest
    container_name: mongo_stockMind
    ports:
      - "27018:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=root123.
    networks:
      - service
networks:
  service:
    driver: bridge

```
## Frontend
### Install dependencies
To install the ReactJS dependencies just use the following command, remember that the path to the service and which contains the `package.json` file is from the root of the `frontend/Product` directory.
```bash
cd frontend/Product
npm install
```
### Run service Frontend
To start the frontend service is as simple as with the command:
```bash
npm run dev
```
>Remember to first install the dependencies used with `npm install`.

Once logged in you go to the address `http://localhost:5173/` in the browser.
### Images
![imagen](https://github.com/user-attachments/assets/a74057be-0bfd-4f51-b27b-24a7af577921)
![imagen](https://github.com/user-attachments/assets/c7e0cd9c-ee3e-4330-9ce0-2e9e25295490)
![imagen](https://github.com/user-attachments/assets/162925f4-f5ec-46d8-9110-cd349e6ee203)
![imagen](https://github.com/user-attachments/assets/c2fe267c-ee1d-40c4-a2e1-99c4ce107d6b)
![imagen](https://github.com/user-attachments/assets/06c92348-d6dd-41eb-9da4-1ef4cb832cfa)
![imagen](https://github.com/user-attachments/assets/7d42bc58-0cc7-425d-a3ad-0e78ee51759f)
![imagen](https://github.com/user-attachments/assets/8c1d6032-224b-454b-8062-a4f84b3c38e3)
![imagen](https://github.com/user-attachments/assets/4c7a9851-5544-44a4-8f89-eb3e82bb177b)
