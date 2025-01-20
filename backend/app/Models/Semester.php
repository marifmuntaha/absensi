<?php

namespace App\Models;

use App\Events\SemesterCreateOrUpdateEvent;
use Database\Factories\SemesterFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    /** @use HasFactory<SemesterFactory> */
    use HasFactory;

    protected static function boot(): void
    {
        parent::boot();

        static::created(function ($semester) {
            event(new SemesterCreateOrUpdateEvent($semester));
        });

        static::updated(function ($semester) {
            event(new SemesterCreateOrUpdateEvent($semester));
        });
    }

    protected $fillable = [
        'id', 'year_id', 'name', 'start', 'end', 'active'
    ];

    public function year(): object
    {
        return $this->hasOne(Year::class, 'id', 'year_id');
    }
}
