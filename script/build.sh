#!/bin/sh

# Run this script by calling `npm run build` from repo root directory

node-sass src/style.scss style.css

cd src
crx pack -o ../dist/launchpad.crx --zip-output ../dist/launchpad.zip -p ../key.pem