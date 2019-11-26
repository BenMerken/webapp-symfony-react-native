<?php


namespace App\Model;


use InvalidArgumentException;
use PDO;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PDOTicketModel implements TicketModel
{
    private $connection;
    private $assetModel;

    public function __construct(Connection $connection, AssetModel $model)
    {
        $this->connection = $connection;
        $this->assetModel = $model;
    }

    public function getTicketsByAssetName($assetName)
    {
        $this->validateAssetName($assetName);

        $tickets = null;

        $pdo = $this->connection->getPDO();
        $assetId = $this->assetModel->getIdForName($assetName);
        $query = "SELECT * FROM tickets WHERE assetId = :assetId;";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":assetId", $assetId, PDO::PARAM_INT);
        $statement->bindColumn(1, $id, PDO::PARAM_INT);
        $statement->bindColumn(2, $assetId, PDO::PARAM_INT);
        $statement->bindColumn(3, $numberOfVotes, PDO::PARAM_INT);
        $statement->bindColumn(4, $description, PDO::PARAM_STR);
        $statement->execute();

        while ($statement->fetch(PDO::FETCH_BOUND)) {
            $ticket = [
                "id" => $id,
                "assetId" => $assetId,
                "numberOfVotes" => $numberOfVotes,
                "description" => $description
            ];

            $tickets[] = $ticket;
        }

        if (!$tickets) {
            throw new NotFoundHttpException("No tickets found for assetName = $assetName");
        }

        return $tickets;
    }

    public function createTicketForAsset($assetName, $jsonData)
    {
        $this->validateAssetName($assetName);
        $this->validateTicketData($jsonData);

        $description = $jsonData["description"];
        $this->validateDescription($description);
        $assetId = $this->assetModel->getIdForName($assetName);

        $pdo = $this->connection->getPDO();
        $insertQuery = "INSERT INTO tickets(assetId, description) VALUES(:assetId, :description);";
        $statement = $pdo->prepare($insertQuery);
        $statement->bindParam(":assetId", $assetId);
        $statement->bindParam(":description", $description);
        $statement->execute();

        return $statement->rowCount();
    }

    public function incrementNumberOfVotes($id)
    {
        $this->validateId($id);

        $pdo = $this->connection->getPDO();
        $updateQuery = "UPDATE tickets SET numberOfVotes = numberOfVotes + 1 WHERE id = :id;";
        $statement = $pdo->prepare($updateQuery);
        $statement->bindParam(":id", $id, PDO::PARAM_INT);
        $statement->execute();
        if ($statement->rowCount() == 0) {
            throw new NotFoundHttpException("There is no ticket with id $id.");
        }
    }

    public function validateAssetName($assetName)
    {
        if (!($assetName && is_string($assetName) && strlen($assetName) <= 45)) {
            throw new InvalidArgumentException("The assetName must be a string, no longer than 45 characters.");
        }
    }

    public function validateTicketData($jsonData)
    {
        if (!(isset($jsonData["description"]))) {
            throw new InvalidArgumentException("The JSON data is not valid");
        }
    }

    public function validateDescription($description)
    {
        if (!(is_string($description) && strlen($description) <= 90 && strlen($description) >= 15)) {
            throw new InvalidArgumentException("The description must be a string, no longer than 90  and no less than 15.");
        }
    }

    public function validateId($id)
    {
        if (!preg_match("/^([1-9][0-9]*)$/", $id)) {
            throw new InvalidArgumentException("The id must be a natural number greater than 0.");
        }
    }
}
