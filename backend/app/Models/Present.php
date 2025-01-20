<?php

namespace App\Models;

use Database\Factories\PresentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Present extends Model
{
    /** @use HasFactory<PresentFactory> */
    use HasFactory;

    protected $fillable = [
        'id',
        'teacher_id',
        'date',
        'in',
        'out',
        'status',
        'description',
        'letter'
    ];
}
