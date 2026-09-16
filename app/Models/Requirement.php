<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Requirement extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'company',
        'category',
        'budget',
        'location',
        'description',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function solutionOffers(): HasMany
    {
        return $this->hasMany(SolutionOffer::class);
    }
}
