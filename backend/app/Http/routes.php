<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
// -- Truck routes
Route::group(array('prefix' => 'truck'), function()
{
	Route::get('/getAll', 'FoodTruck@getAll');
	Route::post('/getAll', 'FoodTruck@getAll');
	Route::post('/create', 'FoodTruck@create');
	Route::post('/delete', 'FoodTruck@delete');
	Route::post('/edit', 'FoodTruck@edit');
});
// -- user routes
Route::post('/login', 'User@login');
Route::group(array('prefix' => 'user'), function()
{
	Route::post('/create', 'User@create');
	Route::post('/edit', 'User@edit');
	Route::post('/delete', 'User@delete');
});

