#!/usr/bin/env bash

root_dir=$(git rev-parse --show-toplevel 2>&1)

if [ $? -ne 0 ]; then
  echo $root_dir
  exit 1
fi

if ! command -v jq &> /dev/null
then
  echo "you need to install jq before running this script"
  exit 1
fi

docker_compose_path=$root_dir/docker-compose.yaml
source $root_dir/.env

code_client=$(docker compose -f $docker_compose_path exec hydra \
    hydra create client \
    --endpoint http://127.0.0.1:4445 \
    --grant-type authorization_code \
    --response-type code,id_token \
    --format json \
    --scope $DEV_OAUTH_CLIENT_REQUESTED_SCOPE \
    --redirect-uri http://127.0.0.1:9090/callback)

code_client_id=$(echo $code_client | jq -r '.client_id')
code_client_secret=$(echo $code_client | jq -r '.client_secret')

docker compose -f $docker_compose_path exec hydra \
    hydra perform authorization-code \
    --client-id $code_client_id \
    --client-secret $code_client_secret \
    --endpoint http://127.0.0.1:4444/ \
    --port 9090 \
    --scope $DEV_OAUTH_CLIENT_REQUESTED_SCOPE
