<?php

namespace App\Model;

class PDORoomModel implements RoomModel
{
    private $connection;
    private $pdo;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
        $this->pdo = $this->connection->getPDO();
    }

    public function getRooms()
    {
        $statement = $this->pdo->prepare('SELECT * from rooms;');
        $statement->execute();
        $statement->bindColumn(1, $id, \PDO::PARAM_INT);
        $statement->bindColumn(2, $name, \PDO::PARAM_STR);
        $statement->bindColumn(3, $happinessScore, \PDO::PARAM_INT);

        $rooms = [];

        while ($statement->fetch(\PDO::FETCH_BOUND)) {
            $room = [
                'id' => $id,
                'name' => $name,
                'happinessScore' => $happinessScore
            ];
            $rooms[] = $room;
        }

        return $rooms;
    }

    public function getRoomByName($name)
    {
        $this->validateName($name);
        $statement = $this->pdo->prepare('SELECT * from rooms WHERE name=:name;');
        $statement->bindParam(':name', $name, \PDO::PARAM_INT);
        $statement->execute();
        $statement->bindColumn(1, $id, \PDO::PARAM_INT);
        $statement->bindColumn(2, $name, \PDO::PARAM_STR);
        $statement->bindColumn(3, $happinessScore, \PDO::PARAM_INT);

        $room = null;

        if ($statement->fetch(\PDO::FETCH_BOUND)) {
            $room = ['id' => $id, 'name' => $name, 'happinessScore' => $happinessScore];
        }

        return $room;
    }

    private function validateName($name)
    {
        // TODO validatie verder uitbouwen
        if (!(is_string($name))) {
            throw new \InvalidArgumentException("De naam moet een string zijn.");
        }
    }
}
