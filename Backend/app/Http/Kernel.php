<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $routeMiddleware = [
        // ✅ Senin eklediklerin
        'admin' => \App\Http\Middleware\AdminMiddleware::class,
        'user'  => \App\Http\Middleware\UserMiddleware::class,
    ];
}
