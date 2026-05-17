-- =============================================
--  Hábitos Saludables — Base de datos XAMPP
--  Versión 2 — Sincronizada con el sistema JS
-- =============================================

CREATE DATABASE IF NOT EXISTS habitos_saludables
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE habitos_saludables;

-- Roles: 'student' | 'tutor' (profesor/padre/madre)
CREATE TABLE IF NOT EXISTS usuarios (
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    username             VARCHAR(50)  NOT NULL UNIQUE,
    contrasena           VARCHAR(255) NOT NULL,
    nombre_completo      VARCHAR(100) NOT NULL,
    role                 ENUM('student','tutor') NOT NULL DEFAULT 'student',
    avatar               VARCHAR(30)  NOT NULL DEFAULT 'student1',
    points               INT          NOT NULL DEFAULT 0,
    level_               INT          NOT NULL DEFAULT 1,
    achievements         JSON,
    featured_achievement VARCHAR(50)  DEFAULT NULL,
    streak_current       INT          NOT NULL DEFAULT 0,
    streak_longest       INT          NOT NULL DEFAULT 0,
    streak_last_date     DATE         DEFAULT NULL,
    streak_days          JSON,
    prog_food            INT          NOT NULL DEFAULT 0,
    prog_hygiene         INT          NOT NULL DEFAULT 0,
    prog_activity        INT          NOT NULL DEFAULT 0,
    creado_en            TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS salones (
    id          VARCHAR(20)  PRIMARY KEY,
    tutor_id    INT          NOT NULL,
    nombre      VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) DEFAULT '',
    codigo      VARCHAR(6)   NOT NULL UNIQUE,
    creado_en   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tutor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS salon_estudiantes (
    salon_id      VARCHAR(20) NOT NULL,
    estudiante_id INT         NOT NULL,
    unido_en      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (salon_id, estudiante_id),
    FOREIGN KEY (salon_id)      REFERENCES salones(id)  ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT INTO usuarios (username, contrasena, nombre_completo, role, avatar)
VALUES
  ('sofia',  '1234',  'Sofía García',    'student', 'student2'),
  ('lucas',  '1234',  'Lucas Martínez',  'student', 'student1'),
  ('maria',  '1234',  'María López',     'student', 'student4'),
  ('diego',  '1234',  'Diego Ramírez',   'student', 'student3'),
  ('profe',  'admin', 'Profesora Ana',   'tutor',   'tutor2')
ON DUPLICATE KEY UPDATE username=VALUES(username);

SELECT CONCAT('DB v2 lista. Usuarios: ', COUNT(*)) AS estado FROM usuarios;
