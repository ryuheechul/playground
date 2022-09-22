# playground/python/poetry

## Prerequisites

- https://github.com/NixOS/nix
- https://direnv.net/
  - don't forget to `direnv allow`

### Fallback From Prerequisites

#### nix
If you don't (want to) use nix, you can install packages listed at [shell.nix](./shell.nix) yourself.

#### direnv
If you don't (want to) use direnv, you can do what direnv does yourself by running what's written at [.envrc](./.envrc).

## Set Python Version

Fix python version for your liking at these files:
- [.envrc](./.envrc)
- [shell.nix](./shell.nix)
- [pyproject.toml](./pyproject.toml)

## List Dependencies
List pip dependencies at [pyproject.toml](./pyproject.toml)

## Start Using the Python and Packages
These below should let you get started.
```bash
make install
make shell
```

More commands can be found at [Makefile](./Makefile)
