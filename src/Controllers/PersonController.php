<?php

namespace App\Controllers;

use Psr\Log\LoggerInterface;
use Illuminate\Database\Query\Builder;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;


class PersonController
{
    private $logger;
    protected $table;

    public function __construct(LoggerInterface $logger, Builder $table)
    {
        $this->logger = $logger;
        $this->table = $table;
    }

    public function getPerson(Request $request, Response $response, $args)
    {
        $this->logger->info("'/person/{$args['id']}' | ");

        if (!strpos($args['id'], '.')) { // will never be zero.
            $person = $this->table->find((int) $args['id']);
        } else {
            $person = $this->table->where('ID-nr', '=', $args['id'])->get();
        }

        return $response->withJson($person ?: "");
    }

    public function getPersons(Request $request, Response $response, $args)
    {
        $this->logger->info("'/person/{$args['pagination']}/{$args['amount']}' | ");

        $filters = $request->getParam('filters');
        $persons = $this->table;

        if ($filters) {
            $persons = $persons->where(function($query) use ($filters) {
                foreach ($filters as $column => $value) {
                    if ($value) {
                        $query->where($column, 'LIKE', "%$value%");
                    }
                }
            });
        }

        return $response->withJson($persons->simplePaginate(
            (int) $args['amount'],
            ['*'],
            'page',
            (int) $args['pagination']
        ) ?: "");
    }
}
