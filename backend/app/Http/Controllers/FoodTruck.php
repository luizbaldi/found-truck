<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Services\FoodTruck;

class FoodTruck extends Controller {	
	
    protected $foodTruckService;

	public function __construct(FoodTruck $foodTruckService){
		$this->$foodTruckService = $foodTruckService;
	}
    
    public function create(Request $request){
        $responseContent = array();

    	try{
            $truck   = $request->all();
            if(!empty($truck)){
                $title     = $truck['title'];
		        $longitude = $truck['longitude'];
		        $latitude  = $truck['latitude'];
                $type      = null;
                if(isset($truck['type'])){
                   $type      = $truck['type'];
                }
                $this->foodTruckService->create($title, $longitude, $latitude, $type);
                $responseContent['error']   = false;
    	        $responseContent['message'] = 'FoodTruck has been saved';
        	} else{
    			$responseContent['error']   = true;
    			$responseContent['message'] = 'Any data sent';
    		}
    	}catch(\Exception $e){
    		$responseContent['error']   = true;
    		$responseContent['message'] = $e->getMessage();
    	}

    	$response = new Response($responseContent);
    	return $response;
    }

    public function getAll(Request $request){
    	$responseContent = array();
        try {
    		$trucks = $this->foodTruckService->getAll();
            $responseContent['error']   = false;
            $responseContent['message'] = 'OK';
            $responseContent['data']    = $trucks;
        } catch(\Exception $e) {
            $responseContent['error']   = true;
            $responseContent['message'] = $e->getMessage();
            $responseContent['data']    = array();
        }
        $response = new Response($responseContent);
        return $response;
    }

    public function delete(Request $request){
        $responseContent = array();
        try {
            $truck = $request->all();
            if(!empty($truck)){
                $truckId    = $truck['_id'];
                $this->foodTruckService->delete($truckId);
                $responseContent['error']   = false;
                $responseContent['message'] = 'Truck has been removed.';
            }else{
                $responseContent['error']   = true;
                $responseContent['message'] = 'Any data sent.';
            }
        } catch(\Exception $e) {
            $responseContent['error']   = true;
            $responseContent['message'] = $e->getMessage();
        }
        $response = new Response($responseContent);
        return $response;
    }

    public function edit(Request){
        $responseContent = array();
        try {
            $truck = $request->all();
            if(!empty($truck)){
                $truckId   = $truck['_id'];
                $title     = $truck['title'];
                $longitude = $truck['longitude'];
                $latitude  = $truck['latitude'];
                $type      = null;
                if(isset($truck['type'])){
                   $type      = $truck['type'];
                }
                $this->foodTruckService->edit($truckId,$title,$longitude,$latitude,$type);
                $responseContent['error']   = false;
                $responseContent['message'] = 'Truck has been edited.';
            }else{
                $responseContent['error']   = true;
                $responseContent['message'] = 'Any data sent.';
            }
        } catch(\Exception $e) {
            $responseContent['error']   = true;
            $responseContent['message'] = $e->getMessage();
        }
        $response = new Response($responseContent);
        return $response;
    }
}
