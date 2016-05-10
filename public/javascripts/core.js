  $('.message .close')
      .on('click', function() {
          $(this)
              .closest('.message')
              .transition('fade');
      });

  $.fn.api.settings.api = {
      'get contacts': '/get-contacts',
      'send': '/add-to-queue'
  };

$.recipientsArea = $('#recipients-area');
$.clearAllBtn = $('#removeAll');
$.addAllBtn = $('#addAll');
$.sendBtn = $('#send');
$.messageBox = $('#message-box');
$.successMessage = $('#success-message');
$.search = $('#search');
$.contacts = null;

  $.get($.fn.api.settings.api['get contacts'], function(data) {
      $('.ui.search').search({
          source: data,
          searchFields: [
              'title', 'description'
          ],
          onSelect: function (r, rs) {
              addRecipient(r);
          },
          searchFullText: false,
          minCharacters: 2
      });

      $.contacts = data;
  });

  addRecipient = function(contactData) {
      var label = '<div class="ui image label" data-number={{description}}>' +
          '{{title}}<i class="delete icon" onclick="removeParent(this)"></i></div>';

        $.recipientsArea.append($(Mustache.render(label, contactData)));
  }

  $.clearAllBtn.on('click', function(e){
    $.recipientsArea.empty();
  });

  getRecipients = function(callback) {
    var recipients = [];

    $.recipientsArea.children().each(function(){
      recipients.push($(this).attr('data-number'));
    });

    return recipients;
  }

removeParent = function(e) {
   $(e).parent().remove();
}

$.sendBtn.on('click', function(e){
  var payload = {data: JSON.stringify({recipients: getRecipients(), message: $.messageBox.val()})};
  $.post($.fn.api.settings.api['send'], payload, function(r){
    $.successMessage.show().fadeOut(4000);
    $.messageBox.val(null);
    $.search.val(null);
  });
})

$.addAllBtn.on('click', function(e){
  $.each($.contacts, function(i, contactData) {
    addRecipient(contactData);
  });
});
