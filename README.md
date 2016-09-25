# Launchpad

Rocking the Chrome new tab page like it’s 2013.

## How to install this Chrome extension

Download a copy of the `subscribe-with-feedbin.crx` file, from inside the `dist` directory. Drag and drop the `subscribe-with-feedbin.crx` file onto the `chrome://extensions` window.

## How to use this Chrome extension

On first run, the extension will search for a “Launchpad” bookmarks folder, at the top level of the Bookmarks tree. If one is found, the child nodes are rendered as icons on the Launchpad. If no “Launchpad” bookmarks folder is found, an empty one is created. Just add your bookmarks to this folder, and they’ll appear on the Launchpad.

To add an icon for a bookmark in Launchpad, drag an image file from your desktop onto the grey placeholder icon for a site. SVG images work best, but if you must use a bitmap (PNG or GIF) ensure that it is 96px square, and around 4–5 KB in size. (Images that take up more than 8 KB once base64 encoded will be rejected.)

## How to modify and repackage the extension

Make your changes, then increment the version number, substituting the number after `--` with the new version you want to change to:

    npm install
    npm run version -- 0.1.2

Then, with the new version number in place, build the `.crx` and `.zip` packages:

    npm run build

You can place an SSL Private Key at `key.pm` in the repo root directory, or you can let the build script create one for you.

You will probably want to commit that change and create a new git tag to match the version number:

    git commit -a
    git tag -a v0.1.2
    git push --tags

The `.crx` package can be installed directly into Chrome. The `.zip` package can be uploaded to your Chrome Web Store Developer Dashboard.

## How to recompile the Sass styles during development

The build script can handle this for you. Just run it as normal, and as well as creating the `.crx` and `.zip` packages, it will compile the Sass styles:

    npm run build

If you would prefer to have it watch for changes, and compile the Sass in the background as you edit it, then run `node-sass` directly:

    ./node_modules/node-sass/bin/node-sass -w src/style/style.scss src/style.css

Or just run Sass using your machine’s own binary, for example:

    sass --watch src/style:src

