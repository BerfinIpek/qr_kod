<?php

namespace App\Models;

use MongoDB\Laravel\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'users';

    protected $primaryKey = '_id'; // MongoDB’de id alanı
    public $incrementing = false;  // MongoDB ObjectId auto increment değil
    protected $keyType = 'string'; // ObjectId string olarak tutuluyor

    protected $fillable = [
        'ad_soyad',
        'email',
        'sifre',
        'rol',
        'aktif_mi',
        'olusturma_tarihi',
        'guncelleme_tarihi',
    ];

    protected $hidden = [
        'sifre',
        'remember_token',
    ];

    /**
     * Authentication için şifre alanını belirt.
     */
    public function getAuthPassword()
    {
        return $this->sifre;
    }

    public function getAuthPasswordName()
    {
        return 'sifre';
    }

    /**
     * JWT Identifier
     */
    public function getJWTIdentifier()
    {
        return $this->getKey(); // _id döner
    }

    /**
     * JWT custom claims
     */
    public function getJWTCustomClaims()
    {
        return [
            'rol' => $this->rol,
            'ad_soyad' => $this->ad_soyad,
        ];
    }

    /**
     * Casts
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'sifre' => 'hashed',
        ];
    }
}
