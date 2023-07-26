-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: user_management
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app_key`
--

DROP TABLE IF EXISTS `app_key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_key` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `platform` varchar(255) NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `is_active` float DEFAULT 1,
  `status` float DEFAULT 0,
  `create_date` datetime DEFAULT current_timestamp(),
  `update_date` datetime DEFAULT current_timestamp(),
  `delete_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_key`
--

LOCK TABLES `app_key` WRITE;
/*!40000 ALTER TABLE `app_key` DISABLE KEYS */;
INSERT INTO `app_key` VALUES (1,1,'android','android-sdk','qkbb1l1qjcg-uh49ielv9h',1,0,'2023-07-25 20:13:09','2023-07-25 20:13:09',NULL),(2,1,'string','string','string',1,1,'2023-07-25 20:16:14','2023-07-25 20:16:14',NULL),(3,5,'android','Android SDK','5_otl8wb420c7-o55ch1tto1s',1,0,'2023-07-25 20:53:22','2023-07-25 20:53:22',NULL),(4,5,'Geocode','Geocode','5_jktdianaf8-0e8qs3aliyqk',1,0,'2023-07-25 22:43:17','2023-07-25 22:43:17',NULL),(5,5,'Geocode 2','Geocode','5_7kugz2ocumb-zun0bkoanyd',1,0,'2023-07-25 22:43:51','2023-07-25 22:43:51',NULL),(6,5,'android','Android SDK','5_38okqahj427-unjkbgjt0ej',1,0,'2023-07-25 22:46:04','2023-07-25 22:46:04',NULL),(7,5,'Geocode 2','Geocode','5_4d7kyoeeklb-9hwromqv45d',1,0,'2023-07-25 22:47:09','2023-07-25 22:47:09',NULL),(8,5,'android','Android SDK','5_wvnaifmv48j-ivtjci4r1bb',1,0,'2023-07-25 22:47:44','2023-07-25 22:47:44',NULL),(9,5,'android','Android SDK','5_rgfv6067d5d-g9m31tov7h6',1,0,'2023-07-25 22:47:58','2023-07-25 22:47:58',NULL),(10,5,'Geocode 2','IOS SDK','5_q935hnvsp1-cf6sco6nltc',1,0,'2023-07-26 09:28:27','2023-07-26 09:28:27',NULL);
/*!40000 ALTER TABLE `app_key` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `app_key` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `is_delete` float DEFAULT 0,
  `create_date` datetime DEFAULT current_timestamp(),
  `update_date` datetime DEFAULT current_timestamp(),
  `delete_date` datetime DEFAULT NULL,
  `is_email_verified` float DEFAULT 0,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nuoinguyen@gmail.com','$2a$10$Rp741B3jhL1xKLGvVYYCz.8n2whCh5hy.ngHMpLVz73raDQvnkbxG','Nuoi','Nguyen','CC Conic DNA','0988219148',1,1,'1_tvv9btmllwm-xce7cz3cvb',0,0,'2023-07-25 02:18:40','2023-07-25 02:18:40',NULL,0,'cef795b55e280f05f7464da9e462c68737a70c33f35a03aae7586bc679e9e4ef',NULL),(3,'string','string','string','string','string','string',0,1,'',0,1,'2023-07-25 04:29:14','2023-07-25 04:29:14','2023-07-25 00:54:11',1,NULL,NULL),(4,'nuoinguyen1@gmail.com','$2a$10$YP4CLUumr3fb6fKRJRwe5eZ1qWRXPSibjEVs0Xm8HKbowDxUZruQy','Nuoi','Nguyen','CC Conic DNA','0988219148',1,1,'4_v58ab9eg8rm-yd363pptvfb',0,0,'2023-07-25 00:55:37','2023-07-25 00:55:37',NULL,0,NULL,NULL),(5,'nuoipro@gmail.com','$2a$10$2pCvtJoeJdaiudqv4R4mteSZ1e/Rf.RmsDn6/28ZiGmw61/A8GnCu','nuoi','nguyen','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 06:26:36','2023-07-25 06:26:36',NULL,0,'',NULL),(6,'nuoipro1@gmail.com','$2a$10$wZfH6XJx..YAuh/1Ktxdv.8mdTy8LeRhOT5VTTwYMD/CLRNIIFs.m','Nuoinguyen','Van','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 06:34:53','2023-07-25 06:34:53',NULL,0,NULL,NULL),(7,'nuoipro2@gmail.com','$2a$10$cjygVlYHsejJekaNu4VG8.D8Oqc1tj9Ff95Lz9YAJ3rrf/mJZlDuu','nuoi','nguyen','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 06:55:54','2023-07-25 06:55:54',NULL,0,NULL,NULL),(8,'nuoipro33@gmail.com','$2a$10$DWXoSSeq5s2AFvxb4PbO/.pMgOaEMxnOD4Wyi8329zfSKssWoJlUy','nuoinguyen','Van','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 07:30:10','2023-07-25 07:30:10',NULL,0,NULL,NULL),(9,'nuoipro23@gmail.com','$2a$10$2G/4WjlhPM8DqBhzQtWDoekxaA0vyq/ZL7ZNQhrNjIR3vwMvYU92i','Nuoi','Nguyen','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 07:31:28','2023-07-25 07:31:28',NULL,0,NULL,NULL),(10,'nuoipro12@gmail.com','$2a$10$Vyr9xUIbn3.njlqkC6EvO.gomnTAOoQuYQK.hRkdvAdszh3r8WLwm','sfsd','sdfsdf','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 07:51:00','2023-07-25 07:51:00',NULL,0,NULL,NULL),(11,'nuoipro01@gmail.com','$2a$10$h42uChmqRDS/HNN5BFy3UOZ75AANRi1HGjQJarZn0c1mvAYqhyPH.','asdd','asdasd','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 07:52:45','2023-07-25 07:52:45',NULL,0,NULL,NULL),(12,'nuoipro234@gmail.com','$2a$10$OI7k034cFt7daafVOU9okenwn8UavhV71ulZVgXmTEDvvE.v6U2fe','sdf','sdfsdf','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 08:04:30','2023-07-25 08:04:30',NULL,0,NULL,NULL),(13,'nuoipro121@gmail.com','$2a$10$xu6IksGACvMdhI881txz5e59krI7NhQkR8/Pvb2yJkX.4WMAAbT/2','adas','asd','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 09:39:08','2023-07-25 09:39:08',NULL,0,NULL,NULL),(14,'nuoipro1221@gmail.com','$2a$10$25pyWcWU3es2YLgMXnSO..x83UtPvMlAVmrZfPCp9eaSfC0I.Y6Cm','adas','asd','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 09:39:15','2023-07-25 09:39:15',NULL,0,NULL,NULL),(15,'nuoipro002@gmail.com','$2a$10$1xOgpb6nWARR899KNat4uu0tEZZaFHXur38eBSCQPGeXQKQZa6JgO','ret','er','er','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 09:40:01','2023-07-25 09:40:01',NULL,0,NULL,NULL),(16,'nuoipro003@gmail.com','$2a$10$3KcUyVO.mnmOXMfDpZUze.5Tb/bT6d9MIhv8zd5yeIU6/AZ9H4Xf.','das','asd','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 09:40:48','2023-07-25 09:40:48',NULL,0,NULL,NULL),(17,'nuoipro@gmail.com004','$2a$10$Xi.3actQI.STcReODdzhAuoE.3BWD6dTN4.eAKS0Ynh3GOzphNaQS','asd','asdasd','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 09:41:51','2023-07-25 09:41:51',NULL,0,NULL,NULL),(18,'nuoipro005@gmail.com','$2a$10$S11brl6rg5PXo9cpwQTi3O9bUWqeBKTZ2PILw7uogZf81Orc6/mXe','asdasd','asd','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 09:42:46','2023-07-25 09:42:46',NULL,0,NULL,NULL),(19,'nuoipro3212@gmail.com','$2a$10$SVGf3U4x5/Ztsswi880f9ujLBt/ZME8Rhdvyl7F7WRsn7gLLUx8ke','asd','asd','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 09:43:58','2023-07-25 09:43:58',NULL,0,NULL,NULL),(20,'nuoipro12345@gmail.com','$2a$10$qlTth2Nz7EJMAALu6/hfMuhi9UpaUuiAnIYsUb4h/20ysQAlg.PMe','sdsd','sdf','sd','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 10:04:13','2023-07-25 10:04:13',NULL,0,NULL,NULL),(21,'nuoipro334@gmail.com','$2a$10$KSBjHdzZ1HQBFiTBJuGupuxuuAqQ5TbeEi7PvzE.5eD2QKqbGe6ea','asd','asd','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 10:09:58','2023-07-25 10:09:58',NULL,0,NULL,NULL),(22,'nuoipro13113232@gmail.com','$2a$10$I4tS8k9ZlwkJj1jp7Y4ygO1O44/WtLqLJgBT7LDJCLJfgdUUwAoAy','sfsdf','dfsdfsdf','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 10:15:40','2023-07-25 10:15:40',NULL,0,NULL,NULL),(23,'nuoipro2342423@gmail.com','$2a$10$SpoL1PsRA9Kb.HkQq3iZHuIwxByiq4rqRVMxx1IPFb9KvN4j9qaIe','wtwe','twe','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 12:58:36','2023-07-25 12:58:36',NULL,0,NULL,NULL),(24,'nuoipro4124@gmail.com','$2a$10$83Ekx98OqcXSq6kD8SfY0u/bbgVKtpNRhcnFFXKReOkwz5ftlWAWW','test','test','C901 c/c Conic ĐNA, Xã phong Phú, Huyện Bình Chánh','0988219148',2,1,NULL,NULL,NULL,'2023-07-25 22:48:31','2023-07-25 22:48:31',NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-26 16:41:09
