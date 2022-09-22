{ pkgs ? import <nixpkgs> {} }:

with pkgs;
mkShell {
  buildInputs = [
    # python37
    # python38
    # python39
    python310Full
    # python311
    poetry
  ];
}
