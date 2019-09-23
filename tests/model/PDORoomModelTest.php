<?php

use App\Model\Connection;
use App\Model\PDORoomModel;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class PDORoomModelTest extends TestCase
{
    private $connection;

    public function setUp()
    {
        $user = 'root';
        $password = 'root';
        $database = 'testroomdb';
        $server = '192.168.33.22';
        $this->connection = new Connection("mysql:host=$server;dbname=$database", $user, $password);
        $this->connection->getPDO()->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );
        $this->connection->getPDO()->exec('DROP TABLE IF EXISTS rooms');
        $this->connection->getPDO()->exec('CREATE TABLE rooms (
                        id INT, 
                        name VARCHAR(45),
                        happinessScore INT,
                        PRIMARY KEY (id)
                   )');

        $rooms = $this->providerRooms();
        foreach ($rooms as $room) {
            $statement = $this->connection->getPDO()->prepare('INSERT INTO rooms (id, name, happinessScore)
                                              VALUES (:id,:name, :happinessScore)');
            $statement->bindParam(':id', $room['id'], \PDO::PARAM_INT);
            $statement->bindParam(':name', $room['name'], \PDO::PARAM_STR);
            $statement->bindParam(':happinessScore', $room['happinessScore'], \PDO::PARAM_INT);
            $statement->execute();
        }
    }


    public function tearDown()
    {
        $user = 'root';
        $password = 'root';
        $database = 'testroomdb';
        $server = '192.168.33.22';
        $this->connection = new Connection("mysql:host=$server;dbname=$database", $user, $password);
        $this->connection->getPDO()->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );
        $this->connection->getPDO()->exec('DROP TABLE IF EXISTS rooms');
        $this->connection = null;
    }


    public function providerRooms()
    {
        return [
            ['id' => '1', 'name' => 'testname1', 'happinessScore' => '5'],
            ['id' => '2', 'name' => 'testname2', 'happinessScore' => '10'],
            ['id' => '3', 'name' => 'testname3', 'happinessScore' => '2'],
            ['id' => '4', 'name' => 'testname4', 'happinessScore' => '5']
        ];
    }

    public function providerInvalidRoomNames()
    {
        return [
            [null],
            [str_repeat('k', 46)],
            [45]
        ];
    }

    public function providerInvalidHappyOrNotValues()
    {
        return [
            ['name' => 'testname1', 'happyOrNot' => null],
            ['name' => 'testname2', 'happyOrNot' => 45]
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
     * @dataProvider providerRooms()
     * @param $id
     * @param $name
     * @param $happinessScore
     */
    public function testHappyOrNotFunction($id, $name, $happinessScore)
    {
        $roomModel = new PDORoomModel($this->connection);
        $expectedRoom = ['id' => $id, 'name' => $name, 'happinessScore' => $happinessScore];

        $roomModel->updateHappinessScoreRoom($name, 'happy');
        $actualRoom = $roomModel->getHappinessScoreRoom($name);
        $this->assertEquals($expectedRoom['happinessScore'] + 2, $actualRoom['happinessScore']);

        $roomModel->updateHappinessScoreRoom($name, 'unhappy');
        $actualRoom = $roomModel->getHappinessScoreRoom($name);
        $this->assertEquals($expectedRoom['happinessScore'], $actualRoom['happinessScore']);

        $roomModel->updateHappinessScoreRoom($name, 'somewhatHappy');
        $actualRoom = $roomModel->getHappinessScoreRoom($name);
        $this->assertEquals($expectedRoom['happinessScore'] + 1, $actualRoom['happinessScore']);

        $roomModel->updateHappinessScoreRoom($name, 'somewhatUnHappy');
        $actualRoom = $roomModel->getHappinessScoreRoom($name);
        $this->assertEquals($expectedRoom['happinessScore'], $actualRoom['happinessScore']);

        $roomModel->updateHappinessScoreRoom($name, 'default');
        $actualRoom = $roomModel->getHappinessScoreRoom($name);
        $this->assertEquals($expectedRoom['happinessScore'], $actualRoom['happinessScore']);
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
}