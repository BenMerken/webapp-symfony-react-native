<?php

namespace App\Controller;

use App\Model\AssetModel;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
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
        } catch (\InvalidArgumentException | BadRequestHttpException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }

        return new JsonResponse($assets, $statuscode);
    }

    /**
     * @Route("/assets/{assetName}", methods={"POST"}, name="createTicketByAssetName")
     * @param Request $request
     * @param $assetName
     * @return JsonResponse
     */
    public function createTicketByAssetName(Request $request, $assetName)
    {
        $statuscode = 201;
        $createdTicket = null;

        try {
            if (strcasecmp($request->getContentType(), 'json') != 0 || !$request->getContent()) {
                throw new BadRequestHttpException("This method only accepts a non-empty JSON in the request body. ");
            }
            $data = json_decode($request->getContent(), true);
            $description = $data['description'];
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new BadRequestHttpException("Your JSON contained an error.");
            }
            $createdTicket = $this->assetModel->createTicketByAssetName($assetName, $description);
        } catch (\InvalidArgumentException | BadRequestHttpException $exception) {
            $statuscode = 400;
            $createdTicket = $exception->getMessage();
        } catch (\PDOException $exception) {
            $statuscode = 500;
            $createdTicket = $exception->getMessage();
        }

        return new JsonResponse($createdTicket, $statuscode);
    }
}
