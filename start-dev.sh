#!/bin/bash

kill_port() {
  local port=$1
  local pid
  pid=$(lsof -t -i:"$port")

  if [ -n "$pid" ]; then
    echo "Killing process on port $port with PID $pid..."
    kill -9 "$pid"
  fi
}

kill_port 3000
kill_port 3001
kill_port 3002
kill_port 3003
kill_port 3004


if [ "$(docker ps -q -f name=rabbitmq)" ]; then
    echo "RabbitMQ container is already running."
else
    echo "Starting RabbitMQ container..."
    docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=rabbitmq -e RABBITMQ_DEFAULT_PASS=rabbitmq rabbitmq:3.8.9-management-alpine
fi

yarn workspace api-gateway run dev > api-gateway.log 2>&1 &
echo "Api-gateway is running..."

yarn workspace file-upload run dev > file-upload.log 2>&1 &
echo "File-upload is running..."

yarn workspace image-compression run dev > image-compression.log 2>&1 &
echo "Image-compression is running..."

yarn workspace image-resolution-conversion run dev > image-resolution-conversion.log 2>&1 &
echo "Image-resolution-conversion is running..."

yarn workspace web run dev > web.log 2>&1 &
echo "Web is running..."

sleep 5

tail -f api-gateway.log file-upload.log image-compression.log image-resolution-conversion.log web.log

wait
