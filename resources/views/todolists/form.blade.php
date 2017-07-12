{!! Form::model($todoList, [
        'route'=> $todoList->exists ? ['todolists.update', $todoList->id] : 'todolists.store',
        'method' => $todoList->exists ? 'PUT' : 'POST'
    ]) 
!!}
    <div class="form-group">
        <label for="title" class="control-label">List Name</label>
        {{-- <input type="text" class="form-control input-lg"> --}}
        {!! Form::text('title', null, ['class'=>'form-control input-lg','id'=>'title']) !!}
        {!! Form::hidden('id') !!}
    </div>
    <div class="form-group">
        <label for="description" class="control-label">Description</label>
        {{-- <textarea rows="2" class="form-control"></textarea> --}}
        {!! Form::textarea('description', null, ['class'=>'form-control', 'rows'=>2,'id'=>'description']) !!}
    </div>
{!! Form::close() !!}