<?php

$app->group('/person', function ()
{
    // retrieves full data for a person with ID {id}.
    $this->get('/{pagination}/{amount}', \App\Controllers\PersonController::class . ':getPersons');

    // retrieves full data for a person with ID {id}.
    $this->get('/{id}', \App\Controllers\PersonController::class . ':getPerson');
});
