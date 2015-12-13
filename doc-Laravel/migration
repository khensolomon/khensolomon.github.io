/*
|*********************************************
| php composer & php artisan
|*********************************************
|
*/
#COMPOSER
composer require illuminate/html

#GULP -> You can link the global gulb locally:
npm link gulp
npm install -g gulp

#create new table
php artisan make:migration create_articles_table --create="articles"

php artisan make:migration create_zogam_table --create="zogam"
php artisan make:migration create_beh_table --create="beh"
php artisan make:migration create_role_table --create="role"
php artisan make:migration create_country_table --create="country"

php artisan make:migration create_articles_table --create="articles"

#add new column
php artisan make:migration add_excerpt_to_articles_table
#new column in articles
php artisan make:migration add_excerpt_to_articles_table --table="articles"


#composer require
composer require doctrine/dbal

#CREATE NEW CONTROLLER
php artisan make:controller WelcomeController

#CREATE NEW REQUEST
php artisan make:request CreateArticleRequest

#CACHE CLEAR
php artisan cache:clear

#HASH
Hash:make('password');
bcrypt('password');

$user->article->toArray(); //or
$user->article()->get()->toArray(); //are the same
$user->article()->where('title','abc')->get()->toArray();

#php artisan tinker
	//call db
$user = new App\User; 
	//get db
$user = App\User::all();
$user = App\User::first();
$user->role->toArray();
	//FIND
$user = App\User::find(1);
	//THEN CALL USER METHOD
$user->role->toArray();
	//WITH 	QUERY
$user = App\User::where('id',2)->first(); //only the first one
$user = App\User::where('id',2)->get();

	//INSERT
$user = App\User::create(['name'=>'Name']);
	//UPDATE
$user = App\User::update(['name'=>'Name']);

$user = App\User::all()->where('id','==','1')->get();
$user = App\User::where('id','==','1')->get();
$user = App\User::all()->where('id','=','1');
$user = App\User::all()->where(['id','==','1'])->get();

$user = App\User::where('id','=',1)->get();


$user = App\User::where('id','=','1');
$user