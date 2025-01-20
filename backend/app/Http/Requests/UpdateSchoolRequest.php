<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSchoolRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'email' => 'required|email',
            'image' => 'mimes:jpg,jpeg,png|max:512',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama Sekolah',
            'phone' => 'Nomor Telepon',
            'address' => 'Alamat',
            'email' => 'Alamat Email',
            'image' => 'Logo Sekolah',
        ];
    }
}
