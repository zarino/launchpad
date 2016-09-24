var launchpadFolderName = 'Launchpad';

var getLaunchpadSites = function getLaunchpadSites(cb){
    chrome.bookmarks.getChildren('1', function(results){
        var launchPadFolder = results.find(function(result){
            return result.title === launchpadFolderName;
        });

        if(typeof launchPadFolder === 'undefined'){
            chrome.bookmarks.create({
                parentId: "1",
                title: launchpadFolderName
            });
            return cb([]);
        }

        chrome.bookmarks.getChildren(launchPadFolder['id'], function(results){
            if(results.length === 0){
                return cb([]);
            }
            cb(results);
        });
    });
}

getLaunchpadSites(function(sites){
    if(sites.length == 0){
        var $a = $('<a>')
            .on('click', function(){
                chrome.tabs.create({ url: 'chrome://bookmarks' });
            })
            .attr('href', 'chrome://bookmarks')
            .text('Open bookmark manager');
        var $hint = $('<p>')
            .addClass('hint')
            .text('Add sites to the “Launchpad” bookmarks folder, and they will appear on this page.')
            .append($a)
            .appendTo('body');

    } else {
        sites.forEach(function(site){
            var $icon = $('<span>')
                .addClass('icon')
                .addClass('icon--placeholder')
                .text(site.title.substr(0,1).toUpperCase());
            var $label = $('<span>')
                .addClass('label')
                .text(site.title);
            $('<a>')
                .addClass('site')
                .attr('href', site.url)
                .append($icon)
                .append($label)
                .appendTo('body');
        });
    }
});
