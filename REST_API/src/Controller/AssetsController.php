<?php

namespace App\Controller;

use App\Model\AssetModel;
use InvalidArgumentException;
use PDOException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AssetsController extends AbstractController
{
    private $assetModel;

    public function __construct(AssetModel $assetModel)
    {
        $this->assetModel = $assetModel;
    }

    /**
     * @Route("/assets/", methods={"GET"}, name="GetAssetsForRoomId")
     */
    public function getAssetsForRoomId(Request $request)
    {
        $roomId = (int)$request->query->get('roomId');

        $statuscode = 200;
        $assets = null;

        try {
            $assets = $this->assetModel->getAssetsForRoomId($roomId);
            if ($assets == null) {
                $statuscode = 404;
            }
        } catch (InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (PDOException $exception) {
            $statuscode = 500;
        }
        return new JsonResponse($assets, $statuscode);
    }
}
