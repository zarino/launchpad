#!/bin/sh

# Run this script by calling `npm run build` from repo root directory

node-sass --output-style compressed src-chrome/style.scss src-chrome/style.css
node-sass --output-style compressed src-firefox/style.scss src-firefox/style.css

cd src-chrome
crx pack -o ../dist/launchpad-chrome.crx --zip-output ../dist/launchpad-chrome.zip -p ../key.pem

cd ../
web-ext sign --source-dir src-firefox --artifacts-dir dist --api-key $(cat jwt-issuer.txt) --api-secret $(cat jwt-secret.txt)
web-ext build --source-dir src-firefox --artifacts-dir dist

cd dist
find . -regex './launchpad-[0-9.]*[a-z.+-]*\.xpi' -exec mv {} 'launchpad-firefox.xpi' \;
find . -regex './launchpad-[0-9.]*\.zip' -exec mv {} 'launchpad-firefox.zip' \;
