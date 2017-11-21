var launchpadFolderName = 'Launchpad';
var launchpadFolderParentId = '1';

// In Firefox, the browser API is in the `browser` variable;
// in Chrome, it’s in `chrome`. Even though Firefox includes its
// own chrome->browser alias, we define our own here, to avoid
// unexpected "not defined" errors when accessing grandparent
// methods of the `chrome` alias in Firefox.
var api = (typeof browser !== 'undefined') ? browser : chrome;

// Work out whether we need to use a callback-based API
// (Chrome), or a promise-based API (Firefox).
var isCallbackAPI = (typeof browser === undefined);

// Compatibility layer, to convert promise-based WebExtension-style
// API methods into callback-based Chrome-style API methods.
// eg: call(api.some.api.method, [arg1, arg2], callbackFn);
var call = function call(method, args, cb) {
    var args = args || [];
    if (isCallbackAPI) {
        args.push(cb);
        method.apply(api, args);
    } else {
        var _promise = method.apply(api, args);
        _promise.then(cb, function(err){ console.error(err); });
    }
}

var getLaunchpadFolderParentId = function getLaunchpadFolderParentId(cb){
    call(api.bookmarks.getTree, [], function(tree){
        var parentFolder = tree[0]['children'].find(function(f){
            // Ridiculously, Firefox gives its top level "Bookmarks Menu"
            // an id of "menu________". In Chrome, it’s just "1".
            return f.id === 'menu________' || f.id === '1';
        });
        cb(parentFolder.id);
    });
}

var getLaunchpadSites = function getLaunchpadSites(cb){
    call(api.bookmarks.getChildren, [launchpadFolderParentId], function(results){
        var launchPadFolder = results.find(function(result){
            return result.title === launchpadFolderName;
        });

        if(typeof launchPadFolder === 'undefined'){
            call(api.bookmarks.create, [{
                parentId: launchpadFolderParentId,
                title: launchpadFolderName
            }]);
            return cb([]);
        }

        call(api.bookmarks.getChildren, [launchPadFolder['id']], function(results){
            if(results.length === 0){
                return cb([]);
            }
            cb(results);
        });
    });
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
    call(api.storage.sync.get, [site.id], function(result){
        cb(result[site.id]);
    });
}

var storeImageForSite = function storeImageForSite(dataURI, site, cb){
    var data = {};
    data[site.id] = dataURI;
    call(api.storage.sync.set, [data], cb);
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


getLaunchpadFolderParentId(function(id){

    launchpadFolderParentId = id;

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
});

// var _promise = browser.bookmarks.getTree.apply(browser, []);
// _promise.then(function(results){ console.log(results); }, function(err){ console.warn(err); });
