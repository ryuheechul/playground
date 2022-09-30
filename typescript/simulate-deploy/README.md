# typescript/simulate-deploy

It's a toy project to demonstrate the logic of automatic deploys that are triggered by new PRs
## Prerequisites
Satisfy one of:
- nix + direnv - `direnv allow` after cloning
- Docker - make sure - `docker ps` works
- already prepared Deno environment - I assume you (are willing to) develop Deno code
## Run

Simulates (or demonstrates the logic of) automatic deploys

The key files are:
- [simulate.ts](./simulate.ts)
- [simulate_test.ts](./simulate_test.ts)

`make test` to run the simulation
