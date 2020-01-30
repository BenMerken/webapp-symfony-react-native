<?php

namespace App\Controller;

use App\Model\AssetModel;
use InvalidArgumentException;
use PDOException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
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

    /**
     * @Route("/assets/{id}", methods={"PATCH", "OPTIONS"}, name="AddAssetImageForId")
     */
    public function AddAssetImageForId($id, Request $request)
    {
        $statuscode = 204;
        $base64 = $request->getContent();

        try {
            $this->assetModel->addAssetImageForId(intval($id), $base64);
        } catch (InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (NotFoundHttpException $exception) {
            $statuscode = 404;
        } catch (PDOException $exception) {
            $statuscode = 500;
            file_put_contents('/home/vagrant/data.txt', $exception->getMessage());
        }

        return new JsonResponse(null, $statuscode);
    }
}
