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
    selected-python
    poetry
  ];
}
