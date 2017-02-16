<?php

// retrieves full data for a person with ID {id}.
$app->get('/person/{id}', function ($request, $response, $args) {
    $this->logger->info("'/person/" . $args['id'] . "'");

    echo $args['id'];
});

