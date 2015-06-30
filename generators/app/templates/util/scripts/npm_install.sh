#!/usr/bin/env bash
install_directory () {
   DIR="$1"
  if [ -d "$DIR" ]; then
    npm install --prefix "$DIR"
  fi
}

CUR_DIR="`dirname $0`"

install_directory "$CUR_DIR/../../src/api"
install_directory "$CUR_DIR/../../src/webapp"
install_directory "$CUR_DIR/../development"
