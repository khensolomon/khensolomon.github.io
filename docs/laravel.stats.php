/*
**********************************************
    way to send variables to view!
**********************************************
*/
<?php
/*
---------------------------------------------
    MAIN App\Stats.php
---------------------------------------------
*/
namespace App;
class Stats {
    public function lessons(){
        return 450;
    }
}
?>
<?php
/*
---------------------------------------------
    SOLUTION ONE, in routes.php
---------------------------------------------
*/
Route::get('/',function(App\Stats $stats){
    return view('bladetpl', compact('stats'));
})
?>
<?php
/*
---------------------------------------------
    SOLUTION TWO, in routes.php
---------------------------------------------
*/
View::composer('bladetpl',function($view){
    $view->with('stats', app('App\Stats'));
});
?>
/*
---------------------------------------------
    SOLUTION THREE, just @inject(class,path)"
---------------------------------------------
*/
@inject('stats', 'App\Stats')
/*
---------------------------------------------
    MAIN resources\views\bladetpl.blade.php
---------------------------------------------
*/
{{$stats->lessons()}}