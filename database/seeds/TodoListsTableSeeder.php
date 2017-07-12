<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class TodoListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('todo_lists')->truncate();

        $faker = Faker::create();
        $todoLists = [];

        for ($i=1; $i <= 10; $i++) { 
        	$todoLists[] = [
        		'title' => "Todo list {$i}",
        		'description' => $faker->paragraph,
        		'user_id' => rand(1,2)
        	];
        }

        DB::table('todo_lists')->insert($todoLists);
    }
}
