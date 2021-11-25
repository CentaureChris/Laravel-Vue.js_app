<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function getClients()
    {
        $clients = Client::all();
        return $clients;
    }

    public function saveClient(Request $request)
    {
        $client = new Client;
        $client->id = $request->id;
        $client->firstname = $request->firstname;
        $client->lastname = $request->lastname;
        $client->email = $request->email;
        $client->tel = $request->tel;
        $client->adresse = $request->adresse;
        $client->codePostal = $request->codePostal;
        $client->ville = $request->ville;
        $client->commentaire = $request->commentaire;

        if($client->save()) {
            return response()->json($client);
        }else{
            return response ()->json(['status' => false, 'message' => 'There is some problem. please try again']);
        }
    }

    public function deleteClient($id)
    {
        // {{ AuthController::isLogged(); }}
        $client = Client::find($id)->delete();
        return "ok";
    }

    public function editClient($id)
    {
        $client = Client::find($id);
        return response()->json($client);
    }

    public function updateClient()
    {
        $client = Client::find(request()->id);
        $client->lastname = request()->lastname;
        $client->firstname = request()->firstname; 
        $client->email = request()->email; 
        $client->tel = request()->tel; 
        $client->adresse = request()->adresse; 
        $client->codePostal = request()->codePostal; 
        $client->ville = request()->ville; 
        $client->commentaire = request()->commentaire; 
        $client->update();
        return "ok";
    }
}
