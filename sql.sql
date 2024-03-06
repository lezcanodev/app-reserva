-- creamos la base de datos
CREATE DATABASE app_reservas  
	DEFAULT CHARACTER SET utf8mb4
	DEFAULT COLLATE utf8mb4_unicode_ci;

-- establecemos UTC como zona horaria en una session
SET @@session.time_zone = "+00:00"; 

use app_reservas;

START TRANSACTION;
BEGIN;
-- Tabla personas
CREATE TABLE IF NOT EXISTS personas (
	id INT AUTO_INCREMENT ,
    nombre VARCHAR(50) NOT NULL, 
    apellido VARCHAR(50) NOT NULL,
    nro_documento VARCHAR(10) NOT NULL,
    telefono VARCHAR(13) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    
    CONSTRAINT PK_PERSONA_ID PRIMARY KEY (id),
    CONSTRAINT UQ_PERSONA_NRO_DOCUMENTO UNIQUE (nro_documento)
)Engine=InnoDB;

-- Tabla de habitaciones
CREATE TABLE IF NOT EXISTS habitaciones (
	id INT AUTO_INCREMENT ,
    habitacion_piso INT NOT NULL,
    habitacion_nro INT NOT NULL,
    cant_camas INT NOT NULL,
    tiene_television BOOLEAN NOT NULL DEFAULT FALSE,
    tiene_frigobar BOOLEAN NOT NULL DEFAULT FALSE,
    
    CONSTRAINT PK_HABITACION_ID PRIMARY KEY (id),
    CONSTRAINT CK_HABITACION_PISO CHECK(habitacion_piso > 0 AND habitacion_piso <=10),
	CONSTRAINT CK_HABITACION_NRO CHECK(habitacion_nro > 0 AND habitacion_nro <= 20),
    CONSTRAINT CK_HABITACION_CAMA CHECK(cant_camas >= 1 AND cant_camas <= 4),
    CONSTRAINT UQ_HABITACION_PISO_NRO UNIQUE(habitacion_piso, habitacion_nro)
)Engine=InnoDB;


-- Tabla reservas
CREATE TABLE IF NOT EXISTS reservas (
	id INT AUTO_INCREMENT,
	habitacion_id INT NOT NULL,
    persona_id INT NOT NULL,
    fecha_reserva TIMESTAMP NOT NULL,
    fecha_entrada TIMESTAMP NOT NULL,
    fecha_salida  TIMESTAMP NOT NULL,
    monto_reserva DECIMAL(15,3),
    
    CONSTRAINT PK_RESERVA_ID PRIMARY KEY (id),
    CONSTRAINT CK_RESERVA_FECHA_SALIDA CHECK(fecha_salida > fecha_entrada),
    CONSTRAINT FK_RESERVA_HABITACION FOREIGN KEY(habitacion_id) REFERENCES habitaciones(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_RESERVA_PERSONA FOREIGN KEY(persona_id) REFERENCES personas(id) ON DELETE CASCADE ON UPDATE CASCADE	
) Engine=InnoDB;






    