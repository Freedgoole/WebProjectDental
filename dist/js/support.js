$(function () {
    $.ajax({
        beforeSend: function () {
            $('.support-main-form_wrapper').hide();
        },
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: 'http://504080.com/api/v1/directories/enquiry-types',
        success: success,
    });
    function success(data) {
        $('.support-main-form_wrapper').show();
        for (i = 0; i <= data.data.length; i++) {
            var option = '';
            option = `<option class="support-main-form_select-options" data="${data.data[i].name}">${data.data[i].name}</option>`;
            $('select').append(option);
        }
    }
    $('select').on('change', function () {
        var value = $(this).val();
        if (value == 'Other') {
            $('#input-other').fadeIn();
        }
        else {
            $('#input-other').fadeOut();
        }
    });
    $('.support-main-form_textarea').keyup(function () {
        var textareavalue = $('.support-main-form_textarea').val().length;
        $('.hextaera-header_letter').html(textareavalue + '/1000')
        if (textareavalue == 1000) {
            $('.hextaera-header_letter').css("color", "red");
        }
    })
    var maxFileSize = 5 * 1024 * 1024; // (байт) Максимальный размер файла (5мб)
    var queue = {};
    var form = $('form#uploadImages');
    var imagesList = $('#uploadImagesList');
    var itemPreviewTemplate = imagesList.find('.item.template').clone();
    itemPreviewTemplate.removeClass('template');
    imagesList.find('.item.template').remove();
    $('#addImages').on('change', function () {
        var files = this.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
                alert('Фотография должна быть в формате jpg, png или');
                continue;
            }
            if (file.size > maxFileSize) {
                alert('Размер фотографии не должен превышать 5 Мб');
                continue;
            }
            preview(files[i]);
        }
        this.value = '';
    });
    function preview(file) {
        var reader = new FileReader();
        reader.addEventListener('load', function (event) {
            var img = document.createElement('img');
            var itemPreview = itemPreviewTemplate.clone();
            itemPreview.find('.img-wrap img').attr('src', event.target.result);
            itemPreview.data('id', file.name);
            imagesList.append(itemPreview);
            queue[file.name] = file;
        });
        reader.readAsDataURL(file);
    }
  
    $('.support-main-form-btn').on('click',function(){
        var formData = new FormData(itemPreviewTemplate);
        for (var id in queue) {
            formData.append('images[]', queue[id]);
        }
        $.ajax({
            type: 'post',
            contentType: 'multipart/form-data',
            url: 'http://504080.com/api/v1/support',
            data: {
                "description": `$('.support-main-form_textarea').val()`,
                "email": $('.email-input-form').val(),
                "enquiry_type" :  $('select').val(),
                "file": formData,
                "subject" : $('.input-subject').val(),
                "user_name" : $('.user_name').val()
            },
            success: function() {
                console.log(data)
            },
        });
    })
});