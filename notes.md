# How to start on vps

Have pm2 installed

## To start server:

Go to the root folder of the deno server

add the .env file
> ENV_TYPE="development"
> pm2 start index.ts --interpreter="deno" --interpreter-args="run --env-file=.env --allow-read --allow-write --allow-net --allow-env"

There are ways to make this process more streamlined: 
https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/

## To check for errors coming from the server:

> pm2 logs

or

> pm2 dashboard
