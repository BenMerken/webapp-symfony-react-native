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

    public function getTickets()
    {
        // TODO: Implement getTickets() method.
    }

    public function getTicketById($id)
    {
        // TODO: Implement getTicketById() method.
    }
}