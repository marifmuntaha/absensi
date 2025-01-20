<?php

namespace App\Models;

use Database\Factories\WorkFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    /** @use HasFactory<WorkFactory> */
    use HasFactory;

    protected $fillable = [
        'id',
        'day',
        'in',
        'out'
    ];
}
