<?php

namespace App\Tests\Model;

use App\Model\Connection;
use App\Model\PDOAssetModel;
use App\Model\PDORoomModel;
use PDO;
use InvalidArgumentException;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class PDORoomModelTest extends TestCase
{
    private $connection;
    private $pdo;
    private $roomModel;

    public function setUp()
    {
        $sql = file_get_contents(__DIR__ . "/../../asset-management-sqlite.sql");
        $this->connection = new Connection("sqlite::memory:");
        $this->pdo = $this->connection->getPDO();
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->exec($sql);
        $this->roomModel = new PDORoomModel($this->connection);
    }


    public function tearDown()
    {
        $this->connection = null;
        $this->pdo = null;
    }


    public function providerRooms()
    {
        return [
            ['id' => 443, 'name' => 'B051', 'happinessScore' => 3445],
            ['id' => 444, 'name' => 'B052', 'happinessScore' => 1000],
            ['id' => 445, 'name' => 'B053', 'happinessScore' => 5000]
        ];
    }

    public function providerInvalidRoomNames()
    {
        return [
            [null],
            [str_repeat('k', 46)],
            [45],
            [""]
        ];
    }

    public function providerInvalidHappyOrNotValues()
    {
        return [
            ['name' => 'B051', 'happyOrNot' => null],
            ['name' => 'B052', 'happyOrNot' => 45],
            ['name' => 'B053', ""]
        ];
    }

    public function providerHappyOrNotUserInput()
    {
        return [
            ['name' => 'B051', 'happyOrNot' => 'happy', 'expectedHappinessScore' => 3445 + 2],
            ['name' => 'B052', 'happyOrNot' => 'unhappy', 'expectedHappinessScore' => 1000 - 2],
            ['name' => 'B053', 'happyOrNot' => 'somewhatHappy', 'expectedHappinessScore' => 5000 + 1],
            ['name' => 'B053', 'happyOrNot' => 'somewhatUnHappy', 'expectedHappinessScore' => 4999],
            ['name' => 'B053', 'happyOrNot' => 'kkk', 'expectedHappinessScore' => 5000]
        ];
    }

    public function providerLowerThanHappinessScores()
    {
        return [
            ['score' => 5001, 'amountOfRoomsWithHappinessScoreLowerThan' => 3],
            ['score' => 2000, 'amountOfRoomsWithHappinessScoreLowerThan' => 1]
        ];
    }

    public function providerInvalidInputLowerThanHappinessScores()
    {
        return [
            ['score' => '20'],
            ['score' => null],
            ['score' => ""]
        ];
    }

    /**
     * @dataProvider providerRooms()
     * @param $id
     * @param $name
     * @param $happinessScore
     */
    public function testFindHappinessScoreByRoomName($id, $name, $happinessScore)
    {
        $roomModel = new PDORoomModel($this->connection);
        $expectedRoom = ['id' => $id, 'name' => $name, 'happinessScore' => $happinessScore];
        $actualRoom = $roomModel->getHappinessScoreRoom($name);

        $this->assertEquals('array', gettype($actualRoom));
        $this->assertArrayHasKey('happinessScore', $actualRoom);
        $this->assertEquals($expectedRoom['happinessScore'], $actualRoom['happinessScore']);
    }

    /**
     * @dataProvider providerInvalidRoomNames()
     * @param $name
     */
    public function testInvalidInputFindHappinessScoreByRoomName($name)
    {
        $roomModel = new PDORoomModel($this->connection);
        $this->expectException(InvalidArgumentException::class);
        $roomModel->getHappinessScoreRoom($name);
    }

    /**
     * @dataProvider providerHappyOrNotUserInput()
     * @param $name
     * @param $happyOrNot
     * @param $expectedHappinessScore
     */
    public function testHappyOrNotFunction($name, $happyOrNot, $expectedHappinessScore)
    {
        $roomModel = new PDORoomModel($this->connection);
        $roomModel->updateHappinessScoreRoom($name, $happyOrNot);
        $actualHappinessScore = $roomModel->getHappinessScoreRoom($name);
        $this->assertEquals($expectedHappinessScore, $actualHappinessScore['happinessScore']);
    }

    /**
     * @dataProvider providerInvalidHappyOrNotValues()
     * @param $name
     * @param $happyOrNot
     */
    public function testInvalidInputHappyOrNotFunction($name, $happyOrNot)
    {
        $roomModel = new PDORoomModel($this->connection);
        $this->expectException(InvalidArgumentException::class);
        $roomModel->updateHappinessScoreRoom($name, $happyOrNot);
    }


    public function testGetRooms()
    {
        $roomModel = new PDORoomModel($this->connection);
        $expectedRooms = $this->providerRooms();
        $actualRooms = $roomModel->getRooms();
        $this->assertEquals('array', gettype($actualRooms));
        $this->assertEquals($expectedRooms, $actualRooms);
    }

    /**
     * @dataProvider providerLowerThanHappinessScores()
     * @param $score
     * @param $amountOfRoomsWithHappinessScoreLessThan
     */
    public function testGetRoomsWithHappinessScoreLowerThan($score, $amountOfRoomsWithHappinessScoreLessThan)
    {
        $roomModel = new PDORoomModel($this->connection);
        $expectedAmountOfRooms = $amountOfRoomsWithHappinessScoreLessThan;
        $actualAmountOfRooms = $roomModel->getRoomsWithHappinessScoreLessThan($score);

        if (!empty($actualAmountOfRooms)) {
            $this->assertTrue($expectedAmountOfRooms === sizeof($actualAmountOfRooms));
        }
    }

    /**
     * @dataProvider providerInvalidInputLowerThanHappinessScores()
     * @param $score
     */
    public function testInvalidInputGetRoomsWithHappinessScoreLowerThan($score)
    {
        $roomModel = new PDORoomModel($this->connection);
        $this->expectException(InvalidArgumentException::class);
        $roomModel->getRoomsWithHappinessScoreLessThan($score);
    }
}
