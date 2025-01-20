<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTeacherRequest extends FormRequest
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
            'user_id' => 'required|int',
            'name' => 'required|string',
            'nip' => 'required|string',
            'nuptk' => 'required|string|unique:teachers,nuptk',
            'gender' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'image' => 'nullable|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'user_id' => 'ID Pengguna',
            'name' => 'Nama Lengkap',
            'nip' => 'NIP',
            'nuptk' => 'NUPTK',
            'gender' => 'Jenis Kelamin',
            'phone' => 'Telepon',
            'address' => 'Alamat',
            'image' => 'Gambar',
        ];
    }
}
