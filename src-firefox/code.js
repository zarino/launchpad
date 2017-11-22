var launchpadFolderName = 'Launchpad';
var launchpadFolderParentId = 'menu________';

var logError = function logError(err){
    console.log(err);
}

var getLaunchpadSites = function getLaunchpadSites(cb){
    browser.bookmarks.getChildren(launchpadFolderParentId).then(function(results){
        var launchPadFolder = results.find(function(result){
            return result.title === launchpadFolderName;
        });

        if(typeof launchPadFolder === 'undefined'){
            browser.bookmarks.create({
                parentId: launchpadFolderParentId,
                title: launchpadFolderName
            });
            return cb([]);
        }

        browser.bookmarks.getChildren(launchPadFolder['id']).then(function(results){
            if(results.length === 0){
                return cb([]);
            }
            cb(results);
        }, logError);
    }, logError);
}

var createIconForSite = function createIconForSite(site, cb){
    getImageForSite(site, function(dataURI){
        var $icon = $('<span>').addClass('icon');

        if(typeof dataURI !== 'undefined'){
            $icon.css('background-image', 'url(' + dataURI + ')')
        } else {
            $icon.addClass('icon--placeholder')
                .text(site.title.substr(0,1).toUpperCase());
        }

        return cb($icon);
    });
}

var getImageForSite = function getImageForSite(site, cb){
    browser.storage.sync.get(site.id).then(function(result){
        cb(result[site.id]);
    }, logError);
}

var storeImageForSite = function storeImageForSite(dataURI, site, cb){
    var data = {};
    data[site.id] = dataURI;
    browser.storage.sync.set(data).then(cb, logError);
}

var iconDragover = function iconDragover(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).addClass('icon--replace');
}

var iconDragleave = function iconDragleave(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).removeClass('icon--replace');
}

var iconDrop = function iconDrop(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).removeClass('icon--replace');

    var site = $(this).parent().data('site');
    var $icon = $(this);
    var files = e.originalEvent.dataTransfer.files;
    var reader = new FileReader();

    reader.addEventListener("load", function(){
        storeImageForSite(reader.result, site, function(){
            createIconForSite(site, function($newIcon){
                $icon.replaceWith($newIcon);
            });
        });
    }, false);

    if(/^image[/]/.test(files[0].type)){
        reader.readAsDataURL(files[0]);
    }
}

var showHint = function showHint(){
    var $hint = $('<p>')
        .addClass('hint')
        .text('Add sites to the “Launchpad” bookmarks folder, and they will appear on this page.')
        .appendTo('body');
}

getLaunchpadSites(function(sites){
    if(sites.length == 0){
        showHint();

    } else {
        sites.forEach(function(site){
            createIconForSite(site, function($icon){
                $('<a>')
                    .addClass('site')
                    .attr('href', site.url)
                    .text(site.title)
                    .prepend($icon)
                    .data('site', site)
                    .on('dragover', '.icon', iconDragover)
                    .on('dragleave', '.icon', iconDragleave)
                    .on('drop', '.icon', iconDrop)
                    .appendTo('body');
            });
        });
    }
});
