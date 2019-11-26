<?php

namespace App\Tests\Model;

use App\Model\Connection;
use App\Model\PDOAssetModel;
use PDO;
use InvalidArgumentException;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PDOAssetModelTest extends TestCase
{
    private $connection;
    private $pdo;
    private $assetModel;

    public function setUp()
    {
        $sql = file_get_contents(__DIR__ . "/../../asset-management-sqlite.sql");
        $this->connection = new Connection("sqlite::memory:");
        $this->pdo = $this->connection->getPDO();
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->exec($sql);
        $this->assetModel = new PDOAssetModel($this->connection);
    }

    public function tearDown()
    {
        $this->connection = null;
        $this->pdo = null;
    }

    public function providerExistingNamesAndIds()
    {
        return [
            [223, "beamer"],
            [224, "computer"],
            [225, "router"],
        ];
    }

    public function providerNonExistingName()
    {
        return [
            ["notInTheDB"]
        ];
    }

    public function providerValidName()
    {
        return [
            ["Valid Asset name"],
            [str_repeat("1a2b3", 9)],
            [str_repeat("a", 44)]
        ];
    }

    public function providerInvalidName()
    {
        return [
            [null],
            [123],
            [[]],
            [str_repeat("a", 46)],
            ["1234"],
            [""]
        ];
    }

    /**
     * @dataProvider providerExistingNamesAndIds
     */
    public function testGetIdForName_existingNamesAndIds_true($expectedId, $name)
    {
        $actualId = $this->assetModel->getIdForName($name);
        $this->assertEquals($expectedId, $actualId);
    }

    /**
     * @dataProvider providerNonExistingName
     */
    public function testGetIdFromName_nonExistingName_throwsNotFoundHttpException($name)
    {
        $exceptionMessage = "No asset found for name = $name.";
        $this->expectException(NotFoundHttpException::class);
        $this->expectExceptionMessage($exceptionMessage);
        $this->assetModel->getIdForName($name);
    }

    /**
    * @dataProvider providerValidName
     */
    public function testValidateName_validName_noExceptionThrown($name)
    {
        $this->assertNull($this->assetModel->validateName($name));
    }

    /**
     * @dataProvider providerInvalidName
     */
    public function testValidateName_invalidName_throwsInvalidArgumentException($name)
    {
        $this->expectException(InvalidArgumentException::class);

        $this->assetModel->validateName($name);
    }
}
