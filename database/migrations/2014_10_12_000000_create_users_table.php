<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}

// resal@resal-Inspiron-11-3162:/var/www/html/laravel/latihan/todoapp$ php artisan migrate:install
// Migration table created successfully.
// resal@resal-Inspiron-11-3162:/var/www/html/laravel/latihan/todoapp$ php artisan migrate:status
// +------+------------------------------------------------+
// | Ran? | Migration                                      |
// +------+------------------------------------------------+
// | N    | 2014_10_12_000000_create_users_table           |
// | N    | 2014_10_12_100000_create_password_resets_table |
// +------+------------------------------------------------+

//menjalankan method up migration
// resal@resal-Inspiron-11-3162:/var/www/html/laravel/latihan/todoapp$ php artisan migrate
// Migrating: 2014_10_12_000000_create_users_table
// Migrated:  2014_10_12_000000_create_users_table
// Migrating: 2014_10_12_100000_create_password_resets_table
// Migrated:  2014_10_12_100000_create_password_resets_table
// resal@resal-Inspiron-11-3162:/var/www/html/laravel/latihan/todoapp$ php artisan migrate:status
// +------+------------------------------------------------+
// | Ran? | Migration                                      |
// +------+------------------------------------------------+
// | Y    | 2014_10_12_000000_create_users_table           |
// | Y    | 2014_10_12_100000_create_password_resets_table |
// +------+------------------------------------------------+
// resal@resal-Inspiron-11-3162:/var/www/html/laravel/latihan/todoapp$ 

//menjalankan method down migration
// resal@resal-Inspiron-11-3162:/var/www/html/laravel/latihan/todoapp$ php artisan migrate:rollback
// Rolling back: 2014_10_12_100000_create_password_resets_table
// Rolled back:  2014_10_12_100000_create_password_resets_table
// Rolling back: 2014_10_12_000000_create_users_table
// Rolled back:  2014_10_12_000000_create_users_table
// resal@resal-Inspiron-11-3162:/var/www/html/laravel/latihan/todoapp$ 
// resal@resal-Inspiron-11-3162:/var/www/html/laravel/latihan/todoapp$ php artisan migrate:status
// +------+------------------------------------------------+
// | Ran? | Migration                                      |
// +------+------------------------------------------------+
// | N    | 2014_10_12_000000_create_users_table           |
// | N    | 2014_10_12_100000_create_password_resets_table |
// +------+------------------------------------------------+
// resal@resal-Inspiron-11-3162:/var/www/html/laravel/latihan/todoapp$ 

