var showType = function(type){
  $('p #' + type).addClass('active').siblings().removeClass('active')
  $('li.' + type).show()
  $('li:not(.' + type + ')').hide()
}

$(function(){

  chrome.storage.sync.get('show', function(data){
    if('show' in data){
      showType(data.show)
    } else {
      type = 'play'
      chrome.storage.sync.set({'show': type}, function() {
        showType(type)
      })
    }
  })

  $('p span').on('click', function(){
    type = $(this).attr('id')
    chrome.storage.sync.set({'show': type}, function() {
      showType(type)
    })
  })

})
