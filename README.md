# Launchpad

Rocking the Chrome new tab page like it’s 2013.

## How to modify the extension

Run `sass --watch src/style:src` to compile the styles.

Then load the unpacked extension into the Google Chrome Extensions page, in developer mode.

## How to display bookmarks in the Launchpad

On first run, the extension will search for a “Launchpad” bookmarks folder, at the top level of the Bookmarks tree. If one is found, the child nodes are rendered as icons on the Launchpad. If no “Launchpad” bookmarks folder is found, an empty one is created. Just add your bookmarks to this folder, and they’ll appear on the Launchpad.

To add an icon for a bookmark in Launchpad, drag an image file from your desktop onto the grey placeholder icon for a site. SVG images work best, but if you must use a bitmap (PNG or GIF) ensure that it is 96px square, and around 4–5 KB in size. (Images that take up more than 8 KB once base64 encoded will be rejected.)
