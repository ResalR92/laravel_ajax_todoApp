// $('.show-todolist-modal').click(function(event) {
//mengaktifkan edit pada form yang BARU selesai di EDIT karena element hanya di load dengan AJAX
$('body').on('click','.show-todolist-modal',function(event) {
    event.preventDefault();
    //memanggil todolist->form
    // var url = $(this).attr('href');
    //menggunakan attribute title
    var me = $(this);
    var url = me.attr('href');
    var title = me.attr('title');

    $('#todo-list-title').text(title);
    $('#todo-list-save-btn').text(me.hasClass('edit') ? 'Update' : 'Create New');

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

// function showMessage(message) {
//     $('#add-new-alert').text(message).fadeTo(1000,500).slideUp(1000, function() {
//         $(this).hide();
//     });
// }

//jika memiliki alert pada element yang berbeda
function showMessage(message, element) {
    var alert = element == undefined ? '#add-new-alert' : element;
    $(alert).text(message).fadeTo(1000,500).slideUp(1000, function() {
        $(this).hide();
    });
}

function updateTodoListCounter() {
    var total = $('.list-group-item').length;
    $('#todo-list-counter').text(total).next().text(total > 1 ? 'records' : 'record');
}
//mencegah submit dengan tombol enter
$('#todolist-modal').on('keypress',":input:not(textarea)", function(event) {
    //13 adalah tombol enter
    return event.keyCode != 13;
});
//menghandel tombol save pada todolist create
$('#todo-list-save-btn').click(function(event) {
    event.preventDefault();

    //mendapatkan url dari action todolist create -> modal body
    var form = $('#todo-list-body form');
    var url = form.attr('action');
    // var method = "POST";
    var method = $('input[name=_method').val() == undefined ? 'POST' : 'PUT';
    // console.log(url);

    //reset error message
    form.find('.help-block').remove();
    form.find('.form-group').removeClass('has-error');

    $.ajax({
        url: url,
        method: method,
        data: $('#todo-list-body form').serialize(),//mengambil semua data form dalam bentuk "url encode"
        success: function(response) {
            if(method == 'POST') {
                // console.log(response);
                $('#todo-list').prepend(response);
                $('#todolist-modal').modal('hide');

                //flash message
                showMessage("Todo list has been created.");


                //jika flash message ada dalam form
                // form.trigger('reset');
                // $('#title').focus();

                updateTodoListCounter();
            }
            //response untuk update
            else {
                var id = $('input[name=id]').val();
                if(id) {
                    //menimpa item yang lama
                    // $('#todo-list-'+id).replaceWith(response);
                    //cara lain, item baru langsung berada di list paling atas
                    $('#todo-list-'+id).remove();
                    $('#todo-list').prepend(response);
                }
                $('#todolist-modal').modal('hide');

                //flash message
                showMessage("Todo list has been updated.");

            }
            
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
