-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 
-- サーバのバージョン： 10.3.15-MariaDB
-- PHP のバージョン: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `share_reader_2`
--
CREATE DATABASE IF NOT EXISTS `share_reader_2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
USE `share_reader_2`;

-- --------------------------------------------------------

--
-- テーブルの構造 `account`
--

CREATE TABLE `account` (
  `account_id` int(32) NOT NULL,
  `flag_id` int(32) NOT NULL,
  `account_name` text COLLATE utf8mb4_bin NOT NULL,
  `account_email` text COLLATE utf8mb4_bin NOT NULL,
  `account_password` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `account_config` text COLLATE utf8mb4_bin NOT NULL,
  `account_registered_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- テーブルの構造 `download`
--

CREATE TABLE `download` (
  `download_id` int(32) NOT NULL,
  `user_id` int(32) NOT NULL,
  `file_info_id` int(32) NOT NULL,
  `download_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- テーブルの構造 `file_info`
--

CREATE TABLE `file_info` (
  `file_info_id` int(32) NOT NULL,
  `user_id` int(32) NOT NULL,
  `file_size` int(32) NOT NULL,
  `file_name` text COLLATE utf8mb4_bin NOT NULL,
  `file_extension` text COLLATE utf8mb4_bin NOT NULL,
  `file_format` text COLLATE utf8mb4_bin NOT NULL,
  `file_hash` varchar(64) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- テーブルの構造 `flag`
--

CREATE TABLE `flag` (
  `flag_id` int(1) NOT NULL,
  `flag_name` text COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- テーブルのデータのダンプ `flag`
--

INSERT INTO `flag` (`flag_id`, `flag_name`) VALUES
(0, '削除済み (物理)'),
(1, '稼働中'),
(2, '削除済み (論理)'),
(3, '凍結 (利用不可)');

-- --------------------------------------------------------

--
-- テーブルの構造 `login_sessions`
--

CREATE TABLE `login_sessions` (
  `login_session_id` int(32) NOT NULL,
  `user_id` int(32) NOT NULL,
  `account_id` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- テーブルの構造 `user`
--

CREATE TABLE `user` (
  `user_id` int(32) NOT NULL,
  `flag_id` int(32) NOT NULL,
  `user_public_token` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `user_private_token` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `user_agent` text COLLATE utf8mb4_bin NOT NULL,
  `user_ip` text COLLATE utf8mb4_bin NOT NULL,
  `user_mode_id` int(1) NOT NULL,
  `user_registered_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- テーブルの構造 `user_mode`
--

CREATE TABLE `user_mode` (
  `user_mode_id` int(1) NOT NULL,
  `mode_name` text COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- テーブルのデータのダンプ `user_mode`
--

INSERT INTO `user_mode` (`user_mode_id`, `mode_name`) VALUES
(0, 'その他'),
(1, '送信者'),
(2, '受信者');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`,`flag_id`),
  ADD KEY `flag_id` (`flag_id`);

--
-- テーブルのインデックス `download`
--
ALTER TABLE `download`
  ADD PRIMARY KEY (`download_id`,`user_id`,`file_info_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `file_info_id` (`file_info_id`);

--
-- テーブルのインデックス `file_info`
--
ALTER TABLE `file_info`
  ADD PRIMARY KEY (`file_info_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- テーブルのインデックス `flag`
--
ALTER TABLE `flag`
  ADD PRIMARY KEY (`flag_id`);

--
-- テーブルのインデックス `login_sessions`
--
ALTER TABLE `login_sessions`
  ADD PRIMARY KEY (`login_session_id`,`user_id`,`account_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `user_id` (`user_id`);

--
-- テーブルのインデックス `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`,`flag_id`,`user_mode_id`),
  ADD KEY `flag_id` (`flag_id`),
  ADD KEY `user_mode_id` (`user_mode_id`);

--
-- テーブルのインデックス `user_mode`
--
ALTER TABLE `user_mode`
  ADD PRIMARY KEY (`user_mode_id`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int(32) NOT NULL AUTO_INCREMENT;

--
-- テーブルのAUTO_INCREMENT `download`
--
ALTER TABLE `download`
  MODIFY `download_id` int(32) NOT NULL AUTO_INCREMENT;

--
-- テーブルのAUTO_INCREMENT `file_info`
--
ALTER TABLE `file_info`
  MODIFY `file_info_id` int(32) NOT NULL AUTO_INCREMENT;

--
-- テーブルのAUTO_INCREMENT `login_sessions`
--
ALTER TABLE `login_sessions`
  MODIFY `login_session_id` int(32) NOT NULL AUTO_INCREMENT;

--
-- テーブルのAUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(32) NOT NULL AUTO_INCREMENT;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`flag_id`) REFERENCES `flag` (`flag_id`);

--
-- テーブルの制約 `download`
--
ALTER TABLE `download`
  ADD CONSTRAINT `download_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `download_ibfk_2` FOREIGN KEY (`file_info_id`) REFERENCES `file_info` (`file_info_id`);

--
-- テーブルの制約 `file_info`
--
ALTER TABLE `file_info`
  ADD CONSTRAINT `file_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- テーブルの制約 `login_sessions`
--
ALTER TABLE `login_sessions`
  ADD CONSTRAINT `login_sessions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  ADD CONSTRAINT `login_sessions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- テーブルの制約 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`flag_id`) REFERENCES `flag` (`flag_id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`user_mode_id`) REFERENCES `user_mode` (`user_mode_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
