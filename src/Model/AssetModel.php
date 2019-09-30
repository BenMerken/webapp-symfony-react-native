<?php


namespace App\Model;


interface AssetModel
{
    public function getIdForName($name);

    public function validateName($name);
}
