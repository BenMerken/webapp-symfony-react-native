<?php

namespace App\Tests\model;

use PDO;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class PDOAssetModelTest extends TestCase
{
    private $connection;

    public function setUp()
    {
        $this->connection = new PDO("sqlite::memory:");
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->connection->exec("DROP TABLE IF EXISTS beers");
        $this->connection->exec(
            "CREATE TABLE assets(
                      id INT, 
                      roomId INT, 
                      name VARCHAR(255),
                      PRIMARY KEY (id))");
        $assets = $this->providerAssets();
        foreach ($assets as $asset) {
            $this->connection->exec("INSERT INTO assets ( id, roomId, name) 
            VALUES ('$asset[0]','$asset[1]','$asset[2]');");
        }
    }


    public function tearDown()
    {
        $this->connection = null;
    }

    private function providerAssets()
    {
        return [
            [223, 443, 'beamer'],
            [224, 444, 'computer'],
            [225, 445, 'router']
        ];
    }
}
