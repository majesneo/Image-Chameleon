#!/bin/bash

printf '\nDependency shared-rabbitmq-module installation started...\n'
cd ./libs/shared-rabbitmq-module
rm -rf node_modules
yarn install
printf '\nBuild shared-rabbitmq-module started...\n'
yarn shared-rabbitmq:build
cd ../../

printf '\nDependency event-module installation started...\n'
cd ./libs/event-module
rm -rf node_modules
yarn install
printf '\nBuild event-module started...\n'
yarn event-module:build
cd ../../

printf '\nDependency api-gateway installation started...\n'
cd ./api-gateway
rm -rf node_modules
yarn install
cd ../

printf '\nDependency image-compression installation started\n'
cd ./image-compression
rm -rf node_modules
yarn install
cd ../

printf '\nDependency image-resolution-conversion installation started\n'
cd ./image-resolution-conversion
rm -rf node_modules
yarn install
cd ../

printf '\nAll dependencies are installed'
