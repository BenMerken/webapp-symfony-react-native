<?php


namespace App\Model;


interface TicketModel
{
    public function getTickets();

    public function getTicketById($id);
}