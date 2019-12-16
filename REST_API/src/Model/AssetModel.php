<?php


namespace App\Model;


interface AssetModel
{
    public function getAssetsForRoomId($roomId);

    public function getIdForName($name);

    public function validateName($name);
}
