<?php


namespace App\Model;


use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Request;

class PDOAssetModel implements AssetModel
{
    private $connection;
    private $pdo;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
        $this->pdo = $this->connection->getPDO();
    }

    public function getAssets()
    {
        $statement = $this->pdo->prepare("SELECT * FROM assets;");
        $statement->execute();
        $statement->bindColumn(1, $id, \PDO::PARAM_INT);
        $statement->bindColumn(2, $roomId, \PDO::PARAM_INT);
        $statement->bindColumn(3, $name, \PDO::PARAM_STR);

        $assets = [];

        while ($statement->fetch(\PDO::FETCH_BOUND)) {
            $asset = [
                'id' => $id,
                'roomId' => $roomId,
                'name' => $name
            ];
            $assets[] = $asset;
        }

        return $assets;
    }

    public function createTicketByAssetName($assetName, $description)
    {
        $this->validateAssetName($assetName);
        $this->validateDescription($description);

        $selectQuery = "SELECT id FROM assets WHERE name = :assetName;";
        $selectStatement = $this->pdo->prepare($selectQuery);
        $selectStatement->bindParam(':assetName', $assetName, \PDO::PARAM_STR);
        $selectStatement->bindColumn(1, $id, \PDO::PARAM_INT);
        $selectStatement->execute();

        $assetId = null;

        if ($selectStatement->fetch(\PDO::FETCH_BOUND)) {
            $assetId = $id;
        }

        $insertQuery = "INSERT INTO tickets(`assetId`, `description`)
                        VALUES(:assetId, :description);";
        $insertStatement = $this->pdo->prepare($insertQuery);
        $insertStatement->bindParam(':assetId', $assetId, \PDO::PARAM_INT);
        $insertStatement->bindParam(":description", $description, \PDO::PARAM_STR);
        $insertStatement->execute();

        return [
            'id' => intval($this->pdo->lastInsertId()),
            'assetId' => $assetId,
            'numberOfVotes' => 0,
            'description' => $description
        ];
    }

    private function validateAssetName($nameAsset)
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

    private function validateDescription($description)
    {
        // TODO: implement
    }
}
