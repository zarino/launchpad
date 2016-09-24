# Launchpad

Rocking the Chrome new tab page like it’s 2013.

## How to modify the extension

Run `sass --watch src/style:src` to compile the styles.

Then load the unpacked extension into the Google Chrome Extensions page, in developer mode.

## How to display bookmarks in the Launchpad

On first run, the extension will search for a “Launchpad” bookmarks folder, at the top level of the Bookmarks tree. If one is found, the child nodes are rendered as icons on the Launchpad. If no “Launchpad” bookmarks folder is found, an empty one is created. Just add your bookmarks to this folder, and they’ll appear on the Launchpad.
