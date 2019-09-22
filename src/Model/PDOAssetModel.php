<?php


namespace App\Model;


use InvalidArgumentException;

class PDOAssetModel implements AssetModel
{
    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function getTicketsOfAsset($nameAsset)
    {
        //Get id of asset out of database by using the name of the asset
        $this->validateNameAsset($nameAsset);
        $pdo = $this->connection->getPDO();
        $statement = $pdo->prepare('SELECT id from assets WHERE assetName=:nameAsset');
        $statement->bindParam(':nameAsset', $nameAsset, \PDO::PARAM_STR);
        $statement->execute();
        $id = $statement->fetchColumn();

        $tickets = null;
        if ($id !== null) {
            //get all tickets of asset by using the id of the asset
            $statement = $pdo->prepare('SELECT * from tickets WHERE assetId=:id');
            $statement->bindParam(':id', $id, \PDO::PARAM_INT);
            $statement->execute();
            $statement->bindColumn(1, $id, \PDO::PARAM_INT);
            $statement->bindColumn(2, $assetId, \PDO::PARAM_INT);
            $statement->bindColumn(3, $numberOfVotes, \PDO::PARAM_INT);
            $statement->bindColumn(4, $description, \PDO::PARAM_STR);

            if ($statement->fetch(\PDO::FETCH_BOUND)) {
                $tickets = ['id' => $id, 'assetId' => $assetId, 'numberOfVotes' => $numberOfVotes, 'description' => $description];
            }
        }
        return $tickets;
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

    public function getAssets($nameAsset)
    {
        // TODO: Implement getAssets() method.
    }

    public function getAssetsById($nameAsset)
    {
        // TODO: Implement getAssetsById() method.
    }
}
