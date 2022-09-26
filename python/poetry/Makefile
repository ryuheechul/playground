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

# use it to examine the boilerplate project
.PHONY: demo-project
demo-project:
	cd .. && poetry new poetry-demo
