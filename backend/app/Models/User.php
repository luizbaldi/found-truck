<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class User extends Eloquent
{
    /**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $collection = 'user';
	protected $connection = 'mongodb';

	protected $fillable = ['email', 'password', 'personalData', 'trucks'];
	
}
