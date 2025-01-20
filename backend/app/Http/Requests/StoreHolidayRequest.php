<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreHolidayRequest extends FormRequest
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
            'semester_id' => 'required|integer',
            'name' => 'required|string',
            'date' => 'required|string',
            'description' => 'nullable',
        ];
    }

    public function attributes(): array
    {
        return [
            'semester_id' => 'ID Semester',
            'name' => 'Nama Hari',
            'date' => 'Tanggal',
            'description' => 'Diskripsi',
        ];
    }
}
