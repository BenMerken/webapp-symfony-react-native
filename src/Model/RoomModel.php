<?php

namespace App\Model;

interface RoomModel
{
    public function getRooms();
    public function getRoomByName($name);
}
