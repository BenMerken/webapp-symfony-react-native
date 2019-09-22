<?php

namespace App\Controller;

use App\Model\RoomModel;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class RoomsController extends AbstractController
{
    private $roomModel;

    public function __construct(RoomModel $roomModel)
    {
        $this->roomModel = $roomModel;
    }

    /**
     * @Route("/rooms", methods={"GET"}, name="getRooms")
     */
    public function getRooms()
    {
        $statuscode = 200;
        $rooms = null;

        try {
            $rooms = $this->roomModel->getRooms();
            if ($rooms == null) {
                $statuscode = 404;
            }
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }

        return new JsonResponse($rooms, $statuscode);
    }

    /**
     * @Route("/rooms/{id}", methods={"GET"}, name="getRoomsById")

    public function getRoomByName(Request $request, $name)
    {
        $statuscode = 200;
        $room = null;

        try {
            $room = $this->roomModel->getRoomByName($name);
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }

        return new JsonResponse($room, $statuscode);
    }
     */
    /**
     * @Route("/rooms/{name}", methods={"GET"}, name="HappinessScoreRoom")
     * @param $name
     * @return JsonResponse
     */
    public function getHappinessScoreRoom($name)
    {
        $statuscode = 200;
        $room = null;
        try {
            $room = $this->roomModel->getHappinessScoreRoom($name);
            if ($room == null) {
                $statuscode = 404;
            }
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        return new JsonResponse($room, $statuscode);
    }

    /**
     * @Route("/rooms/{name}/{happyOrNot}", methods={"GET","PUT"}, name="HappyOrNot")
     * @param $name
     * @param $happyOrNot
     * @return JsonResponse
     */
    public function updateRoomHappinessScore($name, $happyOrNot)
    {
        $statuscode = 200;
        $room = null;
        try {
            $room = $this->roomModel->updateHappinessScoreRoom($name, $happyOrNot);
            if ($room == null) {
                $statuscode = 404;
            }
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        return new JsonResponse($room, $statuscode);
    }
}
