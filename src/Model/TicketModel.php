<?php


namespace App\Model;


interface TicketModel
{
    public function createTicketWithDescription($nameAsset, $description);

    public function getTickets();

    public function getTicketById($id);
}