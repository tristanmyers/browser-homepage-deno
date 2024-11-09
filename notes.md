# How to start on vps

Have pm2 installed

## To start server:

Go to the root folder of the deno server

> pm2 start index.ts --interpreter="deno" --interpreter-args="run --allow-read
> --allow-write --allow-net --allow-env"

## To check for errors coming from the server:

> pm2 logs

or

> pm2 dashboard
