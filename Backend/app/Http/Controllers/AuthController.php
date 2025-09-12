<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    // -----------------------------
    // Auth İşlemleri
    // -----------------------------
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'sifre' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->sifre, $user->sifre)) {
            return response()->json(['error' => 'Email veya şifre hatalı'], 401);
        }

        try {
            $token = JWTAuth::fromUser($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'JWT oluşturulurken hata'], 500);
        }

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
            'user' => [
                'id'       => (string) $user->_id,
                'ad_soyad' => $user->ad_soyad,
                'email'    => $user->email,
                'rol'      => $user->rol,
            ]
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ad_soyad' => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users,email',
            'sifre'    => 'required|string|min:6',
            'rol'      => 'required|in:admin,user',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toArray(), 400);
        }

        $user = User::create([
            'ad_soyad' => $request->ad_soyad,
            'email'    => $request->email,
            'sifre'    => Hash::make($request->sifre),
            'rol'      => $request->rol,
            'aktif_mi' => true,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message'       => 'Kullanıcı başarıyla oluşturuldu',
            'user'          => $user,
            'authorization' => [
                'token' => $token,
                'type'  => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Başarıyla çıkış yapıldı']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function userProfile()
    {
        $user = auth()->user();
        $user->_id = (string) $user->_id;
        return response()->json($user);
    }

    protected function respondWithToken($token)
    {
        $user = auth()->user();
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60,
            'user' => [
                'id'       => (string) $user->_id,
                'ad_soyad' => $user->ad_soyad,
                'email'    => $user->email,
                'rol'      => $user->rol,
            ]
        ]);
    }

    // -----------------------------
    // Profil Güncelleme & Şifre
    // -----------------------------
    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'ad_soyad' => 'sometimes|string|max:255',
            'email'    => 'sometimes|email|unique:users,email,' . $user->_id,
            'telefon'  => 'nullable|string|max:20',
        ]);

        $user->update($validated);

        $user->_id = (string) $user->_id;

        return response()->json([
            'message' => 'Profil güncellendi',
            'user'    => $user
        ]);
    }

    public function changePassword(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'currentPassword' => 'required|string',
            'newPassword'     => 'required|string|min:6|confirmed',
        ]);

        if (!Hash::check($request->currentPassword, $user->sifre)) {
            return response()->json(['error' => 'Mevcut şifre yanlış'], 400);
        }

        $user->sifre = Hash::make($request->newPassword);
        $user->save();

        return response()->json(['message' => 'Şifre başarıyla güncellendi']);
    }

    // -----------------------------
    // Admin İşlemleri (CRUD)
    // -----------------------------
    public function getAllUsers()
    {
        $users = User::all()->map(function ($user) {
            $user->_id = (string) $user->_id;
            return $user;
        });

        return response()->json($users);
    }

    public function getUser($id)
    {
        $user = User::where('_id', $id)->first();
        if (!$user) return response()->json(['error' => 'Kullanıcı bulunamadı'], 404);

        $user->_id = (string) $user->_id;
        return response()->json($user);
    }

    public function createUser(Request $request)
    {
        $validated = $request->validate([
            'ad_soyad' => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'sifre'    => 'required|string|min:6',
            'rol'      => 'required|in:admin,user'
        ]);

        $user = User::create([
            'ad_soyad' => $validated['ad_soyad'],
            'email'    => $validated['email'],
            'sifre'    => Hash::make($validated['sifre']),
            'rol'      => $validated['rol'],
            'aktif_mi' => true,
        ]);

        $user->_id = (string) $user->_id;
        return response()->json($user, 201);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::where('_id', $id)->first();
        if (!$user) return response()->json(['error' => 'Kullanıcı bulunamadı'], 404);

        $validated = $request->validate([
            'ad_soyad' => 'sometimes|string|max:255',
            'email'    => 'sometimes|email|unique:users,email,' . $id,
            'sifre'    => 'sometimes|string|min:6',
            'rol'      => 'sometimes|in:admin,user'
        ]);

        if (isset($validated['sifre'])) {
            $validated['sifre'] = Hash::make($validated['sifre']);
        }

        $user->update($validated);

        $user->_id = (string) $user->_id;
        return response()->json($user);
    }

    public function deleteUser($id)
    {
        $user = User::where('_id', $id)->first();
        if (!$user) return response()->json(['error' => 'Kullanıcı bulunamadı'], 404);

        $user->delete();
        return response()->json(['message' => 'Kullanıcı silindi']);
    }
}
