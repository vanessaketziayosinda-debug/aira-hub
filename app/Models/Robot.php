<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Robot extends Model
{
    protected $fillable = [
        'name',
        'description',
        'category',
        'price',
        'is_active',
    ];
}
