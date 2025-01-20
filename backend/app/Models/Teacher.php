<?php

namespace App\Models;

use Database\Factories\TeacherFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    /** @use HasFactory<TeacherFactory> */
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'name',
        'nip',
        'nuptk',
        'gender',
        'phone',
        'address',
        'image',
        'qrcode'
    ];

    public function user(): object
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function present(): object
    {
        return $this->hasMany(Present::class, 'teacher_id', 'id');
    }
}
