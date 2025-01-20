<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class SemesterResource extends JsonResource
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
            'year_id' => $this['year_id'],
            'name' => $this['name'],
            'start' => $this['start'],
            'end' => $this['end'],
            'active' => $this['active'],
        ];
        if ($request->has('with')){
            $with = explode(',', $request->with);
            $with = count($with) > 1 ? $with : [$request->with];
            if (in_array('year', $with)){
                $resource = Arr::add($resource, 'year', new YearResource($this->year));
            }
        }
        return $resource;
    }
}
