<?php

namespace App\Http\Controllers;

use App\Models\Cihaz;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // Dashboard özet verileri
    public function stats()
    {
        $totalDevices  = Cihaz::count();
        $activeDevices = Cihaz::where('durum', 'aktif')->count();   // 'durum' kolonun varsa
        $qrReadsToday  = Cihaz::whereDate('created_at', now()->toDateString())->count(); // şimdilik günlük eklenen cihaz sayısı

        $totalUsers    = User::count();
        $adminCount    = User::where('rol', 'admin')->count();
        $userCount     = User::where('rol', 'user')->count();

        return response()->json([
            'total_devices'   => $totalDevices,
            'active_devices'  => $activeDevices,
            'qr_reads_today'  => $qrReadsToday,
            'total_users'     => $totalUsers,
            'admin_count'     => $adminCount,
            'user_count'      => $userCount,
        ]);
    }

    // Son 5 aktivite
    public function recentActivity()
    {
        $recentDevices = Cihaz::latest()->take(5)->get()->map(function ($c) {
            return [
                'message' => 'Cihaz eklendi: '.$c->ad,
                'time'    => $c->created_at->diffForHumans()
            ];
        });

        return response()->json($recentDevices);
    }
}
