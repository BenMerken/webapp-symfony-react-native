<?php

namespace App\Model;


use PDO;

class Connection
{
    private $pdo;

    public function __construct($dsn, $user = null, $password = null)
    {
        $this->pdo = new \PDO($dsn, $user, $password);
        $this->pdo->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );
    }

    public function getPDO()
    {
        return $this->pdo;
    }
}
