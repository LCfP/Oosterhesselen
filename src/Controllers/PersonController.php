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
        if (!strpos($args['id'], '.')) { // will never be zero.
            $person = $this->table->find((int) $args['id']);
        } else {
            $person = $this->table->where('ID-nr', '=', $args['id'])->get();
        }

        return $response->withJson($person ?: "");
    }

    public function getPersons(Request $request, Response $response, $args)
    {
        // TODO
    }
}
