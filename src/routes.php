<?php

// retrieves full data for a person with ID {id}.
$app->get('/person/{pagination}/{amount}', function ($request, $response, $args) {
    $this->logger->info("'/person/', p. {$args['pagination']}, no. {$args['amount']} | ");

    echo $args['pagination'];
});

// retrieves full data for a person with ID {id}.
$app->get('/person/{id}', function ($request, $response, $args) {
    $this->logger->info("'/person/', id. {$args['id']} | ");

    echo $args['id'];
});
