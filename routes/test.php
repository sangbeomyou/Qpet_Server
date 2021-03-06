<?php

/*test pages*/
Route::get('/test', function () {
    return view('test');
});
Route::get('/404', function () {
    return view('404');
});
Route::get('/blank', function () {
    return view('blank');
});
Route::get('/buttons', function () {
    return view('buttons');
});
Route::get('/cards', function () {
    return view('cards');
});
Route::get('/charts', function () {
    return view('charts');
});
Route::get('/forgot-password', function () {
    return view('forgot-password');
});
Route::get('/login', function () {
    return view('login');
});
Route::get('/register', function () {
    return view('register');
});
Route::get('/tables', function () {
    return view('tables');
});
Route::get('/utilities-animation', function () {
    return view('utilities-animation');
});
Route::get('/utilities-border', function () {
    return view('utilities-border');
});
Route::get('/utilities-color', function () {
    return view('utilities-color');
});
Route::get('/utilities-other', function () {
    return view('utilities-other');
});
Route::get('/index', function () {
    return view('index');
});
?>
