-- =============================================
--  Hábitos Saludables — Base de datos XAMPP
--  Ejecutar en phpMyAdmin o consola MySQL
-- =============================================

CREATE DATABASE IF NOT EXISTS habitos_saludables
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE habitos_saludables;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    usuario         VARCHAR(50)  NOT NULL UNIQUE,
    contrasena      VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    rol             ENUM('estudiante','profesor','padre') DEFAULT 'estudiante',
    puntos          INT          DEFAULT 0,
    nivel           INT          DEFAULT 1,
    logros          INT          DEFAULT 0,
    avatar          INT          DEFAULT 1,
    creado_en       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de progreso por módulo
CREATE TABLE IF NOT EXISTS progreso (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id  INT NOT NULL,
    modulo      ENUM('alimentacion','higiene','actividad') NOT NULL,
    puntos      INT DEFAULT 0,
    completado  TINYINT(1) DEFAULT 0,
    ultima_vez  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de medallas
CREATE TABLE IF NOT EXISTS medallas (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id  INT NOT NULL,
    nombre      VARCHAR(100) NOT NULL,
    icono       VARCHAR(10)  NOT NULL,
    ganada_en   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =============================================
--  Usuarios de demostración / prueba
-- =============================================
INSERT INTO usuarios (usuario, contrasena, nombre_completo, rol, puntos, nivel) VALUES
('sofia',   '1234', 'Sofía García',     'estudiante', 340, 3),
('carlos',  '1234', 'Carlos Martínez',  'estudiante',  80, 1),
('profe',   'admin','Profesora Ana',    'profesor',     0, 1),
('admin',   'admin','Administrador',    'profesor',     0, 1);

-- Progreso de ejemplo para sofia
INSERT INTO progreso (usuario_id, modulo, puntos, completado) VALUES
(1, 'alimentacion', 120, 1),
(1, 'higiene',      140, 1),
(1, 'actividad',     80, 0);

SELECT 'Base de datos creada correctamente' AS resultado;
