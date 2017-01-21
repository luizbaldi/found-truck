<?php

namespace App\Http\Services;
use MongoDB\BSON\ObjectId; 

class FoodTruck {

  const REPORT_INVALID_LIMIT = 3;
	public function __construct(){

	}
  
    public function create($title, $longitude, $latitude, $type){
        $truck = new \App\Models\FoodTruck;
        $truck->title        = $title;
        $truck->latitude     = $latitude;
        $truck->longitude    = $longitude;
        $truck->$type        = $type;
        $truck->save();
    }

    public function getAll(){
    	return \App\Models\FoodTruck::all();
    } 

    public function delete($truckId){
        $truck = \App\Models\FoodTruck::find($truckId);
        $truck->delete();
    }  

    public function edit($truckId,$title,$longitude,$latitude,$type){
        $truck = \App\Models\FoodTruck::find($truckId);
        if(!empty($truck)){
            $truck['longitude'] = $longitude;
            $truck['latitude']  = $latitude;
            $truck['title']     = $title;
            $truck['type']      = $type;
        }
        $truck->delete();
    }
}
