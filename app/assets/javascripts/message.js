$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message">
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.name}
                          </div>
                            <div class="message__upper-info__date">
                              ${message.created_at}
                                </div>
                                  </div>
                                <div class="message__text">
                              <p class="lower-message__content">
                            ${message.content}
                          </p>
                        <img class="lower-message__image" src='${message.image}' alt="98994102fd19907905fbf84d8fc3fa88">
                      </div>
                      </div>`
    } else {
      var html =  `<div class="message">
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.name}
                          </div>
                            <div class="message__upper-info__date">
                              ${message.created_at}
                                </div>
                              </div>
                            <div class="message__text">
                          <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    }
    return html
  }

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
});