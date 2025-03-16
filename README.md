# Launchpad

Rocking the Chrome and Firefox new tab pages like it’s 2013.

## How to install this extension

**Chrome:** Download a copy of the `launchpad-chrome.crx` file from inside the `dist` directory, and drag and drop it onto the `chrome://extensions` window.

**Firefox:** Download a copy of the `launchpad-firefox.xpi` file from inside the `dist` directory, and drag and drop it onto an open Firefox window.

## How to use this extension

On first run, the extension will search for a “Launchpad” bookmarks folder, at the top level of the Bookmarks tree. If one is found, the child nodes are rendered as icons on the Launchpad. If no “Launchpad” bookmarks folder is found, an empty one is created. Just add your bookmarks to this folder, and they’ll appear on the Launchpad.

To add an icon for a bookmark in Launchpad, drag an image file from your desktop onto the grey placeholder icon for a site. SVG images work best, but if you must use a bitmap (PNG or GIF) ensure that it is 96px square, and around 4–5 KB in size. (Images that take up more than 8 KB once base64 encoded will be rejected.)

## How to modify and repackage the extension

Make your changes, then increment the version number, substituting the number after `--` with the new version you want to change to:

    npm install
    npm run version -- 2.0.1

Then, with the new version number in place, build the `.crx`, `.xpi`, and `.zip` packages:

    npm run build

`crx` will sign the Chrome Extension (`launchpad-chrome.crx`) with the SSL Private Key at `./key.pm` in the repo root directory. If no `key.pm` is found, one will be created for you.

`web-ext` will sign the Firefox Extension (`launchpad-firefox.xpi`) with the Mozilla Add-ons Developer Hub credentials at `./jwt-issuer.txt` and `./jwt-secret.txt`, and also add it to your Developer Hub Profile. If you haven’t already, you’ll need to [sign up for a Mozilla Developer account](https://addons.mozilla.org/en-US/developers/addon/api/key/) and paste your “JWT issuer” and “JWT secret” credentials into those two text files, so `web-ext` can find them.

Build will create 4 files in `dist/`:

* `launchpad-chrome.crx` – for installing manually into Chrome
* `launchpad-chrome.zip` – for uploading to the Chrome Developer Dashboard
* `launchpad-firefox.xpi` – for installing manually into Firefox
* `launchpad-firefox.zip` – for uploading to the Firefox Add-on Developer Hub

You’ll probably want to commit these files to the repo and create a new git tag to match the version number:

    git commit -a
    git tag -a v2.0.1
    git push --tags

## How to recompile the Sass styles during development

The build script can handle this for you. Just run it as normal, and as well as creating the `.crx` and `.zip` packages, it will compile the Sass styles:

    npm run build

If you would prefer to have it watch for changes, and compile the Sass in the background as you edit it, then run `sass` directly:

    ./node_modules/.bin/sass -w src-chrome/style/style.scss src-chrome/style.css

Or just run Sass using your machine’s own binary, for example:

    sass --watch src-chrome/style:src-chrome

