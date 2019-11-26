--
-- Database: 'asset-management'
--
-- --------------------------------------------------------
-- Creating tables and inserting dummy data
-- --------------------------------------------------------

--
-- Tablestructure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms`
(
    `id`             INTEGER PRIMARY KEY AUTOINCREMENT,
    `name`           varchar(45) DEFAULT NULL,
    `happinessScore` int(11)     DEFAULT 0
);

--
-- Inserting dummy data into table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `happinessScore`)
VALUES (443, 'B051', 3445),
       (444, 'B052', 1000),
       (445, 'B053', 5000);

-- --------------------------------------------------------

--
-- Tablestructure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
CREATE TABLE IF NOT EXISTS `assets`
(
    `id`     INTEGER PRIMARY KEY AUTOINCREMENT,
    `roomId` int(11)     DEFAULT 0,
    `name`   varchar(45) DEFAULT NULL,
    FOREIGN KEY (roomId) REFERENCES rooms (id)
);

--
-- Inserting dummy data into table `assets`
--

INSERT INTO `assets` (`id`, `roomId`, `name`)
VALUES (223, 443, 'beamer'),
       (224, 444, 'computer'),
       (225, 445, 'router'),
       (226, 443, 'asset-without-tickets');

-- --------------------------------------------------------

--
-- Tablestructure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets`
(
    `id`            INTEGER PRIMARY KEY AUTOINCREMENT,
    `assetId`       int(11)     DEFAULT 0,
    `numberOfVotes` int(11)     DEFAULT 0,
    `description`   varchar(90) DEFAULT NULL,
    FOREIGN KEY (assetId) REFERENCES assets(id)
);

--
-- Inserting dummy data into table `tickets`
--

INSERT INTO `tickets` (`id`, `assetId`, `numberOfVotes`, `description`)
VALUES (32, 223, 1, 'beamer does not show correct colours'),
       (33, 224, 5, 'computer fan does not spin'),
       (34, 225, 100, 'router does not want to start');
