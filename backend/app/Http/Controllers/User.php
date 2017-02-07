<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Services\User as UserService;

class User extends Controller {
	
	protected $userService;

	public function __construct(UserService $userService){
		$this->userService = $userService;
	}

	public function create(Request $request){
		$responseContent = array();
		try{
			$userData = $request->all();
			if (!empty($userData)) {
				$trucks 	  = null;
			    $name = null;
		        if(isset($userData['trucks'])){
		       	 	$trucks   = $userData['trucks'];	
		        }
				$email     	  = $userData['email'];
			    $password  	  = md5($userData['password']);
			    $name         = $userData['name'];

			   	//Contains user data or false
				$ableToRegister = $this->userService->create($email, $password, $name, $trucks);

				if($ableToRegister){
					$responseContent['error']    = false;
	    	        $responseContent['message']  = 'User registered.';
	    	        $responseContent['userData'] = $ableToRegister;
				} else {
					$responseContent['error']   = true;
    				$responseContent['message'] = 'Email already registered.';
				}
			} else {
				$responseContent['error']   = true;
    			$responseContent['message'] = 'Register failed.';
			}
		}catch(\Exception $e){
			$responseContent['error']   = true;
    		$responseContent['message'] = $e->getMessage();
		}

		$response = new Response($responseContent);
		return $response;
	}

	 public function delete(Request $request){
        $responseContent = array();
        try {
            $user = $request->all();
            if(!empty($user)){
                $userId    = $user['_id'];
                $this->userService->delete($userId);
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

	public function edit(Request $request){
		$responseContent = array();
		try{
			$userData = $request->all();
			if (!empty($userData)) {
				$trucks 	  = null;
		        if(isset($userData['trucks'])){
		       	 	$trucks   = $userData['trucks'];	
		        }
				$email     	  = $userData['email'];
			    $password  	  = md5($userData['password']);
			    $name         = $userData['name'];
			   	$userData     = $this->userService->edit($email, $password, $name, $trucks);
				$responseContent['error']    = false;
    	        $responseContent['message']  = 'User edited.';
    	        $responseContent['userData'] = $userData;
			} else {
				$responseContent['error']   = true;
    			$responseContent['message'] = 'Edition failed.';
			}
		}catch(\Exception $e){
			$responseContent['error']   = true;
    		$responseContent['message'] = $e->getMessage();
		}

		$response = new Response($responseContent);
		return $response;
	}

	public function login(Request $request){
		$responseContent = array();

		try{
			$userData = $request->all();
			$userMail = $userData['email'];
			$userPassword = $userData['password'];

			//Contains user data or false
			$attemptLogin = $this->userService->login($userMail, $userPassword);
			if($attemptLogin){
				$responseContent['error']   = false;
		        $responseContent['message'] = 'Login successful.';
		        $responseContent['userData'] = $attemptLogin;
			} else {
				$responseContent['error']   = true;
		        $responseContent['message'] = 'User or password invalid.';
			}
		}catch(\Exception $e){
			$responseContent['error']   = true;
    		$responseContent['message'] = $e->getMessage();
		}

		$response = new Response($responseContent);
		return $response;
	}

}