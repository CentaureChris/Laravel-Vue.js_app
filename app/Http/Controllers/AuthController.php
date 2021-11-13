<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use App\models\User;
use Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'=> ['required'],
            'email'=> ['required','email'],
            'password'=> ['required'],
            // 'confirmPassword'=> ['required'],

        ]);

        User::create([
            'id' => $request->id,
            'name'=> $request->name,
            'email'=> $request->email,
            'password'=> $request->password, //Hash::make($request->password), 
        ]);

        return response()->json(['msg' => "Registered Successfully"]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email' ,
            'password' => 'required',
            'device_name' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();

        $pass = User::where('password', $request->password)->first();

    
        if (! $user || !$pass /* !Hash::check($request->password, $user->password)*/) {
            throw ValidationException::withMessages([
                'email' => ['email or password are incorrects'],
            ]);
        }
    
        return $user->createToken($request->device_name)->plainTextToken;
    
    }

    public function getUsers()
    {
        $users = User::all();
        return $users;
    }

    public function deleteUser($id)
    {
        $user = User::find($id)->delete();
        return "ok";
    }
}
