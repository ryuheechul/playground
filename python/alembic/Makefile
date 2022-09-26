.PHONY: test
test: install
	poetry run pytest

.PHONY: shell
shell: install
	python

.PHONY: show
show: install
	poetry show --tree

.PHONY: build
build:
	poetry build

.PHONY: install
install:
	poetry update

.PHONY: run-db
run-db:
	docker compose up

.PHONY: down
down:
	docker compose down

.PHONY: init-alembic
init-alembic: install
	alembic init alembic

# usage `make revision m="my message"`
.PHONY: revision
revision:
	alembic revision -m "$(m)"

.PHONY: run-migration
run-migration: install undo-migration
	alembic upgrade head

.PHONY: undo-migration
undo-migration: install
	alembic downgrade base

.PHONY: debug-site
debug-site:
	python -m site

# .PHONY: pgcli
# pgcli:
# 	pgcli -h 127.0.0.1 -p 65432 -U postgres -d postgres -w postgres

.PHONY: psql
psql:
	PGPASSWORD=postgres psql -h 127.0.0.1 -p 65432 -U postgres -d postgres -w
