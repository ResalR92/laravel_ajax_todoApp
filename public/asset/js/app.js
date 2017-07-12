$('.show-todolist-modal').click(function(event) {
    event.preventDefault();
    //memanggil todolist->form
    var url = $(this).attr('href');
    $.ajax({
        url: url,
        dataType: 'html',
        success: function(response) {
            // console.log('berhasil');// menambahkan form ke modal->body
            $('#todo-list-body').html(response);
        }
    });
    $('#todolist-modal').modal('show');
});

//menghandel tombol save pada todolist create
$('#todo-list-save-btn').click(function(event) {
    event.preventDefault();

    //mendapatkan url dari action todolist create -> modal body
    var form = $('#todo-list-body form');
    var url = form.attr('action');
    var method = "POST";
    // console.log(url);

    //reset error message
    form.find('.help-block').remove();
    form.find('.form-group').removeClass('has-error');

    $.ajax({
        url: url,
        method: method,
        data: $('#todo-list-body form').serialize(),//mengambil semua data form dalam bentuk "url encode"
        success: function(response) {
            // console.log(response);
            $('#todo-list').prepend(response);
            $('#todolist-modal').modal('hide');
        },
        error: function(xhr) {
            //menyimpan xhr untuk pesan error
            var errors = xhr.responseJSON;
            if($.isEmptyObject(errors) == false) {
                $.each(errors, function(key, value) {
                    $('#' + key).closest('.form-group')
                                .addClass('has-error')
                                .append('<span class="help-block"><strong>'+value+'</strong></span');
                });
            }
        }
    });
});

$('.show-task-modal').click(function(event) {
    event.preventDefault();

    $('#task-modal').modal('show');
});

$(function() {
    $('input[type=checkbox]').iCheck({
        checkboxClass: 'icheckbox_square-green',
        increaseArea: '20%'
    });

    $('#check-all').on('ifChecked', function(e) {
        $('.check-item').iCheck('check');
    });

    $('#check-all').on('ifUnchecked', function(e) {
        $('.check-item').iCheck('uncheck');
    });
});
