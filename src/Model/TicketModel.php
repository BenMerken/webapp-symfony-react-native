<?php


namespace App\Model;


interface TicketModel
{
    public function getTicketsByAssetName($assetName);

    public function createTicketForAsset($assetName, $jsonData);

    public function incrementNumberOfVotes($id);
}
