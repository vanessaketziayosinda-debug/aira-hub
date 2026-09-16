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
    Schema::create('requirements', function (Blueprint $table) {
        $table->id();

        $table->string('title');
        $table->string('company');
        $table->string('category');
        $table->string('budget')->nullable();
        $table->string('location')->nullable();

        $table->text('description');

        $table->string('status')->default('open');

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requirements');
    }
};
