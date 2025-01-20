<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('semesters', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('year_id');
            $table->enum('name', ['1', '2'])->comment('1. Ganjil, 2. Genap');
            $table->date('start');
            $table->date('end');
            $table->enum('active', ['1', '2'])->comment('1. Aktif, 2. Tidak');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('semesters');
    }
};
