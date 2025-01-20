<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePresentRequest extends FormRequest
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
            'teacher_id' => 'required',
            'date' => 'required',
            'in' => 'required',
            'out' => 'required',
            'status' => 'required',
            'description' => 'nullable',
            'letter' => 'nullable',
        ];
    }

    public function attributes(): array
    {
        return [
            'teacher_id' => 'ID Guru',
            'date' => 'Tanggal',
            'in' => 'Jam Masuk',
            'out' => 'Jam Keluar',
            'status' => 'Status',
            'description' => 'Diskripsi',
            'letter' => 'Surat',
        ];
    }
}
