<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TicketsController extends AbstractController
{
    private $ticketModel;

    public function __construct($ticketModel)
    {
        $this->ticketModel = $ticketModel;
    }

    /**
     * @Route("/tickets", methods={"GET"}, name="getTickets")
     */
    public function getTickets()
    {
        $statuscode = 200;
        $tickets = null;

        try {
            $tickets = $this->ticketModel->getTickets();
            if ($tickets == null) {
                $statuscode = 404;
            }
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }

        return new JsonResponse($tickets, $statuscode);
    }

    /**
     * @Route("/tickets/{id}", methods={"GET"}, name="getTicketsById")
     */
    public function getRoomById($id)
    {
        $statuscode = 200;
        $ticket = null;

        try {
            $ticket = $this->ticketModel->getTicketById($id);
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }

        return new JsonResponse($ticket, $statuscode);
    }
}
