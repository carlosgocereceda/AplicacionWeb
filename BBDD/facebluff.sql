-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2018 a las 19:45:37
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `facebluff`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amigos`
--

CREATE TABLE `amigos` (
  `id` int(11) NOT NULL,
  `idAmigo1` int(11) NOT NULL,
  `idAmigo2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `amigos`
--

INSERT INTO `amigos` (`id`, `idAmigo1`, `idAmigo2`) VALUES
(6, 41, 39),
(7, 41, 40),
(8, 41, 38),
(9, 38, 39);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotosusuario`
--

CREATE TABLE `fotosusuario` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `foto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `fotosusuario`
--

INSERT INTO `fotosusuario` (`id`, `idUsuario`, `foto`) VALUES
(1, 38, '93bcb9f963dd6ecf194e86f44252f3d3'),
(2, 38, 'bfbf278db24e535b68525d2fd9a5fe81'),
(3, 38, '4688e9424c96ddc9bde5d385e7412d93'),
(4, 38, '5396685a263eef1786b2bbaccb8b0572'),
(5, 38, 'e91e4837b00a360aa7e61604e20459ce'),
(6, 38, '90d70588c25366f12b6f9bd24ccb7154'),
(7, 38, '486c618cb352cfd9776a6892eaef9a2d'),
(8, 38, '9b2ee58367124ecb089dd6a6d7d9895a'),
(9, 38, '48a89f30fc42d3b2dddac8f13031a3ab');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL,
  `idUsuarioCrea` int(11) NOT NULL,
  `pregunta` varchar(1000) NOT NULL,
  `respuestas` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id`, `idUsuarioCrea`, `pregunta`, `respuestas`) VALUES
(31, 39, '¿Cual es tu color favorito?', 'amarillo,azul,verde,morado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('RrQKzJYOTfGFxZ5Qdy5gaV9KhcLv7QHw', 1544726718, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"usuario1@ucm.es\",\"currentName\":\"usuario1\",\"currentId\":38,\"currentPoints\":1000}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudesamistad`
--

CREATE TABLE `solicitudesamistad` (
  `id` int(11) NOT NULL,
  `usuario_envia` int(11) NOT NULL,
  `usuario_recibe` int(11) NOT NULL,
  `texto` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `solicitudesamistad`
--

INSERT INTO `solicitudesamistad` (`id`, `usuario_envia`, `usuario_recibe`, `texto`) VALUES
(5, 38, 40, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `sexo` tinyint(1) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `Imagen_perfil` varchar(100) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `puntos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `password`, `nombre`, `sexo`, `fecha_nacimiento`, `Imagen_perfil`, `id`, `puntos`) VALUES
('usuario1@ucm.es', '1234', 'usuario1', 0, '1980-01-01', '9a2f016facd7efa25fc8ad933efd82d7', 38, 1000),
('usuario2@ucm.es', '1234', 'usuario2', 1, '1980-01-01', '2533194b0a0bf6d71b1fef988efa5abb', 39, 0),
('usuario3@ucm.es', '1234', 'usuario3', 0, '1980-01-01', '0d199927e4a3ada78989faada12f96a2', 40, 0),
('usuario4@ucm.es', '1234', 'usuario4', 0, '1980-01-01', '3ad291444dc5d1688cf54069aa8dd292', 41, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariorespondeennombredeotro`
--

CREATE TABLE `usuariorespondeennombredeotro` (
  `id` int(100) NOT NULL,
  `idPregunta` int(100) NOT NULL,
  `idUsuarioAdivina` int(100) NOT NULL,
  `idUsuarioRespondio` int(100) NOT NULL,
  `respuesta` varchar(1000) NOT NULL,
  `idRespuesta` int(11) NOT NULL,
  `correcta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuariorespondeennombredeotro`
--

INSERT INTO `usuariorespondeennombredeotro` (`id`, `idPregunta`, `idUsuarioAdivina`, `idUsuarioRespondio`, `respuesta`, `idRespuesta`, `correcta`) VALUES
(3, 31, 38, 39, 'morado', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariorespondeparasimismo`
--

CREATE TABLE `usuariorespondeparasimismo` (
  `id` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `respuesta` varchar(1000) NOT NULL,
  `idRespuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuariorespondeparasimismo`
--

INSERT INTO `usuariorespondeparasimismo` (`id`, `idPregunta`, `idUsuario`, `respuesta`, `idRespuesta`) VALUES
(13, 31, 39, 'azul', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idAmigo1` (`idAmigo1`),
  ADD KEY `idAmigo2` (`idAmigo2`);

--
-- Indices de la tabla `fotosusuario`
--
ALTER TABLE `fotosusuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuarioCrea`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_envia` (`usuario_envia`),
  ADD KEY `usuario_recibe` (`usuario_recibe`),
  ADD KEY `usuario_envia_2` (`usuario_envia`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuariorespondeennombredeotro`
--
ALTER TABLE `usuariorespondeennombredeotro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPregunta` (`idPregunta`),
  ADD KEY `idUsuarioAdivina` (`idUsuarioAdivina`),
  ADD KEY `idUsuarioRespondio` (`idUsuarioRespondio`);

--
-- Indices de la tabla `usuariorespondeparasimismo`
--
ALTER TABLE `usuariorespondeparasimismo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPregunta` (`idPregunta`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `amigos`
--
ALTER TABLE `amigos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `fotosusuario`
--
ALTER TABLE `fotosusuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT de la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT de la tabla `usuariorespondeennombredeotro`
--
ALTER TABLE `usuariorespondeennombredeotro`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usuariorespondeparasimismo`
--
ALTER TABLE `usuariorespondeparasimismo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD CONSTRAINT `amigos_ibfk_1` FOREIGN KEY (`idAmigo1`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `amigos_ibfk_2` FOREIGN KEY (`idAmigo2`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `fotosusuario`
--
ALTER TABLE `fotosusuario`
  ADD CONSTRAINT `fotosusuario_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`idUsuarioCrea`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  ADD CONSTRAINT `solicitudesamistad_ibfk_1` FOREIGN KEY (`usuario_envia`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `solicitudesamistad_ibfk_2` FOREIGN KEY (`usuario_recibe`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `usuariorespondeennombredeotro`
--
ALTER TABLE `usuariorespondeennombredeotro`
  ADD CONSTRAINT `usuariorespondeennombredeotro_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`),
  ADD CONSTRAINT `usuariorespondeennombredeotro_ibfk_2` FOREIGN KEY (`idUsuarioAdivina`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `usuariorespondeennombredeotro_ibfk_3` FOREIGN KEY (`idUsuarioRespondio`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `usuariorespondeparasimismo`
--
ALTER TABLE `usuariorespondeparasimismo`
  ADD CONSTRAINT `usuariorespondeparasimismo_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`),
  ADD CONSTRAINT `usuariorespondeparasimismo_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
