-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2018 a las 15:06:22
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `pregunta` varchar(1000) NOT NULL,
  `respuesta_correcta` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `Imagen_perfil` blob,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `password`, `nombre`, `sexo`, `fecha_nacimiento`, `Imagen_perfil`, `id`) VALUES
('usuario@ucm.es', '1234', 'usuario1', 0, '2018-11-10', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioresponde`
--

CREATE TABLE `usuarioresponde` (
  `id` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `respuesta` varchar(1000) NOT NULL,
  `correcta` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

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
-- Indices de la tabla `usuarioresponde`
--
ALTER TABLE `usuarioresponde`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPregunta` (`idPregunta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `amigos`
--
ALTER TABLE `amigos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `usuarioresponde`
--
ALTER TABLE `usuarioresponde`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  ADD CONSTRAINT `solicitudesamistad_ibfk_1` FOREIGN KEY (`usuario_envia`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `solicitudesamistad_ibfk_2` FOREIGN KEY (`usuario_recibe`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `usuarioresponde`
--
ALTER TABLE `usuarioresponde`
  ADD CONSTRAINT `usuarioresponde_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
