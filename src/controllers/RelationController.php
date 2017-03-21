<?php

namespace App\Controllers;

use Psr\Log\LoggerInterface;
use Illuminate\Database\Query\Builder;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;


class RelationController
{
    private $logger;
    protected $table;

    public function __construct(LoggerInterface $logger, Builder $table)
    {
        $this->logger = $logger;
        $this->table = $table;
    }

    public function getRelations(Request $request, Response $response, $args)
    {
        $this->logger->info("'/relations/{$args['id']}' | ");

        $relations = $this->table->where('Vrouw', '=', $args['id'])
            ->orWhere('Man', '=', $args['id'])->get();

        return $response->withJson($relations ?: "");
    }
}
