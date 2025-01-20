<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SemesterCreateOrUpdateEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public object $semester;

    /**
     * Create a new event instance.
     */
    public function __construct($semester)
    {
        $this->semester = $semester;
    }
}
