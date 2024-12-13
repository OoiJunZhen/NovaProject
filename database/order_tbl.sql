-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2024 at 09:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nova_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `order_tbl`
--

CREATE TABLE `order_tbl` (
  `id` int(11) NOT NULL,
  `ticket_number` varchar(255) DEFAULT NULL,
  `ticket_number2` varchar(255) DEFAULT NULL,
  `six_dgd` varchar(255) DEFAULT NULL,
  `user_inputs` text DEFAULT NULL,
  `formatted_data` text DEFAULT NULL,
  `details` varchar(1000) NOT NULL,
  `total_price` float DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_tbl`
--

INSERT INTO `order_tbl` (`id`, `ticket_number`, `ticket_number2`, `six_dgd`, `user_inputs`, `formatted_data`, `details`, `total_price`, `timestamp`) VALUES
(1, '1', '1', '111111', '[{\"id\":1,\"value\":\"1\"},{\"id\":2,\"value\":\"6473#1\"}]', 'M\n6473 B1', '(PP)\nB13/12/99 15:09:12\nSG0003#1\n*BSAC4A 1*1\n30/11\nM\n6473 B1\nT = 1\nNT = 1\n1 PP\nFree 6D GD\n30/11\n111111\nSila semak resit.\nBayaran ikut resit.', 1, '2024-12-13 07:09:13'),
(2, '5', '5', '8888', '[{\"id\":1,\"value\":\"12\"},{\"id\":2,\"value\":\"4694#1\"}]', 'MK\n4694 B1', '(PP)\nB13/12/99 16:48:52\nSG0003#5\n*BSAC4A 1*1\n30/11\nMK\n4694 B1\nT = 2\nNT = 2\n5 PP\nFree 6D GD\n30/11\n8888\nSila semak resit.\nBayaran ikut resit.', 2, '2024-12-13 08:48:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_tbl`
--
ALTER TABLE `order_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_tbl`
--
ALTER TABLE `order_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
