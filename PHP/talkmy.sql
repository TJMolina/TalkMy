
--
-- Base de datos: `id21367182_talkmy`
--

CREATE DATABASE talkmy;
USE talkmy;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id` varchar(255) NOT NULL,
  `texto` longtext DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`id`, `texto`, `nombre`, `fecha`) VALUES
('324joi234oij', 'nota editado', 'tobias', '2023-11-19 16:22:11'),
('324joi2d34oij', 'nota mysql', 'tobias', '2023-11-19 17:50:03'),
('b1948d8e-4777-4d01-992e-22e0460b3c9f', '昨日はヌムニュムスープを食べました、スープはとても美味しかったです', 'sofimiau', '2023-11-19 17:50:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombre` varchar(50) NOT NULL,
  `contrase` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombre`, `contrase`) VALUES
('Brand', 'pepe123'),
('brandon', '123456789'),
('Cristian', '123456'),
('Denisse', 'w0232023'),
('Djdhdjd', 'jdjsjdjd'),
('Holahola', '123456'),
('Maximoooo', '123456'),
('maximre', '22345'),
('Maxxxoo', '111222333'),
('Melina', '12346'),
('melmel', '123456'),
('obesofi', '3163951'),
('Santiago', 'sexoanal'),
('Santiago 2', 'messi'),
('Santiago1', '12345'),
('sofimiau', 'gatosysopa'),
('sofis', 'gatosysopa'),
('tobias', '12345678');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`nombre`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`nombre`) REFERENCES `usuarios` (`nombre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
