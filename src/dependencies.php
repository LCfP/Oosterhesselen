<?php

$container = $app->getContainer();

// Monolog logger
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

$container['view'] = function ($c) {
    return new \Slim\Views\PhpRenderer('templates/');
};

// Service factory for the ORM
$container['db'] = function ($c) {
    $capsule = new \Illuminate\Database\Capsule\Manager;
    $capsule->addConnection($c['settings']['db']);

    $capsule->setAsGlobal();
    $capsule->bootEloquent();

    return $capsule;
};

// This inits the HomeController, to be exposed via '/' in routes.php
$container[\App\Controllers\HomeController::class] = function ($c) {
    $view = $c->get('view');
    $logger = $c->get('logger');

    return new \App\Controllers\HomeController($view, $logger);
};

// This inits the PersonController, to be exposed via '/person/<options>' in routes.php
$container[\App\Controllers\PersonController::class] = function ($c) {
    $logger = $c->get('logger');
    $table = $c->get('db')->table('personen');

    return new \App\Controllers\PersonController($logger, $table);
};

// This inits the RelationController, to be exposed via '/relations/<options>' in routes.php
$container[\App\Controllers\RelationController::class] = function ($c) {
    $logger = $c->get('logger');
    $table = $c->get('db')->table('relaties');

    return new \App\Controllers\RelationController($logger, $table);
};
