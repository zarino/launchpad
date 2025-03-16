#!/bin/sh

# Run this script by calling `npm run build` from repo root directory

sass --style compressed --quiet src-chrome/style/style.scss src-chrome/style.css
sass --style compressed --quiet src-firefox/style/style.scss src-firefox/style.css

cd src-chrome
crx pack -o ../dist/launchpad-chrome.crx --zip-output ../dist/launchpad-chrome.zip -p ../key.pem

cd ../
web-ext sign --channel unlisted --source-dir src-firefox --artifacts-dir dist --api-key $(cat jwt-issuer.txt) --api-secret $(cat jwt-secret.txt)
web-ext build --source-dir src-firefox --artifacts-dir dist

cd dist
find . -regex './launchpad-[0-9.]*[a-z.+-]*\.xpi' -exec mv {} 'launchpad-firefox.xpi' \;
find . -regex './launchpad-[0-9.]*\.zip' -exec mv {} 'launchpad-firefox.zip' \;
