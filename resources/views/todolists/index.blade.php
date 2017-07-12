@extends('layouts.main')

@section('title','AJAX Todo App')

@section('content')
	<!-- Header -->
	<header>
	    <div class="container">
	        <div class="row">
	            <div class="col-md-8 col-md-offset-2">
	                <div class="clearfix">
	                    <div class="pull-left">
	                        <h1 class="header-title">Todo List</h1>
	                    </div>
	                    <div class="pull-right">
	                        <a href="#" class="btn btn-success show-todolist-modal">Create New List</a>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</header>

	<!-- Main Container -->
	<div class="container">
	    <div class="row">
	        <div class="col-md-8 col-md-offset-2">
	        	<?php $count = $todoLists->count(); ?>
	        	<div class="alert alert-warning {{ $count ? 'hidden' : '' }}" id="no-record-alert">
	        		No records found.
	        	</div>
	            <div class="panel panel-default {{ ! $count ? 'hidden' : '' }}">
	                <ul class="list-group" id="todo-list">
	                	@foreach ($todoLists as $todoList)
	                		<li class="list-group-item" id="todo-list-{{ $todoList->id }}">
	                		    <h4 class="list-group-item-heading">{{ $todoList->title }} <span class="badge">0 tasks</span></h4>
	                		    <p class="list-group-item-text">
	                		    	{{ $todoList->description }}
	                		    </p>
	                		    <div class="buttons">
	                		        <a href="#" class="btn btn-info show-task-modal btn-xs" title="Manage Tasks">
	                		            <i class="glyphicon glyphicon-ok"></i>
	                		        </a>
	                		        <a href="#" class="btn btn-default show-todolist-modal btn-xs" title="Edit">
	                		            <i class="glyphicon glyphicon-edit"></i>
	                		        </a>
	                		        <a href="#" class="btn btn-danger btn-xs" title="Delete">
	                		            <i class="glyphicon glyphicon-remove"></i>
	                		        </a>
	                		    </div>
	                		</li>
	                	@endforeach
	                </ul>

	                <div class="panel-footer">
	                    <small><span id="todo-list-counter">{{ $count }}</span> <span>{{ $count > 1 ? 'records' : 'record' }}</span></small>
	                </div>
	            </div>
	        </div>

	        @include('todolists.todolistmodal')

	        @include('todolists.taskmodal')
	    </div>
	</div>
@endsection