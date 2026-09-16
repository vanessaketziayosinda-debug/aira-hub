<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SolutionOffer extends Model
{
    protected $fillable = [
        'requirement_id',
        'user_id',
        'title',
        'description',
        'price',
        'delivery_time',
        'status',
    ];

    public function requirement(): BelongsTo
    {
        return $this->belongsTo(Requirement::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
