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
     * @Route("/rooms/{name}", methods={"GET"}, name="getRoomsByName")
     * @param $name
     * @return JsonResponse
     */
    public function getRoomByName($name)
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

    /**
     * @Route("/rooms/{name}/score", methods={"GET"}, name="HappinessScoreRoom")
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
     * @Route("/rooms/{name}/happyOrNot", methods={"PATCH"}, name="HappyOrNot")
     * @param Request $request
     * @param $name
     * @return JsonResponse
     */
    public function updateRoomHappinessScore(Request $request, $name)
    {
        $statuscode = 200;
        $room = null;
        $date = json_decode($request->getContent(), true);

        $happyOrNot = $date['happyOrNot'];

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

    /**
     * @Route("/rooms/scoreLowerThan/{score}", methods={"GET"}, name="HapinessScoreLowerThan")
     * @param $score
     * @return JsonResponse
     */
    public function getRoomsWithHappinessScoreLessThan($score)
    {
        $statuscode = 200;
        $rooms = null;

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
}
