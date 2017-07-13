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
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('tasks')->truncate();
        DB::table('todo_lists')->truncate();

        $faker = Faker::create();
        $todoLists = [];
        $tasks = [];

        for ($i=1; $i <= 10; $i++) { 

            //membuat tanggal dinamis
            $date = date("Y-m-d H:i:s", strtotime("2017-07-17 08:00:00 + {$i} days"));
        	$todoLists[] = [
                'id' => $i,
        		'title' => "Todo list {$i}",
        		'description' => $faker->paragraph,
        		'user_id' => rand(1,2),
                'created_at' => $date,
                'updated_at' => $date
        	];

            for ($j=1; $j <= rand(1,5); $j++) { 
                $tasks[] = [
                    'todo_list_id' => $i,
                    'title' => $faker->sentence,
                    'created_at' => $date,
                    'updated_at' => $date,
                    'completed_at' => rand(0,1) == 0 ? NULL : $date
                ];
            }
        }

        DB::table('todo_lists')->insert($todoLists);
        DB::table('tasks')->insert($tasks);
    }
}
