#!/bin/sh
# wait-for-mongo.sh

until nc -z mongo_api 27017; do
  echo "Esperando a MongoDB..."
  sleep 1
done

echo "MongoDB está listo. Iniciando la API..."
npm run dev
