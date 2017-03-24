<?php

$app->get('/', \App\Controllers\HomeController::class);

$app->group('/person', function ()
{
    // retrieves children for person with ID {id}.
    $this->get('/children/{id}', \App\Controllers\PersonController::class . ':getChildren');

    // retrieves list of persons, indexed to page {pagination}, by amount {amount}.
    $this->post('/{pagination}/{amount}', \App\Controllers\PersonController::class . ':getPersons');

    // retrieves full data for a person with ID {id}.
    $this->get('/{id}', \App\Controllers\PersonController::class . ':getPerson');
});

$app->group('/relation', function ()
{
    // retrieves full marriage data for a person with ID {id}.
    $this->get('/{id}', \App\Controllers\RelationController::class . ':getRelations');
});
