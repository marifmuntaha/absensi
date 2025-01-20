<?php

namespace App\Models;

use Database\Factories\HolidayFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    /** @use HasFactory<HolidayFactory> */
    use HasFactory;
    protected $fillable = [
        'id',
        'semester_id',
        'name',
        'date',
        'description',
    ];

    public function semester(): object
    {
        return $this->hasOne(Year::class, 'id', 'semester_id');
    }
}
