var launchpadFolderName = 'Launchpad';

var getLaunchpadSites = function getLaunchpadSites(cb){
    chrome.bookmarks.search(launchpadFolderName, function(results){
        var launchpadFolderId = results[0]['id'];
        chrome.bookmarks.getSubTree(launchpadFolderId, function(results){
            cb(results[0]['children']);
        });
    });
}

getLaunchpadSites(function(sites){
    console.log(sites);
});
