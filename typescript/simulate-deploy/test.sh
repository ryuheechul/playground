#!/usr/bin/env bash

if which deno; then
	echo 'Deno detected trying natively'
	deno test
else
	echo 'Deno not detected trying with Docker'
	docker compose up
fi
