<?php


// Route::get('/', 'WelcomeController@index');
Route::get('/', function()
{
    return File::get(public_path() . '/angular.html');
});

Route::get('/analysis', function()
{
    return File::get(public_path() . '/analysis.html');
});

Route::get('stats/{id?}', 'HomeController@stats');

Route::group(array('prefix' => 'api'), function(){
	Route::get('campings', 'CampingsController@index');
	Route::get('nolodgings', 'NoLodgingsController@index');
	Route::get('lodgings', 'LodgingsController@index');
});

Route::group(array('prefix' => 'search'), function(){
	Route::get('', 'CampingsController@all');
	Route::get('campings', 'CampingsController@index');
	Route::get('nolodgings', 'NoLodgingsController@index');
	Route::get('lodgings', 'LodgingsController@index');
});

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
