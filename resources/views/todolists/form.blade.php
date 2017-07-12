{!! Form::model($todoList, ['route'=>'todolists.store']) !!}
    <div class="form-group">
        <label for="title" class="control-label">List Name</label>
        {{-- <input type="text" class="form-control input-lg"> --}}
        {!! Form::text('title', null, ['class'=>'form-control input-lg','id'=>'title']) !!}
    </div>
    <div class="form-group">
        <label for="description" class="control-label">Description</label>
        {{-- <textarea rows="2" class="form-control"></textarea> --}}
        {!! Form::textarea('description', null, ['class'=>'form-control', 'rows'=>2,'id'=>'description']) !!}
    </div>
{!! Form::close() !!}