DROP DATABASE talkmy;
CREATE DATABASE talkmy;
USE talkmy;
CREATE TABLE notas(
    id varchar(255) NOT NULL,
	usuarioID TEXT NOT NULL,
    texto LONGTEXT NOT NULL,
    completada INT(1) DEFAULT 0,
    fecha timestamp DEFAULT current_timestamp()
)