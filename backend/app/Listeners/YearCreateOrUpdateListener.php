<?php

namespace App\Listeners;

use App\Events\YearCreateOrUpdateEvent;
use App\Models\Year;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class YearCreateOrUpdateListener
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
    public function handle(YearCreateOrUpdateEvent $event): void
    {
        if ($event->year->active == '1'){
            $years = Year::get();
            foreach ($years as $year) {
                if ($year->id != $event->year->id) {
                    $year->update(['active' => '2']);
                }
            }
        }
    }
}
