<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solution_offers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('requirement_id')
                ->constrained('requirements')
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('title');
            $table->text('description');
            $table->string('price')->nullable();
            $table->string('delivery_time')->nullable();

            $table->string('status')->default('pending');

            $table->timestamps();

            $table->unique(['requirement_id', 'user_id']);
            $table->index(['requirement_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solution_offers');
    }
};
