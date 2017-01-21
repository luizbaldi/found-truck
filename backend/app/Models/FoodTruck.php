<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Hydrant extends Eloquent
{
    /**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $collection = 'foodtruck';
	protected $connection = 'mongodb';

	protected $fillable = ['title','latitude','longitude','type'];
	
}
