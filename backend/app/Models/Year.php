<?php

namespace App\Models;

use App\Events\YearCreateOrUpdateEvent;
use Database\Factories\YearFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    /** @use HasFactory<YearFactory> */
    use HasFactory;

    protected $fillable =[
        'id',
        'name',
        'description',
        'active',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::created(function ($year) {
            event(new YearCreateOrUpdateEvent($year));
        });

        static::updated(function ($year) {
            event(new YearCreateOrUpdateEvent($year));
        });
    }
}
