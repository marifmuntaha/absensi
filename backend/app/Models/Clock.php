<?php

namespace App\Models;

use Database\Factories\ClockFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clock extends Model
{
    /** @use HasFactory<ClockFactory> */
    use HasFactory;

    protected $fillable = [
        'id',
        'start_in',
        'start_out',
        'end_in',
        'end_out',
    ];
}
