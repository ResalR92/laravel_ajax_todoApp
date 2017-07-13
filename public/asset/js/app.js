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

    showNoRecordMessage(total);
}

//pesan record kosong
function showNoRecordMessage(total) {
    if(total > 0 ) {
        $('#todo-list').closest('.panel').removeClass('hidden');
        $('#no-record-alert').addClass('hidden');
    }
    else {
        $('#todo-list').closest('.panel').addClass('hidden');
        $('#no-record-alert').removeClass('hidden');
    }
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

// $('.show-task-modal').click(function(event) {
//     event.preventDefault();

//     $('#task-modal').modal('show');
// });


//show modal DELETE
$('body').on('click','.show-confirm-modal',function(event) {
    event.preventDefault();

    var me = $(this);
    var title = me.attr('data-title');
    var action = me.attr('href');

    $('#confirm-body form').attr('action',action);
    $('#confirm-body p').html("Are you sure to delete tode list: <strong>"+title+"</strong> ?");
    $('#confirm-modal').modal('show');
});

//tombol DELETe
$('#confirm-remove-btn').click(function(event) {
    event.preventDefault();

    var form = $('#confirm-body form');
    var url = form.attr('action');
    $.ajax({
        url: url,
        method: 'DELETE',
        data: form.serialize(),
        success: function(data) {
            $('#confirm-modal').modal('hide');
            $('#todo-list-'+data.id).fadeOut(function() {
                $(this).remove();
                updateTodoListCounter();

                showMessage('Todo list has been deleted.');
            });
        },
        error: function(xhr) {

        }
    });
});

function countActiveTasks() {
    var total = $('tr.task-item:not(:has(td.done))').length;

    $('#active-tasks-counter').text(total +" "+(total > 1 ? "tasks" : "task") +" left" );
}

//task list
$('body').on('click','.show-task-modal',function(event) {
    event.preventDefault();

    var anchor = $(this);
    var url = anchor.attr('href');
    var title = anchor.data('title');
    var action = anchor.data('action');
    var parent = anchor.closest('.list-group-item');

    $('#task-modal-subtitle').text(title);
    //action form tambah task baru
    $('#task-form').attr('action',action);

    $('#selected-todo-list').val(parent.attr('id'));

    $.ajax({
        url: url,
        dataType: 'html',
        success: function(response) {
            $('#task-table-body').html(response);
            initIcheck();
            //menghitung task->active
            countActiveTasks();
        }
    });

    $('#task-modal').modal('show');
});
//memperbaiki jumlah task pada todolist terpilih
function countAllTasksOfSelectedList() {
    var total = $('#task-table-body tr').length;
    var selectedTodoListId = $('#selected-todo-list').val();

    //mengambil todolist terpilih berdasarkan ID
    $('#'+selectedTodoListId).find('span.badge').text(total+" "+(total > 1 ? 'tasks' : 'task'));
}
//form tambah task baru
$('#task-form').submit(function(e) {
    e.preventDefault();

    var form = $(this);
    var action = form.attr('action');

    $.ajax({
        url: action,
        type: 'POST',
        data: form.serialize(),
        success: function(response) {
            $('#task-table-body').prepend(response);
            form.trigger('reset');  
            countActiveTasks();
            initIcheck();   
            //memperbaiki jumlah task pada todolist terpilih
            countAllTasksOfSelectedList();
        }
    });
});

// $(function() {
function initIcheck() {
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

    //event handler checkbox->completed
    $('body').on('ifChecked','.check-item', function(e) {
        var checkbox = $(this);
        var url = checkbox.data('url');
        var completed = checkbox.is(":checked");

        // alert('it work');
        $.ajax({
            url: url,
            type: 'PUT',
            data: {
                completed: completed,
                _token: $("input[name=_token]").val()
            },
            success: function(response) {
                if(response) {
                    var nextId = checkbox.closest('td').next();
                    if(completed) {
                        nextId.addClass('done');
                    }
                    else {
                        nextId.removeClass('done');
                    }

                    //memanggil fungsi mengupdate task aktif
                    countActiveTasks();
                }
            }
        });

    });
}


//filter button task
$('.filter-btn').click(function(e) {
    e.preventDefault();

    var id = this.id;
    //tombol active->dinamis
    $(this).addClass('active').parent().children().not(e.target).removeClass('active');

    if(id == "all-tasks") {
        $('tr.task-item').show();
    }
    else if(id == "active-tasks") {
        $('tr.task-item:has(td.done)').hide();
        $('tr.task-item:not(:has(td.done))').show();
    }
    else if(id == "completed-tasks") {
        $('tr.task-item:has(td.done)').show();
        $('tr.task-item:not(:has(td.done))').hide();
    }
});
