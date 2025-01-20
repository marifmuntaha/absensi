<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSemesterRequest extends FormRequest
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
            'year_id' => 'required|int',
            'name' => 'required|string',
            'start' => 'required|date',
            'end' => 'required|date',
            'active' => 'required|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'year_id' => 'ID Tahun',
            'name' => 'Nama Semester',
            'start' => 'Tanggal Mulai',
            'end' => 'Tanggal Selesai',
        ];
    }
}
