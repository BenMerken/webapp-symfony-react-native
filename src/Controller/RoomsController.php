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
     * @Route("/rooms", methods={"GET"}, name="GetHappinessScoreRoom")
     * @param Request $request
     * @return JsonResponse
     */
    public function getHappinessScoreRoom(Request $request)
    {
        $statuscode = 200;
        $room = null;
        $rooms = null;

        $name = $request->query->get('name');
        $score = (int)$request->query->get('lowerThanScore');

        try {
            if ($name) {
                $room = $this->roomModel->getHappinessScoreRoom($name);
                return new JsonResponse($room, $statuscode);
            }
            if ($score) {
                $room = $this->roomModel->getRoomsWithHappinessScoreLessThan($score);
                return new JsonResponse($room, $statuscode);
            }
            $rooms = $this->roomModel->getRooms();
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        return new JsonResponse($rooms, $statuscode);
    }


    /**
     * @Route("/rooms/happyOrNot", methods={"PATCH"}, name="HappyOrNot")
     * @param Request $request
     * @return JsonResponse
     */
    public function updateRoomHappinessScore(Request $request)
    {
        $statuscode = 200;
        $room = null;
        $date = json_decode($request->getContent(), true);

        $happyOrNot = $date['happiness'];
        $name = $date['name'];

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
