-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2024 at 05:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hardeil_custodian`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventory_tbl`
--

CREATE TABLE `inventory_tbl` (
  `id` int(11) NOT NULL,
  `sup_id` int(50) NOT NULL,
  `prod_id` int(50) NOT NULL,
  `inv_quantity` int(11) NOT NULL,
  `inv_product_condition` varchar(50) NOT NULL,
  `inv_release` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_tbl`
--

INSERT INTO `inventory_tbl` (`id`, `sup_id`, `prod_id`, `inv_quantity`, `inv_product_condition`, `inv_release`) VALUES
(66, 15, 117, 110, 'new,damage', 0),
(67, 14, 0, 90, 'new, good', 0);

-- --------------------------------------------------------

--
-- Table structure for table `logs_tbl`
--

CREATE TABLE `logs_tbl` (
  `logs_id` int(50) NOT NULL,
  `logs_activity` varchar(50) NOT NULL,
  `logs_dateTime` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logs_tbl`
--

INSERT INTO `logs_tbl` (`logs_id`, `logs_activity`, `logs_dateTime`) VALUES
(1, '', ''),
(2, '', ''),
(3, 'You added Product', '2024-1-30'),
(4, '', ''),
(5, 'You edited Product', '2024-1-30'),
(6, 'You edited Product', '2024-1-31'),
(7, 'You edited Product', '2024-1-31'),
(8, 'You edited Product', '2024-2-6');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_tbl`
--

CREATE TABLE `purchase_tbl` (
  `purchase_id` int(11) NOT NULL,
  `reg_ID` int(50) NOT NULL,
  `prod_id` int(50) NOT NULL,
  `purchase_quantity` int(50) NOT NULL,
  `sup_id` int(50) NOT NULL,
  `purchase_order_date` varchar(50) NOT NULL,
  `purchase_status` varchar(50) NOT NULL,
  `purchase_delivered_date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_tbl`
--

INSERT INTO `purchase_tbl` (`purchase_id`, `reg_ID`, `prod_id`, `purchase_quantity`, `sup_id`, `purchase_order_date`, `purchase_status`, `purchase_delivered_date`) VALUES
(36, 54, 164, 20, 16, '2024-02-05', 'Received', '2024-02-06'),
(37, 72, 153, 0, 15, '2024-02-06', 'Received', '2024-02-07');

-- --------------------------------------------------------

--
-- Table structure for table `release_tbl`
--

CREATE TABLE `release_tbl` (
  `release_id` int(50) NOT NULL,
  `reg_ID` int(50) NOT NULL,
  `prod_id` int(50) NOT NULL,
  `release_release` int(50) NOT NULL,
  `release_date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `release_tbl`
--

INSERT INTO `release_tbl` (`release_id`, `reg_ID`, `prod_id`, `release_release`, `release_date`) VALUES
(41, 54, 153, 10, '2024-01-28'),
(43, 70, 153, 10, '2024-01-28'),
(47, 72, 153, 10, '2024-01-31');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE `tbl_product` (
  `prod_id` int(10) NOT NULL,
  `prod_name` varchar(50) NOT NULL,
  `prod_description` varchar(100) NOT NULL,
  `prod_quantity` int(50) NOT NULL,
  `prod_category` varchar(50) NOT NULL,
  `prod_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`prod_id`, `prod_name`, `prod_description`, `prod_quantity`, `prod_category`, `prod_status`) VALUES
(153, 'PE TShirt', 'clothing that pupils are required to wear at school', 0, 'PE Gear', 'not available'),
(157, 'PE Shoes', ' lightweight and breathable', 20, 'PE Gear', 'available'),
(164, 'Teacher Type B', ' lightweight and breathable', 30, 'Type B', 'available'),
(165, 'PE Jogging Pants', ' lightweight and breathable', 20, 'PE Gear', 'available'),
(169, 'Teacher Uniform', 'the clothing that teacher are required to wear at school', 61, 'Uniforms', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplier`
--

CREATE TABLE `tbl_supplier` (
  `sup_id` int(10) NOT NULL,
  `sup_fname` varchar(50) NOT NULL,
  `sup_lname` varchar(50) NOT NULL,
  `sup_gender` varchar(50) NOT NULL,
  `sup_contactNo` int(50) NOT NULL,
  `sup_company` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_supplier`
--

INSERT INTO `tbl_supplier` (`sup_id`, `sup_fname`, `sup_lname`, `sup_gender`, `sup_contactNo`, `sup_company`) VALUES
(14, 'Lani', 'Salmeron', 'Female', 12312321, 'suns '),
(15, 'Hardeil', 'Salmeron', 'sad', 12321312, 'sad'),
(16, 'sad', 'sad', 'Male', 2023, 'sad'),
(17, 'jake', 'sully', 'Male', 2023, 'sad'),
(65, 'gas', 'gas', 'male', 2147483647, 'lacking');

-- --------------------------------------------------------

--
-- Table structure for table `user_tbl`
--

CREATE TABLE `user_tbl` (
  `reg_ID` int(10) NOT NULL,
  `reg_Fname` varchar(50) NOT NULL,
  `reg_Lname` varchar(50) NOT NULL,
  `reg_username` varchar(50) NOT NULL,
  `reg_contact` varchar(50) NOT NULL,
  `reg_address` varchar(50) NOT NULL,
  `reg_email` varchar(50) NOT NULL,
  `reg_password` varchar(100) NOT NULL,
  `reg_role` varchar(50) NOT NULL,
  `reg_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`reg_ID`, `reg_Fname`, `reg_Lname`, `reg_username`, `reg_contact`, `reg_address`, `reg_email`, `reg_password`, `reg_role`, `reg_status`) VALUES
(54, 'Hardeil', 'Salmeron', 'sad', '12312', 'sad', 'hardeilsalmeron5@gmail.com', '$2y$10$K22EJBi00y3UaDODdIzZQu9SJC0u6KX.RYFu1zc9s.Ix0B6ysIVxe', 'Admin', 'Active'),
(67, 'hag', 'hag', 'hag', '2131234124', 'Tungkop', 'hardeilsalmeron5@gmail.com', '$2y$10$K22EJBi00y3UaDODdIzZQu9SJC0u6KX.RYFu1zc9s.Ix0B6ysIVxe', 'Staff', 'Active'),
(70, 'Hardeil', 'Salmeron', 'hardeil', '09297782088', 'Tungkop', 'hardeilsalmeron5@gmail.com', '$2y$10$K22EJBi00y3UaDODdIzZQu9SJC0u6KX.RYFu1zc9s.Ix0B6ysIVxe', 'Staff', 'Active'),
(72, 'Hardeil', 'Salmeron', 'fag', '12312', 'Tungkop', 'hardeilsalmeron5@gmail.com', '$2y$10$K22EJBi00y3UaDODdIzZQu9SJC0u6KX.RYFu1zc9s.Ix0B6ysIVxe', 'Staff', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inventory_tbl`
--
ALTER TABLE `inventory_tbl`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sup_id` (`sup_id`);

--
-- Indexes for table `logs_tbl`
--
ALTER TABLE `logs_tbl`
  ADD PRIMARY KEY (`logs_id`);

--
-- Indexes for table `purchase_tbl`
--
ALTER TABLE `purchase_tbl`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `reg_ID` (`reg_ID`),
  ADD KEY `sup_id` (`sup_id`);

--
-- Indexes for table `release_tbl`
--
ALTER TABLE `release_tbl`
  ADD PRIMARY KEY (`release_id`),
  ADD KEY `reg_ID` (`reg_ID`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `prod_id_2` (`prod_id`);

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indexes for table `tbl_supplier`
--
ALTER TABLE `tbl_supplier`
  ADD PRIMARY KEY (`sup_id`);

--
-- Indexes for table `user_tbl`
--
ALTER TABLE `user_tbl`
  ADD PRIMARY KEY (`reg_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventory_tbl`
--
ALTER TABLE `inventory_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `logs_tbl`
--
ALTER TABLE `logs_tbl`
  MODIFY `logs_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `purchase_tbl`
--
ALTER TABLE `purchase_tbl`
  MODIFY `purchase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `release_tbl`
--
ALTER TABLE `release_tbl`
  MODIFY `release_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `tbl_product`
--
ALTER TABLE `tbl_product`
  MODIFY `prod_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `tbl_supplier`
--
ALTER TABLE `tbl_supplier`
  MODIFY `sup_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `user_tbl`
--
ALTER TABLE `user_tbl`
  MODIFY `reg_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `purchase_tbl`
--
ALTER TABLE `purchase_tbl`
  ADD CONSTRAINT `purchase_tbl_ibfk_1` FOREIGN KEY (`reg_ID`) REFERENCES `user_tbl` (`reg_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `purchase_tbl_ibfk_2` FOREIGN KEY (`sup_id`) REFERENCES `tbl_supplier` (`sup_id`);

--
-- Constraints for table `release_tbl`
--
ALTER TABLE `release_tbl`
  ADD CONSTRAINT `release_tbl_ibfk_1` FOREIGN KEY (`reg_ID`) REFERENCES `user_tbl` (`reg_ID`),
  ADD CONSTRAINT `release_tbl_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `tbl_product` (`prod_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
