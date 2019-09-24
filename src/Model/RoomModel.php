<?php

namespace App\Model;

interface RoomModel
{
    public function getRooms();
    public function getRoomByName($name);
    public function updateHappinessScoreRoom($nameRoom, $happyOrNot);
    public function getHappinessScoreRoom($nameRoom);
    public function getRoomsWithHappinessScoreLessThan($score);
}
