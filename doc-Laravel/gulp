/*
**********************************************
    npm with gulp
		if "local gulp not found" then just have to link
		by running "npm link gulp"
**********************************************
*/
/*
---------------------------------------------
    INSTALL GULP GLOBALLY, mush have installed Node.js
---------------------------------------------
*/
npm install -g gulp
/*
---------------------------------------------
    CREATE package.json
---------------------------------------------
*/
{
  "private": true,
  "devDependencies": {
    "gulp": "^3.8.8"
  },
  "dependencies": {
    "laravel-elixir": "^3.0.0",
    "bootstrap-sass": "^3.0.0"
  }
}
/*
---------------------------------------------
    INSTALL gulp PLUGIN, if required
---------------------------------------------
*/
npm install gulp-minify-css --save-dev
npm install gulp-autoprefixer --save-dev
npm install gulp-notify --save-dev
npm install gulp-ruby-sass --save-dev
npm install laravel-elixir --save-dev
/*
---------------------------------------------
    CREATE gulpfile.js
---------------------------------------------
*/
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var sass = require('gulp-ruby-sass');

var elixir = require('laravel-elixir');
gulp.task('css', function(){
    return gulp.src('css/main.css')
		.pipe(sass({style:'compressed'}))
    .pipe(autoprefixer())//last 1 version
    //.pipe(minifycss())
    .pipe(gulp.dest('css/min'))
		.pipe(notify({message:'All done, master!'}));
});

gulp.task('default', function(){
    gulp.run('css');
    gulp.watch('css/*.css',function(){
        gulp.run('css');
    });
});
/*
---------------------------------------------
    #TASK by commandline
---------------------------------------------
*/
gulp css