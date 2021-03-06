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
    public function getRooms(Request $request)
    {
        $statuscode = 200;
        $rooms = [];

        try {
            $score = (int)$request->query->get('lowerThanScore');
            if ($score) {
                $rooms = $this->roomModel->getRoomsWithHappinessScoreLessThan($score);
            } else {
                $rooms = $this->roomModel->getRooms();
            }

            if (count($rooms) === 0) {
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
    public function getHappinessScore($name)
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
