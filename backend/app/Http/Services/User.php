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
                    'email' => $user['email'],
                    'name'  => $user['name'],
                    'trucks'        => $trucks
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
    public function create($userMail, $userPassword, $name, $trucks){
        $isEmailAlreadyUsed = DB::table('user')
                            ->select('*')
                            ->where('email', '=', $userMail)
                            ->first();

        if($isEmailAlreadyUsed == null){
            $password = $userPassword;
            $user = new \App\Models\User;
            $user->email        = $userMail;
            $user->password     = $password;
            $user->name = $name;
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
            if(isset($user['trucks'])){
                $userData['trucks'] = $trucks;
            }
            $userData['id']           = (string)$user['_id'];
            $userData['email']        = $user['email'];
            $userData['name'] = $user['name'];
            
            return $userData;
        }

        return false;
    }

    public function edit($userId, $userMail, $name, $trucks){
        $user = DB::table('user')
                            ->select('*')
                            ->where('_id', '=', $userId)
                            ->first(); 
        $user->name = $name;
        $user->trucks = $trucks;
        $user->save();
        $userData  = $this->saveDataAfterRegister($userMail);
        return $userData;
    }
}
