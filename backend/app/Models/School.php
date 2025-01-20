<?php

namespace App\Models;

use Database\Factories\SchoolFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    /** @use HasFactory<SchoolFactory> */
    use HasFactory;
    protected $fillable = ['id', 'name', 'address', 'phone', 'email', 'logo'];
}
