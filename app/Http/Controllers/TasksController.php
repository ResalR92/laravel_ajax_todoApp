<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use App\TodoList;

class TasksController extends Controller
{
    public function store(Request $request, $todoListId) 
    {
    	$this->validate($request, [
    		'title' => 'required'
    	]);

    	$todoList = TodoList::findOrFail($todoListId);

    	$task = $todoList->tasks()->create($request->all());

    	return view('tasks.item',compact('task'));
    }
}
