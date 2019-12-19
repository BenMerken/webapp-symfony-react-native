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
     * @Route("/rooms/", methods={"GET"}, name="GetRooms")
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
     * @Route("/rooms/{name}", methods={"GET"}, name="GetHappinessScoreRoom")
     * @param $name
     * @return JsonResponse
     */
    public function getRoomByName($name)
    {
        $statuscode = 200;
        $room = null;

        try {

            $room = $this->roomModel->getRoomByName($name);

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
     * @Route("/rooms", methods={"GET"}, name="GetLowerThanHappinessScoreRoom")
     * @param Request $request
     * @return JsonResponse
     */
    public function getLowerThanHappinessScoreRoom(Request $request)
    {
        $statuscode = 200;
        $rooms = null;

        $score = (int)$request->query->get('lowerThanScore');

        try {
            $rooms = $this->roomModel->getRoomsWithHappinessScoreLessThan($score);
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
     * @Route("/rooms/{name}/{happiness}", methods={"PATCH"}, name="HappyOrNot")
     * @param $name
     * @param $happiness
     * @return JsonResponse
     */
    public function updateRoomHappinessScore($name, $happiness)
    {
        $statuscode = 200;
        $room = null;

        try {
            $room = $this->roomModel->updateHappinessScoreRoom($name, $happiness);
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
