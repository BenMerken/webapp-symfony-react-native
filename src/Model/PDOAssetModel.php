<?php


namespace App\Model;


use InvalidArgumentException;

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

    public function createTicketByAssetName($assetName)
    {
        $this->validateAssetName($assetName);
        // TODO: Implement createTicketByAssetName($assetName) method.
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
}
