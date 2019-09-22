<?php


namespace App\Model;


interface AssetModel
{
    public function getTicketsOfAsset($nameAsset);
    public function getAssets($nameAsset);
    public function getAssetsById($nameAsset);
}