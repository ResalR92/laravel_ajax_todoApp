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
