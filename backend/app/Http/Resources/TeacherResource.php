<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class TeacherResource extends JsonResource
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
            'user_id' => $this['user_id'],
            'name' => $this['name'],
            'nip' => $this['nip'],
            'nuptk' => $this['nuptk'],
            'gender' => $this['gender'],
            'phone' => $this['phone'],
            'address' => $this['address'],
            'image' => $this['image'],
            'qrcode' => asset('storage/public/images/qr/' . $this['id'] . '.png'),
            'user' => new UserResource($this->user),
        ];
        if ($request->has('with')) {
            $with = explode(',', $request->with);
            $with = count($with) > 1 ? $with : [$request->with];
            if (in_array('present', $with)){
                $resource = Arr::add($resource, 'present', PresentResource::collection($this->present));
            }
        }
        return $resource;
    }
}
