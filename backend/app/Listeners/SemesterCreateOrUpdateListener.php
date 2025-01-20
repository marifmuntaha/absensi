<?php

namespace App\Listeners;

use App\Events\SemesterCreateOrUpdateEvent;
use App\Models\Semester;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SemesterCreateOrUpdateListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SemesterCreateOrUpdateEvent $event): void
    {
        if ($event->semester->active == '1'){
            $semesters = Semester::get();
            foreach ($semesters as $semester) {
                if ($semester->id != $event->semester->id) {
                    $semester->update(['active' => '2']);
                }
            }
        }
    }
}
