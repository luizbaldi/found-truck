<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Services\User;

class User extends Controller {
	
	protected $userService;

	public function __construct(User $userService){
		$this->userService = $userService;
	}

	public function create(Request $request){
		$responseContent = array();
		try{
			$userData = $request->all();
			if (!empty($userData)) {
				$trucks 	  = null;
			    $personalData = null;
		        if(isset($userData['trucks'])){
		       	 	$trucks   = $userData['trucks'];	
		        }
		        if(isset($userData['personalData'])){
		       	 	$personalData = $userData['personalData'];	
		        }
				$email     	  = $userData['email'];
			    $password  	  = md5($userData['password']);
			   
			   	//Contains user data or false
				$ableToRegister = $this->userService->register($email, $password, $personalData, $trucks);

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

	public function edit(Request $request){
		$responseContent = array();
		try{
			$userData = $request->all();
			if (!empty($userData)) {
				$trucks 	  = null;
			    $personalData = null;
		        if(isset($userData['trucks'])){
		       	 	$trucks   = $userData['trucks'];	
		        }
		        if(isset($userData['personalData'])){
		       	 	$personalData = $userData['personalData'];	
		        }
				$email     	  = $userData['email'];
			    $password  	  = md5($userData['password']);
			   	$userData     = $this->userService->edit($email, $password, $personalData, $trucks);
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
			$userMail = $userData['login'];
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