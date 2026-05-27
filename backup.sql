/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.6-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: triage_academico_db
-- ------------------------------------------------------
-- Server version	11.8.6-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `historial_solicitud`
--

DROP TABLE IF EXISTS `historial_solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_solicitud` (
  `id` uuid NOT NULL,
  `accion_realizada` varchar(255) NOT NULL,
  `fecha_accion` datetime(6) NOT NULL,
  `observaciones` text NOT NULL,
  `solicitud_id` uuid NOT NULL,
  `usuario_id` uuid NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKny9v0r1oew5blgxyvyfgcigwv` (`solicitud_id`),
  KEY `FKnll0oqkrvbpwxb9743uwhufnh` (`usuario_id`),
  CONSTRAINT `FKnll0oqkrvbpwxb9743uwhufnh` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKny9v0r1oew5blgxyvyfgcigwv` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitud` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_solicitud`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `historial_solicitud` WRITE;
/*!40000 ALTER TABLE `historial_solicitud` DISABLE KEYS */;
INSERT INTO `historial_solicitud` VALUES
('bba89c03-8949-47bc-a812-05da771e416b','Solicitud cerrada','2026-05-25 21:38:34.247229','Caso cerrado exitosamente. Estudiante registrado en el sistema académico.','1f5447f8-2bae-4c77-9d42-df7ab90d0308','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('94d65a2d-0d38-4b6b-a8cc-1c664f46cf01','Solicitud registrada','2026-05-08 20:53:05.159334','Canal: CSU','fc9f6ea1-32a3-48f1-b6f6-c76b8edf0a3b','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('d1d31fa7-75d0-49e9-a276-1e17941949f8','Cambio de estado: EN_ATENCION → ATENDIDA','2026-04-12 20:10:12.078200','Se realizó el registro en el sistema académico satisfactoriamente.','54d06c3d-fef9-4f3d-a8ef-e00bda8e37ea','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('faefa9a1-4840-4973-a141-1f3f25b5a9ee','Solicitud registrada','2026-05-25 23:00:28.605446','Canal: PRESENCIAL','5833f9dc-6b52-4f15-b3a4-660100c357c1','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('3b55466a-4bac-4578-a06f-2056f97fb69f','Responsable asignado','2026-05-25 21:36:32.299499','Responsable: María González','1f5447f8-2bae-4c77-9d42-df7ab90d0308','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('b4219af8-4c7d-49b0-be57-20ac4ce078d3','Solicitud registrada','2026-04-12 20:06:12.987747','Canal: CSU','54d06c3d-fef9-4f3d-a8ef-e00bda8e37ea','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('abcd0b28-0903-44fe-8d14-35e4b2d9c352','Solicitud registrada','2026-05-25 22:54:00.717672','Canal: TELEFONICO','3efa3d83-ace2-4d5f-9c75-4d7c6798a4f3','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('dfda31d8-9efb-42d9-9876-455553c4df4f','Cambio de estado: EN_ATENCION → ATENDIDA','2026-04-22 19:16:34.760179','Consulta académica resuelta satisfactoriamente.','9fcf5a4d-0206-43c7-9516-28a6a2684a41','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('9f401b1f-fa87-43df-aa66-50e30d23c3a9','Solicitud clasificada','2026-04-22 18:59:59.277001','Tipo: CONSULTA_ACADEMICA | Prioridad: MEDIA','9fcf5a4d-0206-43c7-9516-28a6a2684a41','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('74910a96-3c64-4c7e-96d2-50f0a03595e1','Solicitud clasificada','2026-04-12 20:08:35.312493','Tipo: REGISTRO_ASIGNATURAS | Prioridad: ALTA','54d06c3d-fef9-4f3d-a8ef-e00bda8e37ea','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('c6b6fa58-60ee-40aa-8990-603c895da324','Solicitud registrada','2026-04-22 18:27:16.675990','Canal: CORREO','9fcf5a4d-0206-43c7-9516-28a6a2684a41','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('379b3eb6-8b86-4225-98a2-8a1cfe77c20f','Solicitud registrada','2026-05-22 20:50:44.810532','Canal: CORREO','82227888-942c-47c7-a85d-26f892ba74b0','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('947a7bf3-4d1e-4787-87e5-8fe9f43ea5c8','Responsable asignado','2026-04-22 19:16:22.338184','Responsable: María González','9fcf5a4d-0206-43c7-9516-28a6a2684a41','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('03ea0be2-f690-4c87-bc0a-9b0c5a85e387','Solicitud clasificada','2026-05-25 21:35:49.086304','Tipo: REGISTRO_ASIGNATURAS | Prioridad: ALTA','1f5447f8-2bae-4c77-9d42-df7ab90d0308','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('2951f03d-428d-40d7-8c90-a32342933f04','Solicitud cerrada','2026-04-12 20:11:13.299771','Solicitud atendida satisfactoriamente. Estudiante registrado en Programación Avanzada grupo 02.','54d06c3d-fef9-4f3d-a8ef-e00bda8e37ea','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('801197a0-3d63-4702-89cf-a579bf1da162','Cambio de estado: EN_ATENCION → ATENDIDA','2026-05-25 21:37:40.839515','Solicitud atendida — estudiante registrado en Ingeniería de Software grupo 01.','1f5447f8-2bae-4c77-9d42-df7ab90d0308','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('a7ff7af2-8beb-4b67-8d40-aa0c454afb29','Solicitud clasificada','2026-05-08 20:55:56.866064','Tipo: REGISTRO_ASIGNATURAS | Prioridad: ALTA','fc9f6ea1-32a3-48f1-b6f6-c76b8edf0a3b','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('9b915dc0-876b-43f2-9f07-c9e75654116c','Solicitud registrada','2026-05-25 21:34:53.336354','Canal: CSU','1f5447f8-2bae-4c77-9d42-df7ab90d0308','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('5b28511f-306e-4465-8faf-d302aacc1a33','Responsable asignado','2026-04-12 20:09:33.330833','Responsable: María González','54d06c3d-fef9-4f3d-a8ef-e00bda8e37ea','2715b4ca-ead4-4efa-9726-838150bdda0e'),
('9211c183-f06c-4e38-a115-f8b8d8b8125a','Solicitud cerrada','2026-04-22 19:17:07.458612','Caso cerrado. Estudiante informado de los requisitos académicos.','9fcf5a4d-0206-43c7-9516-28a6a2684a41','2715b4ca-ead4-4efa-9726-838150bdda0e');
/*!40000 ALTER TABLE `historial_solicitud` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `regla_priorizacion`
--

DROP TABLE IF EXISTS `regla_priorizacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `regla_priorizacion` (
  `id` uuid NOT NULL,
  `activa` bit(1) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `prioridad_base` enum('ALTA','BAJA','CRITICA','MEDIA') NOT NULL,
  `tipo_solicitud` enum('CANCELACION_ASIGNATURA','CONSULTA_ACADEMICA','HOMOLOGACION','OTRO','REGISTRO_ASIGNATURAS','SOLICITUD_CUPOS') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regla_priorizacion`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `regla_priorizacion` WRITE;
/*!40000 ALTER TABLE `regla_priorizacion` DISABLE KEYS */;
INSERT INTO `regla_priorizacion` VALUES
('ba8cec32-4b47-11f1-add9-7008943b02c8',0x01,'Registro en asignaturas — prioridad alta por impacto académico','ALTA','REGISTRO_ASIGNATURAS'),
('ba8cf1c5-4b47-11f1-add9-7008943b02c8',0x01,'Homologación de materias — prioridad media','MEDIA','HOMOLOGACION'),
('ba8cf28a-4b47-11f1-add9-7008943b02c8',0x01,'Cancelación de asignatura — puede afectar carga académica','ALTA','CANCELACION_ASIGNATURA'),
('ba8cf2b2-4b47-11f1-add9-7008943b02c8',0x01,'Solicitud de cupos especiales — tiempo limitado','ALTA','SOLICITUD_CUPOS'),
('ba8cf2cf-4b47-11f1-add9-7008943b02c8',0x01,'Consulta general — sin urgencia inmediata','BAJA','CONSULTA_ACADEMICA'),
('ba8cf2eb-4b47-11f1-add9-7008943b02c8',0x01,'Otro tipo de solicitud — prioridad media por defecto','MEDIA','OTRO');
/*!40000 ALTER TABLE `regla_priorizacion` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `solicitud`
--

DROP TABLE IF EXISTS `solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud` (
  `id` uuid NOT NULL,
  `canal_origen` enum('CORREO','CSU','PRESENCIAL','SAC','TELEFONICO') NOT NULL,
  `descripcion` text NOT NULL,
  `estado` enum('ATENDIDA','CERRADA','CLASIFICADA','EN_ATENCION','REGISTRADA') NOT NULL,
  `fecha_cierre` datetime(6) DEFAULT NULL,
  `fecha_registro` datetime(6) NOT NULL,
  `justificacion_prioridad` varchar(255) DEFAULT NULL,
  `observacion_cierre` text DEFAULT NULL,
  `prioridad` enum('ALTA','BAJA','CRITICA','MEDIA') NOT NULL,
  `tipo_solicitud` enum('CANCELACION_ASIGNATURA','CONSULTA_ACADEMICA','HOMOLOGACION','OTRO','REGISTRO_ASIGNATURAS','SOLICITUD_CUPOS') NOT NULL,
  `responsable_id` uuid DEFAULT NULL,
  `solicitante_id` uuid NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmad2bspow10qu0n2rpyy3ugm1` (`responsable_id`),
  KEY `FKaiavo5g0nrl4hhgko6slcuv4s` (`solicitante_id`),
  CONSTRAINT `FKaiavo5g0nrl4hhgko6slcuv4s` FOREIGN KEY (`solicitante_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKmad2bspow10qu0n2rpyy3ugm1` FOREIGN KEY (`responsable_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `solicitud` WRITE;
/*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
INSERT INTO `solicitud` VALUES
('82227888-942c-47c7-a85d-26f892ba74b0','CORREO','Esta es otra solicitud de prueba más hecha el 22/May/2026','REGISTRADA',NULL,'2026-05-22 20:50:44.804419','Pendiente de clasificación',NULL,'MEDIA','REGISTRO_ASIGNATURAS',NULL,'4fc0de53-c620-43d9-af61-28164c0f8d17'),
('9fcf5a4d-0206-43c7-9516-28a6a2684a41','CORREO','Solicitud de prueba de otro estudiante para verificar restricción de acceso.','CERRADA','2026-04-22 19:17:07.458612','2026-04-22 18:27:16.670027','Consulta académica general sin urgencia.','Caso cerrado. Estudiante informado de los requisitos académicos.','MEDIA','CONSULTA_ACADEMICA','252cf9bd-e1ff-47ae-a2d7-c52b5fd8e667','252cf9bd-e1ff-47ae-a2d7-c52b5fd8e667'),
('3efa3d83-ace2-4d5f-9c75-4d7c6798a4f3','TELEFONICO','El estudiante quiere cancelar la materia sólidos 1','REGISTRADA',NULL,'2026-05-25 22:54:00.699310','Pendiente de clasificación',NULL,'MEDIA','CANCELACION_ASIGNATURA',NULL,'3915170e-2755-4e82-a573-51daa2d2462d'),
('5833f9dc-6b52-4f15-b3a4-660100c357c1','PRESENCIAL','Necesito cancelar la asignatura Cálculo 2 por motivos médicos, tengo incapacidad hasta fin de mes.','REGISTRADA',NULL,'2026-05-25 23:00:28.605446','Pendiente de clasificación',NULL,'MEDIA','CANCELACION_ASIGNATURA',NULL,'3915170e-2755-4e82-a573-51daa2d2462d'),
('fc9f6ea1-32a3-48f1-b6f6-c76b8edf0a3b','CSU','Necesito registrarme en la asignatura Bases de Datos grupo 01.','CLASIFICADA',NULL,'2026-05-08 20:53:05.141276','Periodo de matrículas activo.',NULL,'ALTA','REGISTRO_ASIGNATURAS',NULL,'4fc0de53-c620-43d9-af61-28164c0f8d17'),
('1f5447f8-2bae-4c77-9d42-df7ab90d0308','CSU','Solicito registro en la asignatura Ingeniería de Software grupo 01 para el presente semestre.','CERRADA','2026-05-25 21:38:34.247229','2026-05-25 21:34:53.330314','Periodo de matrículas activo — solicitud urgente','Caso cerrado exitosamente. Estudiante registrado en el sistema académico.','ALTA','REGISTRO_ASIGNATURAS','252cf9bd-e1ff-47ae-a2d7-c52b5fd8e667','4fc0de53-c620-43d9-af61-28164c0f8d17'),
('54d06c3d-fef9-4f3d-a8ef-e00bda8e37ea','CSU','Solicito registro en la asignatura Programación Avanzada grupo 02 ya que no pude matricularme en el periodo regular.','CERRADA','2026-04-12 20:11:13.298774','2026-04-12 20:06:12.987747','Periodo de matrículas activo — solicitud urgente.','Solicitud atendida satisfactoriamente. Estudiante registrado en Programación Avanzada grupo 02.','ALTA','REGISTRO_ASIGNATURAS','252cf9bd-e1ff-47ae-a2d7-c52b5fd8e667','4fc0de53-c620-43d9-af61-28164c0f8d17');
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `sugerencia_ia`
--

DROP TABLE IF EXISTS `sugerencia_ia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sugerencia_ia` (
  `id` uuid NOT NULL,
  `confirmada` bit(1) NOT NULL,
  `fecha_sugerencia` datetime(6) NOT NULL,
  `prioridad_sugerida` enum('ALTA','BAJA','CRITICA','MEDIA') NOT NULL,
  `resumen_generado` text DEFAULT NULL,
  `tipo_sugerido` enum('CANCELACION_ASIGNATURA','CONSULTA_ACADEMICA','HOMOLOGACION','OTRO','REGISTRO_ASIGNATURAS','SOLICITUD_CUPOS') NOT NULL,
  `solicitud_id` uuid NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK3pl1vtnqwim7yqqnwjh21nea1` (`solicitud_id`),
  CONSTRAINT `FKd0f33kv8rhlauw6o3g39oq72x` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitud` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sugerencia_ia`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `sugerencia_ia` WRITE;
/*!40000 ALTER TABLE `sugerencia_ia` DISABLE KEYS */;
INSERT INTO `sugerencia_ia` VALUES
('b2e2ff5b-3b3c-489c-a2dd-2dac55a72ddc',0x00,'2026-05-25 23:00:36.816571','MEDIA','Solicitud de cancelación de Cálculo 2 por motivos médicos con incapacidad hasta fin de mes.','CANCELACION_ASIGNATURA','5833f9dc-6b52-4f15-b3a4-660100c357c1'),
('7cc05874-8f54-48c7-9ce3-3dfff549c9b1',0x00,'2026-05-25 22:17:46.755848','MEDIA','Solicitud de tipo REGISTRO_ASIGNATURAS registrada por canal CORREO con prioridad MEDIA. Estado actual: REGISTRADA. Descripción: Esta es otra solicitud de prueba más hecha el 22/May/2026','REGISTRO_ASIGNATURAS','82227888-942c-47c7-a85d-26f892ba74b0'),
('1b4de32a-7530-44d6-b061-a7dafef384ff',0x00,'2026-05-25 22:54:05.848121','MEDIA','Solicitud de cancelación de la materia \"Sólidos 1\" con prioridad media, ingresada vía telefónica y registrada.','CANCELACION_ASIGNATURA','3efa3d83-ace2-4d5f-9c75-4d7c6798a4f3'),
('38b2dd46-6944-412e-b5f1-aa42829835fa',0x00,'2026-04-12 20:23:27.932076','ALTA','Solicitud de tipo REGISTRO_ASIGNATURAS registrada por canal CSU con prioridad ALTA. Estado actual: CERRADA. Descripción: Solicito registro en la asignatura Programación Avanzada grupo 02 ya que no pude matricularme en el ...','REGISTRO_ASIGNATURAS','54d06c3d-fef9-4f3d-a8ef-e00bda8e37ea');
/*!40000 ALTER TABLE `sugerencia_ia` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` uuid NOT NULL,
  `activo` bit(1) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `identificacion` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol` enum('ADMIN','ESTUDIANTE','RESPONSABLE') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKrem4hdy94gjeww894qpdrs66o` (`correo`),
  UNIQUE KEY `UKeffn9x71qcayy8ch3gmirymko` (`identificacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES
('4fc0de53-c620-43d9-af61-28164c0f8d17',0x01,'Pérez','jperez@uqvirtual.edu.co','2026-04-12 19:56:32.301905','1094000789','Juan','$2a$10$AtdQID5b1eCFDuKCWyAh6.wfUKpScBNA.huwJ451s6Va28JX9YPE.','ESTUDIANTE'),
('3915170e-2755-4e82-a573-51daa2d2462d',0x01,'Peña','capena@uqvirtual.edu.co','2026-05-25 21:10:12.219300','1099123456','Camilo','$2a$10$MdRCXTHsulPrDy2ARtAc5ulR6t9M0Oo0w4a.yfQJPHLyGhsqB6Q9G','ESTUDIANTE'),
('2715b4ca-ead4-4efa-9726-838150bdda0e',0x01,'Giraldo Vélez','cagiraldov@uqvirtual.edu.co','2026-04-12 14:18:11.481708','1037633881','César','$2a$10$Ly7x7fXGvYhEEA4NwFGyAeNfW2RiOwd4utZX2ZykJYmMNHQLwDbOO','ADMIN'),
('252cf9bd-e1ff-47ae-a2d7-c52b5fd8e667',0x01,'González','mgonzalez@uqvirtual.edu.co','2026-04-12 19:54:25.013199','1094000456','María','$2a$10$5bJBb4p5GLKHoPE0gCHjHe6LZUyuTxhlfX6H/o632T4o8nez.Yvwi','RESPONSABLE');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-05-26 21:39:50
