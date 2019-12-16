$(function(){

   var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message__upper-info">` +
          `<div class="message__upper-info__talker">` +
            message.name +
          `</div>` +
          `<div class="message__upper-info__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message__text">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message__upper-info">` +
          `<div class="message__upper-info__talker">` +
            message.name +
          `</div>` +
          `<div class="message__upper-info__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message__text">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message__upper-info">` +
          `<div class="message__upper-info__talker">` +
            message.name +
          `</div>` +
          `<div class="message__upper-info__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message__text">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message:last').data('message-id'); 
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });
    }
  };
  


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.new_message__submit').removeAttr('disabled');
    })
    .fail(function(){
      alert('エラー')
    })
    });
    
    setInterval(reloadMessages, 7000);
});