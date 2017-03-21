<?php

$app->get('/', \App\Controllers\HomeController::class);

$app->group('/person', function ()
{
    // retrieves full data for a person with ID {id}.
    $this->post('/{pagination}/{amount}', \App\Controllers\PersonController::class . ':getPersons');

    // retrieves full data for a person with ID {id}.
    $this->get('/{id}', \App\Controllers\PersonController::class . ':getPerson');
});

$app->group('/relations', function ()
{
    // retrieves full data for a person with ID {id}.
    $this->get('/{id}', \App\Controllers\RelationController::class . ':getRelations');
});
