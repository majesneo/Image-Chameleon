#!/bin/bash

if [ "$(docker ps -q -f name=rabbitmq)" ]; then
    echo "RabbitMQ container is already running."
else
    echo "Starting RabbitMQ container..."
    docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=rabbitmq -e RABBITMQ_DEFAULT_PASS=rabbitmq rabbitmq:3.8.9-management-alpine
fi

yarn workspace api-gateway run dev > api-gateway.log 2>&1 &
echo "Api-gateway is running..."

yarn workspace image-compression run dev > image-compression.log 2>&1 &
echo "Image-compression is running..."

yarn workspace image-resolution-conversion run dev > image-resolution-conversion.log 2>&1 &
echo "Image-resolution-conversion is running..."

sleep 5

tail -f api-gateway.log image-compression.log image-resolution-conversion.log

wait
