<div class="modal fade" id="task-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Todo List</h4>
        <p>of <strong>To do List 1</strong></p>
      </div>
      <div class="modal-body">
        <div class="panel panel-default">
            <table class="table">
                <thread>
                    <td width="50" style="vertical-align: middle;">
                        <input type="checkbox" name="check_all" id="check-all">
                    </td>
                    <td>
                        <input type="text" placeholder="Enter New Task" class="task-input">
                    </td>
                </thread>
                <tbody id="task-table-body"></tbody>
            </table>
        </div>
      </div>
      <div class="modal-footer clearfix">
        <div class="pull-left">
            <a href="#" class="btn btn-xs btn-default active">All</a>
            <a href="#" class="btn btn-xs btn-default">Active</a>
            <a href="#" class="btn btn-xs btn-default">Completed</a>
        </div>
        <div class="pull-right">
            <small>3 items left</small>
        </div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->