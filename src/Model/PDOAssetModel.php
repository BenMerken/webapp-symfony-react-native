<?php


namespace App\Model;


use PDO;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PDOAssetModel implements AssetModel
{
    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }


    public function getIdForName($name)
    {
        $pdo = $this->connection->getPDO();
        $query = "SELECT id from assets WHERE name = :name;";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":name", $name, PDO::PARAM_STR);
        $statement->bindColumn(1, $id, PDO::PARAM_INT);

        if (!($id = $statement->execute())) {
            throw new NotFoundHttpException("No asset found for name = $name.");
        }

        return $id;
    }
}
