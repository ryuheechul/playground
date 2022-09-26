{ pkgs ? import <nixpkgs> {} }:

with pkgs;
let
  # selected-python = python37;
  # selected-python = python38;
  # selected-python = python39;
  selected-python = python310Full;
  # selected-python = python311;
in
mkShell {
  buildInputs = [
    # thanks to https://github.com/psycopg/psycopg2/issues/1200#issuecomment-776159466
    postgresql  # for `psycopg2-binary`
    openssl     # for `psycopg2-binary`
    selected-python
    poetry
    ## unfortunately this propagates system-site-packages as described in the link below
    ## https://github.com/NixOS/nixpkgs/blob/c85040af5cfcd191afac5db6ec122dcfa65ebc1d/pkgs/development/python-modules/pgcli/default.nix#L37
    # pgcli - you can use psql instead in this instance
  ];
}
