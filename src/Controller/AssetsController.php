<?php

namespace App\Controller;

use App\Model\AssetModel;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AssetsController extends AbstractController
{
    private $assetModel;

    public function __construct(AssetModel $assetModel)
    {
        $this->assetModel = $assetModel;
    }

    /**
     * @Route("/assets", methods={"GET"}, name="getAssets")
     * @return JsonResponse
     */
    public function getAssets()
    {
        $statuscode = 200;
        $assets = null;

        try {
            $assets = $this->assetModel->getAssets();
            if ($assets == null) {
                $statuscode = 404;
            }
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }

        return new JsonResponse($assets, $statuscode);
    }

    /**
     * @Route("/assets/{name}", methods={"GET"}, name="createTicketByAssetName")
     * @param $assetName
     * @return JsonResponse
     */
    public function createTicketByAssetName($assetName)
    {
        $statuscode = 200;
        $asset = null;

        try {

        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }

        return new JsonResponse($asset, $statuscode);
    }
}
