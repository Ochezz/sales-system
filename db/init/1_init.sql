-- --------------------------------------------------------
-- 호스트:                          localhost
-- 서버 버전:                        10.7.3-MariaDB-1:10.7.3+maria~focal - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- salessystem 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `salessystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `salessystem`;

-- 테이블 salessystem.sales_channel 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_channel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `channel_name` varchar(255) NOT NULL,
  `channel_name_url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) DEFAULT '최고관리자',
  `service` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1->유효, 0->삭제 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 salessystem.sales_channel:~8 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_channel` DISABLE KEYS */;
INSERT INTO `sales_channel` (`id`, `channel_name`, `channel_name_url`, `description`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`) VALUES
	(1, '네이버 롤링보드', 'naver_rolling / banner', '0ㅁㅁ', '2022-03-23 22:24:11', 'admin', '2022-03-23 22:24:16', 'admin', 1),
	(2, '네이버 브검pc', 'naver_bs_pc / banner', NULL, '2022-03-23 22:24:12', 'admin', '2022-03-23 22:24:16', 'admin', 1),
	(3, '네이버브검_mo', 'naver_bs_mo / banner', NULL, '2022-03-23 22:24:13', 'admin', '2022-03-23 22:24:17', 'admin', 1),
	(4, '구글 GDN', 'google_gdn_mo_re / cpc', NULL, '2022-03-23 22:24:13', 'admin', '2022-03-23 22:24:17', 'admin', 1),
	(5, '유튜브 인비디오', 'youtube_invideo / cpc', NULL, '2022-03-23 22:24:14', 'admin', '2022-03-23 22:24:18', 'admin', 1),
	(14, '구글올가닉test', 'google / organic', '123456testtest', '2022-03-23 22:24:15', 'admin', '2022-04-02 11:23:06', 'system', 1),
	(16, 'testtest', 'testtest', 'testtest', '2022-04-02 11:23:21', 'system', '2022-04-02 11:59:24', 'system', 0),
	(17, 'ㅅㄷㄴㅅㄷㄴ', 'ㅅㄷㄴㅅㄷㄴ', 'ㅅㄷㄴㅅㄷㄴ', '2022-04-02 12:06:01', 'system', '2022-04-02 12:06:20', 'system', 0);
/*!40000 ALTER TABLE `sales_channel` ENABLE KEYS */;

