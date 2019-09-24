<?php


namespace App\Model;


interface AssetModel
{
    public function getAssets();
    public function createTicketByAssetName($assetName, $description);
}
