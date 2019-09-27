<?php


namespace App\Model;


use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PDOTicketModel implements TicketModel
{
    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function getTickets()
    {
        // TODO: Implement getTickets() method.
    }

    public function getTicketById($id)
    {
        // TODO: Implement getTicketById() method.
    }

    public function incrementNumberOfVotes($id)
    {
        $this->validateId($id);

        $pdo = $this->connection->getPDO();
        $updateQuery = "UPDATE tickets SET numberOfVotes = numberOfVotes + 1 WHERE id = :id;";
        $statement = $pdo->prepare($updateQuery);
        $statement->bindParam(':id', $id, \PDO::PARAM_INT);
        $statement->execute();
        if ($statement->rowCount() == 0) {
            throw new NotFoundHttpException("There is no ticket with id $id.");
        }
    }

    private function validateId($id)
    {
        if (!intval($id)) {
            throw new \InvalidArgumentException("The id must be an integer.");
        }
    }
}