-- 테이블 salessystem.sales_interested_customers_setting 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_interested_customers_setting` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `personal_information_text` text DEFAULT NULL,
  `use_name` tinyint(4) DEFAULT 0 COMMENT '1->사용, 0->비사용',
  `use_phone` tinyint(4) DEFAULT 0 COMMENT '1->사용, 0->비사용',
  `use_age_group` tinyint(4) DEFAULT 0 COMMENT '1->사용, 0->비사용',
  `use_email` tinyint(4) DEFAULT 0 COMMENT '1->사용, 0->비사용',
  `use_address` tinyint(4) DEFAULT 0 COMMENT '1->사용, 0->비사용',
  `use_marketting` tinyint(4) DEFAULT 0 COMMENT '1->사용, 0->비사용',
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) DEFAULT '최고관리자',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 salessystem.sales_interested_customers_setting:~11 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_interested_customers_setting` DISABLE KEYS */;
INSERT INTO `sales_interested_customers_setting` (`id`, `personal_information_text`, `use_name`, `use_phone`, `use_age_group`, `use_email`, `use_address`, `use_marketting`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
	(1, 'test', 1, 1, 1, 1, 1, 1, '2022-03-23 22:25:22', 'admin', '2022-03-23 22:25:31', 'admin'),
	(22, 'test', 0, 0, 0, 0, 0, 0, '2022-03-23 22:25:23', 'admin', '2022-03-23 22:25:32', 'admin'),
	(23, 'test', 1, 1, 1, 1, 1, 1, '2022-03-23 22:25:23', 'admin', '2022-03-23 22:25:31', 'admin'),
	(24, 'test', 0, 0, 0, 0, 0, 0, '2022-03-23 22:25:24', 'admin', '2022-03-23 22:25:30', 'admin'),
	(25, 'test', 1, 0, 0, 0, 0, 0, '2022-03-23 22:25:24', 'admin', '2022-03-23 22:25:30', 'admin'),
	(26, 'test', 1, 0, 0, 1, 0, 0, '2022-03-23 22:25:25', 'admin', '2022-03-23 22:25:29', 'admin'),
	(27, 'test', 1, 0, 0, 1, 1, 1, '2022-03-23 22:25:25', 'admin', '2022-03-23 22:25:29', 'admin'),
	(28, 'test', 1, 1, 1, 1, 1, 1, '2022-03-23 22:25:26', 'admin', '2022-03-23 22:25:28', 'admin'),
	(29, 'test', 1, 1, 1, 1, 1, 1, '2022-03-23 22:25:26', 'admin', '2022-03-23 22:25:28', 'admin'),
	(30, 'test', 1, 0, 1, 1, 1, 1, '2022-03-23 22:25:27', 'admin', '2022-03-23 22:25:27', 'admin'),
	(31, 'test', 1, 1, 1, 1, 1, 1, '2022-04-02 12:19:12', 'system', '2022-04-02 12:19:12', 'system');
/*!40000 ALTER TABLE `sales_interested_customers_setting` ENABLE KEYS */;

-- 테이블 salessystem.sales_interested_customers 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_interested_customers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(12) DEFAULT NULL COMMENT '구분코드 incu -> 관심고객',
  `user_id` varchar(12) DEFAULT NULL,
  `user_pass` varchar(100) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_phone` varchar(50) DEFAULT NULL,
  `age_group` int(11) DEFAULT NULL,
  `birthday` varchar(50) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `address1` varchar(100) DEFAULT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `use_marketting` tinyint(4) DEFAULT 0 COMMENT '1->동의,  0->거부 ',
  `created_day` varchar(100) DEFAULT NULL,
  `registration_device` varchar(5) DEFAULT 'P' COMMENT 'pc->p,모바일->M',
  `cs_memo` text DEFAULT NULL,
  `visit_route` varchar(100) DEFAULT NULL,
  `visit_route_others` varchar(900) DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) DEFAULT '최고관리자',
  `service` tinyint(4) DEFAULT 1 COMMENT '1->유효, 0->삭제 ',
  `setting_type` bigint(20) DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `sales_interested_customers_FK` (`setting_type`),
  CONSTRAINT `sales_interested_customers_FK` FOREIGN KEY (`setting_type`) REFERENCES `sales_interested_customers_setting` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 salessystem.sales_interested_customers:~12 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_interested_customers` DISABLE KEYS */;
INSERT INTO `sales_interested_customers` (`id`, `code`, `user_id`, `user_pass`, `user_name`, `user_phone`, `age_group`, `birthday`, `zip_code`, `address1`, `address2`, `mail`, `use_marketting`, `created_day`, `registration_device`, `cs_memo`, `visit_route`, `visit_route_others`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`, `setting_type`) VALUES
	(1, 'incu', 'test1', 'test1', '콩순이', '010-0000-0000', 20, '1993-01-01', '4520', '서울특별시', '중구청 계천로 14', 'test1@test.com', 1, '2022-02-07', 'm', 'test1', 'bus', 'busbus', '2022-03-23 22:24:37', 'admin', '2022-03-23 22:24:45', 'admin', 1, 1),
	(2, 'incu', 'test2', 'test2', '팥순이', '010-0000-0001', 30, '1984-01-01', '41068', '대구광역시', '동구 첨단로 53', 'test2@test.com', 1, '2022-02-08', 'm', 'test2', 'bus', 'busbus', '2022-03-23 22:24:38', 'admin', '2022-03-23 22:24:46', 'admin', 1, 1),
	(3, 'incu', 'test4', 'test4', '철수', '010-0000-0002', 50, '1964-01-01', '18476', '울산광역시', '북구 천곡동', 'test4@test.com', 1, '2022-02-10', 'm', 'test4', 'bus', 'busbus', '2022-03-23 22:24:38', 'admin', '2022-03-23 22:24:46', 'admin', 1, 1),
	(4, 'incu', 'test5', 'test5', '훈이', '010-0000-0003', 60, '1954-01-01', '14931', '경기도 시흥시', '북구', 'test5@test.com', 1, '2022-02-11', 'm', 'test5', 'bus', 'busbus', '2022-03-23 22:24:39', 'admin', '2022-03-23 22:24:47', 'admin', 1, 1),
	(5, 'incu', 'test6', 'test6', '신짱구', '010-0000-0004', 20, '1995-01-01', '47608', '부산광역시', '연제구', 'test6@test.com', 1, '2022-02-07', 'm', 'test6', 'bus', 'busbus', '2022-03-23 22:24:39', 'admin', '2022-03-23 22:24:47', 'admin', 1, 1),
	(6, 'incu', 'test3', 'test3', '칠갑이', '010-0000-0050', 40, '1974-01-01', '63568', '제주특별자치도 서귀포시', '서호 중아로68-11', 'test3@test.com', 1, '2022-02-09', 'm', 'test3', 'bus', 'busbus', '2022-03-23 22:24:40', 'admin', '2022-03-23 22:24:48', 'admin', 1, 1),
	(7, 'incu', 'test7', 'test7', '맹구', '010-0000-0006', 30, '1984-01-01', '42183', '대구광역시', '수성구 무학로', 'test7@test.com', 1, '2022-02-07', 'm', 'test7', 'bus', 'busbus', '2022-03-23 22:24:41', 'admin', '2022-03-23 22:24:48', 'admin', 1, 1),
	(8, 'incu', 'test8', 'test8', '호식', '010-0000-0007', 40, '1974-01-01', '487-7', '인천광역시', '미추홀구', 'test8@test.com', 1, '2022-02-07', 'm', 'test8', 'bus', 'busbus', '2022-03-23 22:24:41', 'admin', '2022-03-23 22:24:49', 'admin', 0, 1),
	(9, 'incu', 'test9', 'test9', '교촌', '010-0000-0008', 20, '1996-01-01', '62050', '광주광역시', '서구', 'test9@test.com', 1, '2022-02-07', 'm', 'test9', 'bus', 'busbus', '2022-03-23 22:24:42', 'admin', '2022-03-23 22:24:49', 'admin', 1, 1),
	(10, 'incu', 'test10', 'test10', '나란', '010-0000-0009', 20, '1994-01-01', '34899', '대전광역시', '중구', 'test10@test.com', 1, '2022-02-07', 'm', 'test10', 'bus', 'busbus', '2022-03-23 22:24:42', 'admin', '2022-03-23 22:24:50', 'admin', 1, 1),
	(11, 'incu', 'test11', 'test11', '나란1', '010-0000-0011', 20, '1994-01-01', '34899', '대전광역시', '중구', 'test11@test.com', 0, '2022-02-07', 'p', 'test11', 'bus', 'busbus', '2022-03-23 22:24:43', 'admin', '2022-03-23 22:24:50', 'admin', 1, 1),
	(12, 'incu', 'test12', 'test12', '나란2', '010-0000-0120', 20, '1994-01-01', '34899', '대전광역시', '중구', 'test12@test.com', 0, '2022-02-07', 'p', 'test12', 'bus', 'busbus', '2022-03-23 22:24:43', 'admin', '2022-03-23 22:24:51', 'admin', 1, 1);
/*!40000 ALTER TABLE `sales_interested_customers` ENABLE KEYS */;

-- 테이블 salessystem.sales_popup 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_popup` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Y : youtube, I : image',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'contents path',
  `disp_size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `href_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '0 왼쪽, 1 가운데, 2 오른쪽',
  `priority` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '0:row, 50 : middle, 100 high',
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_newpage` tinyint(4) DEFAULT 1,
  `is_active` tinyint(4) DEFAULT 1 COMMENT '0,  1-> 유효',
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `service` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_popup:~3 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_popup` DISABLE KEYS */;
INSERT INTO `sales_popup` (`id`, `title`, `type`, `content`, `disp_size`, `href_url`, `position`, `priority`, `start_date`, `end_date`, `is_newpage`, `is_active`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`) VALUES
	(1, 'test1', 'I', 'test1', '854_480', 'www.google.com', '0', '100', '2022-04-02 14:01:20', '2022-04-02 14:01:21', 1, 1, '2022-04-02 14:01:26', '최고관리자', '2022-04-02 14:01:27', '최고관리자', 1),
	(2, 'test2', 'I', 'test2', '854_480', 'www.google.com', '1', '100', '2022-04-02 14:01:20', '2022-04-02 14:01:21', 1, 1, '2022-04-02 14:01:26', '최고관리자', '2022-04-02 14:01:27', '최고관리자', 1),
	(3, 'test3', 'I', 'test3', '854_480', 'www.google.com', '2', '100', '2022-04-02 14:01:20', '2022-04-02 14:01:21', 1, 1, '2022-04-02 14:01:26', '최고관리자', '2022-04-02 14:01:27', '최고관리자', 1);
/*!40000 ALTER TABLE `sales_popup` ENABLE KEYS */;

-- 테이블 salessystem.sales_press_releae 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_press_releae` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumnail_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `media_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_day` date DEFAULT NULL,
  `source_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `detail` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT 1 COMMENT '0 ,  1-> 유효',
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `service` tinyint(4) unsigned DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_press_releae:~3 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_press_releae` DISABLE KEYS */;
INSERT INTO `sales_press_releae` (`id`, `title`, `thumnail_url`, `media_name`, `start_day`, `source_url`, `detail`, `is_active`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`) VALUES
	(1, 'test1', 'XXXXX', 'test1', '2022-03-29', 'https://www.google.com/', 'test1', 1, '2022-03-29 09:22:53', '최고관리자', '2022-03-29 09:22:53', '최고관리자', 1),
	(2, 'test2', 'XXXXX', 'test2', '2022-03-29', 'https://www.naver.com/', 'test2', 1, '2022-03-29 09:23:29', '최고관리자', '2022-03-29 09:23:29', '최고관리자', 1),
	(3, 'test3', 'XXXXX', 'test3', '2022-03-29', 'https://www.yahoo.co.jp/', 'test3', 1, '2022-03-29 09:24:55', '최고관리자', '2022-03-29 09:24:55', '최고관리자', 1);
/*!40000 ALTER TABLE `sales_press_releae` ENABLE KEYS */;

-- 테이블 salessystem.sales_visit_reservations_setting 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_visit_reservations_setting` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `visit_day` date NOT NULL,
  `visit_time` time NOT NULL DEFAULT '00:00:00',
  `maximum_num` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `service` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_visit_reservations_setting:~9 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_visit_reservations_setting` DISABLE KEYS */;
INSERT INTO `sales_visit_reservations_setting` (`visit_day`, `visit_time`, `maximum_num`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`) VALUES
	('2022-03-29', '09:00:00', 3, '2022-03-29 09:25:34', '최고관리자', '2022-03-29 09:25:34', '최고관리자', 1),
	('2022-03-29', '10:00:00', 3, '2022-03-29 09:25:54', '최고관리자', '2022-03-29 09:25:54', '최고관리자', 1),
	('2022-03-29', '11:00:00', 3, '2022-03-29 09:26:07', '최고관리자', '2022-03-29 09:26:07', '최고관리자', 1),
	('2022-03-29', '12:00:00', 4, '2022-03-29 09:26:21', '최고관리자', '2022-03-29 09:26:21', '최고관리자', 1),
	('2022-03-29', '13:00:00', 3, '2022-03-29 09:26:33', '최고관리자', '2022-03-29 09:26:33', '최고관리자', 1),
	('2022-03-29', '14:00:00', 3, '2022-03-29 09:26:56', '최고관리자', '2022-03-29 09:26:56', '최고관리자', 1),
	('2022-03-29', '15:00:00', 3, '2022-03-29 09:26:43', '최고관리자', '2022-03-29 09:26:43', '최고관리자', 1),
	('2022-03-29', '16:00:00', 3, '2022-03-29 09:27:30', '최고관리자', '2022-03-29 09:27:30', '최고관리자', 1),
	('2022-03-29', '17:00:00', 3, '2022-03-29 09:27:36', '최고관리자', '2022-03-29 09:27:36', '최고관리자', 1);
/*!40000 ALTER TABLE `sales_visit_reservations_setting` ENABLE KEYS */;

-- 테이블 salessystem.sales_visit_reservations 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_visit_reservations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `visit_date_key` bigint(20) NOT NULL,
  `user_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `memo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visit_num` int(11) DEFAULT 1,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `service` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `sales_visit_reservations_FK` (`visit_date_key`),
  CONSTRAINT `sales_visit_reservations_FK` FOREIGN KEY (`visit_date_key`) REFERENCES `sales_visit_reservations_setting` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_visit_reservations:~9 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_visit_reservations` DISABLE KEYS */;
INSERT INTO `sales_visit_reservations` (`id`, `user_name`, `user_phone`, `memo`, `visit_num`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`, `visit_date_key`) VALUES
	(1, 'test1', '000-0000-0000', 'test1', 1, '2022-03-29 09:28:34', '최고관리자', '2022-03-29 09:28:34', '최고관리자', 1, '1'),
	(2, 'test2', '000-0000-0000', 'test2', 1, '2022-03-29 09:29:08', '최고관리자', '2022-03-29 09:29:08', '최고관리자', 1, '2'),
	(3, 'test3', '000-0000-0000', 'test3', 1, '2022-03-29 09:30:06', '최고관리자', '2022-03-29 09:30:06', '최고관리자', 1, '3'),
	(4, 'test4', '000-0000-0000', 'test4', 1, '2022-03-29 09:30:22', '최고관리자', '2022-03-29 09:30:22', '최고관리자', 1, '4'),
	(5, 'test5', '000-0000-0000', 'test5', 1, '2022-03-29 09:30:42', '최고관리자', '2022-03-29 09:30:42', '최고관리자', 1, '5'),
	(6, 'test6', '000-0000-0000', 'test6', 1, '2022-03-29 09:30:59', '최고관리자', '2022-03-29 09:31:06', '최고관리자', 1, '6'),
	(7, 'test7', '000-0000-0000', 'test7', 1, '2022-03-29 09:31:20', '최고관리자', '2022-03-29 09:31:20', '최고관리자', 1, '7'),
	(8, 'test8', '000-0000-0000', 'test8', 1, '2022-03-29 09:31:37', '최고관리자', '2022-03-29 09:31:37', '최고관리자', 1, '8'),
	(9, 'test9', '000-0000-0000', 'test9', 1, '2022-03-29 09:32:01', '최고관리자', '2022-03-29 09:32:01', '최고관리자', 1, '9');
/*!40000 ALTER TABLE `sales_visit_reservations` ENABLE KEYS */;

-- 테이블 salessystem.sales_contracts 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_contracts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contracts_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `room_num` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reservation_datetime` datetime DEFAULT NULL,
  `memo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `service` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_contracts:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_contracts` DISABLE KEYS */;
INSERT INTO `sales_contracts` (`id`, `user_name`, `user_phone`, `birthday`, `contracts_type`, `room_num`, `reservation_datetime`, `memo`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`) VALUES
	(10, '호식이', '01000000000', '930501', '59A', '100', '2022-05-14 00:05:47', NULL, '2022-05-14 00:05:50', '최고관리자', '2022-05-14 00:05:51', '최고관리자', 1),
	(11, '두마리', '01000000001', '930502', '59A', '200', '2022-05-14 00:05:47', NULL, '2022-05-14 00:05:50', '최고관리자', '2022-05-14 00:05:51', '최고관리자', 1),
	(12, '치킨이', '01000000002', '930503', '59A', '300', '2022-05-14 00:05:47', NULL, '2022-05-14 00:05:50', '최고관리자', '2022-05-14 00:05:51', '최고관리자', 1);
/*!40000 ALTER TABLE `sales_contracts` ENABLE KEYS */;


-- 테이블 salessystem.sales_visit_contracts_setting 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_visit_contracts_setting` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `visit_day` date NOT NULL,
  `visit_time` time NOT NULL DEFAULT '00:00:00',
  `maximum_num` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `service` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_visit_contracts_setting:~9 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_visit_contracts_setting` DISABLE KEYS */;
INSERT INTO `sales_visit_contracts_setting` (`id`, `visit_day`, `visit_time`, `maximum_num`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`) VALUES
	(1, '2022-03-29', '10:00:00', 3, '2022-03-29 09:25:54', '최고관리자', '2022-03-29 09:25:54', '최고관리자', 1),
	(2, '2022-03-29', '11:00:00', 3, '2022-03-29 09:26:07', '최고관리자', '2022-03-29 09:26:07', '최고관리자', 1),
	(3, '2022-03-29', '12:00:00', 4, '2022-03-29 09:26:21', '최고관리자', '2022-03-29 09:26:21', '최고관리자', 1),
	(4, '2022-03-29', '13:00:00', 3, '2022-03-29 09:26:33', '최고관리자', '2022-03-29 09:26:33', '최고관리자', 1),
	(5, '2022-03-29', '14:00:00', 3, '2022-03-29 09:26:56', '최고관리자', '2022-03-29 09:26:56', '최고관리자', 1),
	(6, '2022-03-29', '15:00:00', 3, '2022-03-29 09:26:43', '최고관리자', '2022-03-29 09:26:43', '최고관리자', 1),
	(7, '2022-03-29', '16:00:00', 3, '2022-03-29 09:27:30', '최고관리자', '2022-03-29 09:27:30', '최고관리자', 1),
	(8, '2022-03-29', '17:00:00', 3, '2022-03-29 09:27:36', '최고관리자', '2022-03-29 09:27:36', '최고관리자', 1),
	(9, '2022-03-29', '09:00:00', 3, '2022-03-29 09:25:34', '최고관리자', '2022-03-29 09:25:34', '최고관리자', 1);
/*!40000 ALTER TABLE `sales_visit_contracts_setting` ENABLE KEYS */;

-- 테이블 salessystem.sales_visit_contracts 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_visit_contracts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `visit_date_key` bigint(20) NOT NULL,
  `user_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `memo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visit_num` int(11) DEFAULT 1,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `service` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `sales_visit_contracts_FK` (`visit_date_key`) USING BTREE,
  CONSTRAINT `sales_visit_contracts_FK` FOREIGN KEY (`visit_date_key`) REFERENCES `sales_visit_contracts_setting` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_visit_contracts:~9 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_visit_contracts` DISABLE KEYS */;
INSERT INTO `sales_visit_contracts` (`id`, `visit_date_key`, `user_name`, `user_phone`, `memo`, `visit_num`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`) VALUES
	(1, 1, 'test1', '000-0000-0000', 'test1', 1, '2022-03-29 09:28:34', '최고관리자', '2022-03-29 09:28:34', '최고관리자', 1),
	(2, 2, 'test2', '000-0000-0000', 'test2', 1, '2022-03-29 09:29:08', '최고관리자', '2022-03-29 09:29:08', '최고관리자', 1),
	(3, 3, 'test3', '000-0000-0000', 'test3', 1, '2022-03-29 09:30:06', '최고관리자', '2022-03-29 09:30:06', '최고관리자', 1),
	(4, 4, 'test4', '000-0000-0000', 'test4', 1, '2022-03-29 09:30:22', '최고관리자', '2022-03-29 09:30:22', '최고관리자', 1),
	(5, 5, 'test5', '000-0000-0000', 'test5', 1, '2022-03-29 09:30:42', '최고관리자', '2022-03-29 09:30:42', '최고관리자', 1),
	(6, 6, 'test6', '000-0000-0000', 'test6', 1, '2022-03-29 09:30:59', '최고관리자', '2022-03-29 09:31:06', '최고관리자', 1),
	(7, 7, 'test7', '000-0000-0000', 'test7', 1, '2022-03-29 09:31:20', '최고관리자', '2022-03-29 09:31:20', '최고관리자', 1),
	(8, 8, 'test8', '000-0000-0000', 'test8', 1, '2022-03-29 09:31:37', '최고관리자', '2022-03-29 09:31:37', '최고관리자', 1),
	(9, 9, 'test9', '000-0000-0000', 'test9', 1, '2022-03-29 09:32:01', '최고관리자', '2022-03-29 09:32:01', '최고관리자', 1);
/*!40000 ALTER TABLE `sales_visit_contracts` ENABLE KEYS */;

-- 테이블 salessystem.sales_visit_payments_setting 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_visit_payments_setting` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `visit_day` date NOT NULL,
  `visit_time` time NOT NULL DEFAULT '00:00:00',
  `maximum_num` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `service` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_visit_payments_setting:~9 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_visit_payments_setting` DISABLE KEYS */;
INSERT INTO `sales_visit_payments_setting` (`id`, `visit_day`, `visit_time`, `maximum_num`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`) VALUES
	(1, '2022-03-29', '09:00:00', 3, '2022-03-29 09:25:34', '최고관리자', '2022-03-29 09:25:34', '최고관리자', 1),
	(2, '2022-03-29', '10:00:00', 3, '2022-03-29 09:25:54', '최고관리자', '2022-03-29 09:25:54', '최고관리자', 1),
	(3, '2022-03-29', '11:00:00', 3, '2022-03-29 09:26:07', '최고관리자', '2022-03-29 09:26:07', '최고관리자', 1),
	(4, '2022-03-29', '12:00:00', 4, '2022-03-29 09:26:21', '최고관리자', '2022-03-29 09:26:21', '최고관리자', 1),
	(5, '2022-03-29', '13:00:00', 3, '2022-03-29 09:26:33', '최고관리자', '2022-03-29 09:26:33', '최고관리자', 1),
	(6, '2022-03-29', '14:00:00', 3, '2022-03-29 09:26:56', '최고관리자', '2022-03-29 09:26:56', '최고관리자', 1),
	(7, '2022-03-29', '15:00:00', 3, '2022-03-29 09:26:43', '최고관리자', '2022-03-29 09:26:43', '최고관리자', 1),
	(8, '2022-03-29', '16:00:00', 3, '2022-03-29 09:27:30', '최고관리자', '2022-03-29 09:27:30', '최고관리자', 1),
	(9, '2022-03-29', '17:00:00', 3, '2022-03-29 09:27:36', '최고관리자', '2022-03-29 09:27:36', '최고관리자', 1);
/*!40000 ALTER TABLE `sales_visit_payments_setting` ENABLE KEYS */;

-- 테이블 salessystem.sales_visit_payments 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_visit_payments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `visit_date_key` bigint(20) NOT NULL,
  `user_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `memo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `room_num` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registration_device` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT 'p' COMMENT 'pc->p,모바일->M',
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `service` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `sales_visit_payments_FK` (`visit_date_key`) USING BTREE,
  CONSTRAINT `sales_visit_payments_FK` FOREIGN KEY (`visit_date_key`) REFERENCES `sales_visit_payments_setting` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_visit_payments:~9 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_visit_payments` DISABLE KEYS */;
INSERT INTO `sales_visit_payments` (`id`, `visit_date_key`, `user_name`, `user_phone`, `memo`, `room_num`, `registration_device`, `created_date`, `created_by`, `updated_date`, `updated_by`, `service`) VALUES
	(1, 1, 'test1', '000-0000-0000', 'test1', '101', 'p', '2022-03-29 09:28:34', '최고관리자', '2022-03-29 09:28:34', '최고관리자', 1),
	(2, 2, 'test2', '000-0000-0000', 'test2', '201', 'm', '2022-03-29 09:29:08', '최고관리자', '2022-03-29 09:29:08', '최고관리자', 1),
	(3, 3, 'test3', '000-0000-0000', 'test3', '1001', 'p', '2022-03-29 09:30:06', '최고관리자', '2022-03-29 09:30:06', '최고관리자', 1),
	(4, 4, 'test4', '000-0000-0000', 'test4', '101', 'm', '2022-03-29 09:30:22', '최고관리자', '2022-03-29 09:30:22', '최고관리자', 1),
	(5, 5, 'test5', '000-0000-0000', 'test5', '103', 'p', '2022-03-29 09:30:42', '최고관리자', '2022-03-29 09:30:42', '최고관리자', 1),
	(6, 6, 'test6', '000-0000-0000', 'test6', '101', 'm', '2022-03-29 09:30:59', '최고관리자', '2022-03-29 09:31:06', '최고관리자', 1),
	(7, 7, 'test7', '000-0000-0000', 'test7', '105', 'p', '2022-03-29 09:31:20', '최고관리자', '2022-03-29 09:31:20', '최고관리자', 1),
	(8, 8, 'test8', '000-0000-0000', 'test8', '101', 'm', '2022-03-29 09:31:37', '최고관리자', '2022-03-29 09:31:37', '최고관리자', 1),
	(9, 9, 'test9', '000-0000-0000', 'test9', '101', 'p', '2022-03-29 09:32:01', '최고관리자', '2022-03-29 09:32:01', '최고관리자', 1);
/*!40000 ALTER TABLE `sales_visit_payments` ENABLE KEYS */;

-- 테이블 salessystem.sales_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_user` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile` tinyint(4) DEFAULT 1 COMMENT '0->최고관리자, 1-> 사이트관리자',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `office_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rank` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `memo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salt` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `updated_date` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '최고관리자',
  `service` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_user:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales_user` ENABLE KEYS */;

-- 테이블 salessystem.sales_accessed_ips 구조 내보내기
CREATE TABLE IF NOT EXISTS `sales_accessed_ips` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `block_count` int(11) NOT NULL DEFAULT 0,
  `block_date` datetime DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '최고관리자',
  `updated_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '최고관리자',
  `service` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1->유효, 0->삭제',
  PRIMARY KEY (`id`),
  KEY `sales_accessed_ips_FK` (`user_id`),
  CONSTRAINT `sales_accessed_ips_FK` FOREIGN KEY (`user_id`) REFERENCES `sales_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테이블 데이터 salessystem.sales_accessed_ips:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sales_accessed_ips` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales_accessed_ips` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
