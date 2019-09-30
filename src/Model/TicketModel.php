<?php


namespace App\Model;


interface TicketModel
{
    public function getTicketsByAssetName($assetName);

    public function createTicketForAsset($assetName, $jsonData);

    public function incrementNumberOfVotes($id);

    public function validateAssetName($assetName);

    public function validateId($id);

    public function validateTicketData($data);

    public function validateDescription($description);
}
