var showType = function(type){
  $('p #' + type).addClass('active').siblings().removeClass('active')
  $('li.' + type).show()
  $('li:not(.' + type + ')').hide()
}

$(function(){

  chrome.storage.sync.get('show', function(data){
    showType(data.show)
  })

  $('p span').on('click', function(){
    type = $(this).attr('id')
    chrome.storage.sync.set({'show': type}, function() {
      showType(type)
    })
  })

})
