<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HolidayResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resource = [
            'id' => $this['id'],
            'semester_id' => $this['semester_id'],
            'name' => $this['name'],
            'date' => $this['date'],
            'description' => $this['description'],
        ];
        return $resource;
    }
}
