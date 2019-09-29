<?php

namespace App\Tests\model;

use App\Model\Connection;
use App\Model\PDOAssetModel;
use PDO;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PDOAssetModelTest extends TestCase
{
    private $connection;
    private $pdo;

    public function setUp()
    {
        $sql = file_get_contents(__DIR__ . "/../../asset-management-sqlite.sql");
        $this->connection = new Connection("sqlite:memory:");
        $this->pdo = $this->connection->getPDO();
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->exec($sql);
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

    /**
     * @dataProvider providerExistingNamesAndIds
     */
    public function testGetIdForName_existingNamesAndIds_true($expectedId, $name)
    {
        $assetModel = new PDOAssetModel($this->connection);
        $actualId = $assetModel->getIdForName($name);
        $this->assertEquals($expectedId, $actualId);
    }

    /**
     * @dataProvider providerNonExistingName
     */
    public function testGetIdFromName_nonExistingName_throwsNotFoundHttpException($name)
    {
        $exceptionMessage = "No asset found for name = $name.";
        $assetModel = new PDOAssetModel($this->connection);
        $this->expectException(NotFoundHttpException::class);
        $this->expectExceptionMessage($exceptionMessage);
        $assetModel->getIdForName($name);
    }
}
