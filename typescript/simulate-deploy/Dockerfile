FROM denoland/deno:1.26.0
WORKDIR /app

COPY deps.ts .
# https://medium.com/deno-the-complete-reference/running-deno-in-docker-35756ffff66d
RUN deno cache deps.ts

COPY *.ts .

ENTRYPOINT ["deno"]
CMD ["test"]
