<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'username' => 'required|unique:users,username|string',
            'password' => 'required|string|confirmed',
            'email' => 'required|string',
            'role' => 'required|int',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama Lengkap',
            'username' => 'Nama Pengguna',
            'password' => 'Kata Sandi',
            'email' => 'Alamat Email',
            'role' => 'Hak Akses',
        ];
    }
}
