<?php

namespace App\Controller;

use App\Model\TicketModel;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class TicketsController extends AbstractController
{
    private $ticketModel;

    public function __construct(TicketModel $ticketModel)
    {
        $this->ticketModel = $ticketModel;
    }
//
//    /**
//     * @Route("/tickets", methods={"GET"}, name="getTickets")
//     */
//    public function getTickets()
//    {
//        $statuscode = 200;
//        $tickets = null;
//
//        try {
//            $tickets = $this->ticketModel->getTickets();
//            if ($tickets == null) {
//                $statuscode = 404;
//            }
//        } catch (\InvalidArgumentException $exception) {
//            $statuscode = 400;
//        } catch (\PDOException $exception) {
//            $statuscode = 500;
//        }
//
//        return new JsonResponse($tickets, $statuscode);
//    }
//
    /**
     * @Route("/tickets/{id}", methods={"GET"}, name="getTicketById")
     */
    public function getTicketById($id)
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

    /**
     * @Route("/tickets/{id}", methods={"PATCH"}, name="incrementNumberOfVotes")
     */
    public function incrementNumberOfVotes($id)
    {
        $statuscode = 204;

        try {
            $this->ticketModel->incrementNumberOfVotes($id);
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (NotFoundHttpException $exception) {
            $statuscode = 404;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }

        return new JsonResponse(null, $statuscode);
    }
}
