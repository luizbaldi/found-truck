<?php

namespace App\Http\Services;
use Illuminate\Support\Facades\DB;
use MongoDB\BSON\ObjectId; 

class User {
	public function __construct(){

	}
  
    public function login($userMail, $userPassword){
        $user = new \App\Models\User;
        $user = DB::table('user')
                            ->select('*')
                            ->where('email', '=', $userMail)
                            ->first();


        if($user){
            $password = $user['password'];
            $encryptedUserPassword = md5($userPassword);
            $trucks   = null;
            if(isset($user['trucks'])){
                $trucks = $user['trucks'];
            }
            if($encryptedUserPassword == $password){
                $userData = array(
                    'id' => (string)$user['_id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'personalData'  => $user['personalData'];
                    'trucks'        => $trucks;
                );
                return $userData;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    public function delete($userId){
        $user = \App\Models\User::find($userId);
        $user->delete();
    } 
    public function create($userName, $userMail, $userPassword, $personalData, trucks){
        $isEmailAlreadyUsed = DB::table('user')
                            ->select('*')
                            ->where('email', '=', $userMail)
                            ->first();

        if($isEmailAlreadyUsed == null){
            $password = md5($userPassword);
            $user = new \App\Models\User;
            $user->name         = $userName;
            $user->email        = $userMail;
            $user->password     = $password;
            $user->personalData = $personalData;
            if($trucks != null){
                $user->$trucks = $trucks;
            }
            $user->save();
            $userData  = $this->saveDataAfterRegister($userMail);
            return $userData;
        }
        return false;
    }

    public function saveDataAfterRegister($userEmail){
        $user = DB::table('user')
                            ->select('*')
                            ->where('email', '=', $userEmail)
                            ->first();

        if(!empty($user)){
            $userData     = array();
            $personalData = array();
            if(isset($user['trucks']){
                $userData['trucks'] = $trucks;
            }
            $userData['id']           = (string)$user['_id'];
            $userData['email']        = $user['email'];
            $userData['personalData'] = $user['personalData'];
            
            return $userData;
        }

        return false;
    }

    public function edit($userName, $userMail, $userPassword, $personalData, trucks){
        $user = DB::table('user')
                            ->select('*')
                            ->where('email', '=', $userMail)
                            ->first();
        if($user){                  
            if($password != null){
                $user->password = md5($userPassword);
            }    
        }   
        $user->personalData = $personalData;
        $user->trucks       = $trucks;
        $user->save();
        $userData  = $this->saveDataAfterRegister($userMail);
        return $userData;
    }
}
