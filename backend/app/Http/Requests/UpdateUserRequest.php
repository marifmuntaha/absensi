<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'id' => 'required|int',
            'name' => 'required|string',
            'username' => 'required|string',
            'password' => 'nullable|string|confirmed:',
            'email' => 'required|string',
            'role' => 'required|int',
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID',
            'name' => 'Nama Lengkap',
            'username' => 'Nama Pengguna',
            'password' => 'Kata Sandi',
            'email' => 'Alamat Email',
            'role' => 'Hak Akses',
        ];
    }
}
