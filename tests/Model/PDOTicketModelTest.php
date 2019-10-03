<?php

namespace App\Tests\Model;

use App\Model\Connection;
use App\Model\PDOAssetModel;
use App\Model\PDOTicketModel;
use PDO;
use InvalidArgumentException;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PDOTicketModelTest extends TestCase
{
    private $connection;
    private $pdo;
    private $assetModel;
    private $ticketModel;

    public function setUp()
    {
        $sql = file_get_contents(__DIR__ . "/../../asset-management-sqlite.sql");
        $this->connection = new Connection("sqlite::memory:");
        $this->pdo = $this->connection->getPDO();
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->exec($sql);

        $this->assetModel = new PDOAssetModel($this->connection);
        $this->ticketModel = new PDOTicketModel($this->connection, $this->assetModel);
    }

    public function tearDown()
    {
        $this->pdo = null;
        $this->connection = null;
        $this->ticketModel = null;
        $this->assetModel = null;
    }

    public function providerValidAssetNameAndExpectedTicket()
    {
        return [
            ["beamer", [[
                "id" => 32,
                "assetId" => 223,
                "numberOfVotes" => 1,
                "description" => "beamer does not show correct colours"
            ]]],
            ["computer", [[
                "id" => 33,
                "assetId" => 224,
                "numberOfVotes" => 5,
                "description" => "computer fan does not spin"
            ]]],
            ["router", [[
                "id" => 34,
                "assetId" => 225,
                "numberOfVotes" => 100,
                "description" => "router does not want to start"
            ]]],
        ];
    }

    public function providerValidAssetNameAndJsonData()
    {
        return [
            ["beamer", ["description" => "This is a valid description"]],
            ["computer", ["description" => "This is a valid description"]],
            ["router", ["description" => "This is a valid description"]]
        ];
    }

    public function providerNonExistentAssetName()
    {
        return [
            ["asset-without-tickets"],
        ];
    }

    public function providerIdAndInitialNumberOfVotes()
    {
        return [
            [32, 1],
            [33, 5],
            [34, 100],
        ];
    }

    public function providerNonExistentIds()
    {
        return [
            ["31"],
            ["35"],
            ["9999"],
        ];
    }

    public function providerValidAssetName()
    {
        return [
            [str_repeat("a", 44)],
            [str_repeat("abcde", 9)],
            ["valid"],
            ["v"],
        ];
    }

    public function providerInvalidAssetName()
    {
        return [
            [str_repeat("a", 46)],
            [123],
            [null],
        ];
    }

    public function providerValidId()
    {
        return [
            ["1"],
            ["1000"],
            ["99999"],
        ];
    }

    public function providerInvalidId()
    {
        return [
            ["-9999"],
            ["-1"],
            ["0"],
            ["0.1"]
        ];
    }

    public function providerValidTicketData()
    {
        return [
            [[
                "description" => "description",
                "id" => 123,
                "something_else" => []
            ]],
            [[
                "id" => 123,
                "description" => "description",
                "something_else" => []
            ]],
            [[
                "something_else" => [],
                "id" => 123,
                "description" => "description"
            ]],
        ];
    }

    public function providerInvalidTicketData()
    {
        return [
            [[]],
            [[
                "something_else" => [],
                "id" => 123,
            ]],
        ];
    }

    public function providerValidDescription()
    {
        return [
            ["This is a description"],
            ["0123456789abcde"],
        ];
    }

    public function providerInvalidDescription()
    {
        return [
            ["too short"],
            [str_repeat("a", 96)],
            [""],
        ];
    }

    /**
     * @dataProvider providerValidAssetNameAndExpectedTicket
     */
    public function testGetTicketsByAssetName_validAssetName_true($assetName, $expectedTickets)
    {
        $actualTickets = $this->ticketModel->getTicketsByAssetName($assetName);

        $this->assertEquals($expectedTickets, $actualTickets);
    }

    /**
     * @dataProvider providerNonExistentAssetName
     */
    public function testGetTicketsByAssetName_nonExistentAssetName_throwsNotFoundHttpException($assetName)
    {
        $this->expectException(NotFoundHttpException::class);
        $this->ticketModel->getTicketsByAssetName($assetName);
    }

    /**
     * @dataProvider providerValidAssetNameAndJsonData
     */
    public function testCreateTicketForAsset_validAssetNameAndJsonData_ticketCreated($assetName, $jsonData)
    {
        $rowCount = $this->ticketModel->createTicketForAsset($assetName, $jsonData);

        $this->assertEquals(1, $rowCount);
    }

    /**
     * @dataProvider providerIdAndInitialNumberOfVotes
     */
    public function testIncrementNumberOfVotes_ValidId_true($id, $initialNumberOfVotes)
    {
        $this->ticketModel->incrementNumberOfVotes($id);
        $query = "SELECT numberOfVotes FROM tickets WHERE id = :id;";
        $statement = $this->pdo->prepare($query);
        $statement->bindParam(":id", $id, PDO::PARAM_INT);
        $statement->bindColumn(1, $incrementedNumberOfVotes, PDO::PARAM_INT);
        $statement->execute();
        $statement->fetch(PDO::FETCH_BOUND);

        $this->assertEquals($initialNumberOfVotes + 1, $incrementedNumberOfVotes);
    }

    /**
     * @dataProvider providerNonExistentIds
     */
    public function testIncrementNumberOfVotes_nonExistentId_throwsNotFoundHttpException($id)
    {
        $this->expectException(NotFoundHttpException::class);
        $this->ticketModel->incrementNumberOfVotes($id);
    }


    /**
     * @dataProvider providerValidTicketData
     */
    public function testValidateTicketData_validData_noExceptionThrown($data)
    {
        $this->assertNull($this->ticketModel->validateTicketData($data));
    }

    /**
     * @dataProvider providerInvalidTicketData
     */
    public function testValidateTicketData_invalidData_thrownInvalidArgumentException($data)
    {
        $this->expectException(InvalidArgumentException::class);

        $this->ticketModel->validateTicketData($data);
    }

    /**
    * @dataProvider providerValidAssetName
     */
    public function testValidateAssetName_validAssetName_noExceptionThrown($assetName)
    {
        $this->assertNull($this->ticketModel->validateAssetName($assetName));
    }

    /**
     * @dataProvider providerInvalidAssetName
     */
    public function testValidateAssetName_invalidAssetName_throwsInvalidArgumentException($assetName)
    {
        $this->expectException(InvalidArgumentException::class);

        $this->ticketModel->validateAssetName($assetName);
    }

    /**
     * @dataProvider providerValidId
     */
    public function testValidateId_validId_noExceptionThrown($id)
    {
        $this->assertNull($this->ticketModel->validateId($id));
    }

    /**
     * @dataProvider providerInvalidId
     */
    public function testValidateId_invalidId_throwsInvalidArgumentException($id)
    {
        $this->expectException(InvalidArgumentException::class);

        $this->ticketModel->validateId($id);
    }

    /**
     * @dataProvider providerValidDescription
     */
    public function testValidateDescription_validDescription_noExceptionThrown($description)
    {
        $this->assertNull($this->ticketModel->validateDescription($description));
    }

    /**
     * @dataProvider providerInvalidDescription
     */
    public function testValidateDescription_invalidDescription_thrownInvalidArgumentException($description)
    {
        $this->expectException(InvalidArgumentException::class);

        $this->ticketModel->validateDescription($description);
    }
}
