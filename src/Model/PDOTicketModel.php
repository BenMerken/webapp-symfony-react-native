<?php


namespace App\Model;


use InvalidArgumentException;

class PDOTicketModel implements TicketModel
{
    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function createTicketWithDescription($nameAsset, $description)
    {
        $this->validateNameAsset($nameAsset);
        //Get id of asset out of database by using the name of the asset
        $this->validateNameAsset($nameAsset);
        $pdo = $this->connection->getPDO();
        $statement = $pdo->prepare('SELECT id from assets WHERE assetName=:nameAsset');
        $statement->bindParam(':nameAsset', $nameAsset, \PDO::PARAM_STR);
        $statement->execute();
        $assetId = $statement->fetchColumn();

        if ($assetId !== null) {
            //insert ticket with description
            $statement = $pdo->prepare('INSERT INTO tickets (assetId, description)
                                              VALUES (:assetId,:description)');
            $statement->bindParam(':assetId', $assetId, \PDO::PARAM_INT);
            $statement->bindParam(':description', $assetId, \PDO::PARAM_STR);
            $statement->execute();
        }
    }

    private function validateNameAsset($nameAsset)
    {
        if ($nameAsset === null) {
            throw new InvalidArgumentException("The name of the asset can't be null");
        }
        if (strlen($nameAsset) > 45) {
            throw new InvalidArgumentException("The name of the asset can't be that long");
        }
        if (!is_string($nameAsset)) {
            throw new InvalidArgumentException("The name of the asset must be of type string");
        }
    }

    public function getTickets()
    {
        // TODO: Implement getTickets() method.
    }

    public function getTicketById($id)
    {
        // TODO: Implement getTicketById() method.
    }
}