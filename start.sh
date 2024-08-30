#!/bin/bash

if [ "$(docker ps -q -f name=rabbitmq)" ]; then
    echo "RabbitMQ container is already running."
else
    echo "Starting RabbitMQ container..."
    docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=rabbitmq -e RABBITMQ_DEFAULT_PASS=rabbitmq rabbitmq:3.8.9-management-alpine
fi

printf '\nApi-gateway started...\n'
cd ./api-gateway || exit 1
yarn api-gateway:dev &
cd ../ || exit 1

printf '\nImage-compression started\n'
cd ./image-compression || exit 1
yarn image-compression:dev &
cd ../ || exit 1

printf '\nImage-resolution-conversion started\n'
cd ./image-resolution-conversion || exit 1
yarn image-resolution:dev &
cd ../ || exit 1

printf '\nAll services are started\n'
