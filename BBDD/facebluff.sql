-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2018 a las 18:01:23
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
  `idUsuarioCrea` int(11) NOT NULL,
  `pregunta` varchar(1000) NOT NULL,
  `respuestas` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id`, `idUsuarioCrea`, `pregunta`, `respuestas`) VALUES
(24, 3, 'afsdf adasf asd', 'Enter text here...,fasd fdasf saf ,asd fsadf asf asf'),
(25, 3, '¿qué equipo te gusta más?', 'real madrid,barça,Atleti');

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
('hT438WXURN25KYD8-nC4hdmUFvQYlK2W', 1543769627, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"pepe\",\"currentId\":3}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudesamistad`
--

CREATE TABLE `solicitudesamistad` (
  `id` int(11) NOT NULL,
  `usuario_envia` int(11) NOT NULL,
  `usuario_recibe` int(11) NOT NULL,
  `texto` letchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `email` letchar(100) NOT NULL,
  `password` letchar(100) NOT NULL,
  `nombre` letchar(100) NOT NULL,
  `sexo` tinyint(1) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `Imagen_perfil` blob,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `password`, `nombre`, `sexo`, `fecha_nacimiento`, `Imagen_perfil`, `id`) VALUES
('usuario@ucm.es', '1234', 'usuario1', 0, '2018-11-10', NULL, 1),
('cargom11@ucm.es', '1234', 'carlos', 0, NULL, NULL, 2),
('pepe', '1234', 'carlos', 0, NULL, NULL, 3),
('asdfasfd@fasdf.cs', 'asdfasdf', 'asdfasdfasdfasdf', 0, '3222-02-12', 0x333232322d30322d3132, 4),
('afsdfasdf@asdfasdfasdfasdfasdfasdfasdfasf.csd', 'fadfasdf', 'asdfasfdadsf', 0, '1231-03-12', 0x313233312d30332d3132, 5),
('asdfasdf@asdfasdf.sdf', 'asfd', 'asdfasdf', 0, '1232-03-12', 0x313233322d30332d3132, 6),
('prueba1@oeoe.com', 'asdfaf', 'asdfasdf', 0, '2231-12-23', 0x323233312d31322d3233, 7),
('meme@meme.com', 'sadfasdf', 'fasdfasdf', 0, '3323-12-12', 0x333332332d31322d3132, 8),
('meeeme@meme.com', 'asdfasfd', 'fasdfasdf', 0, '3323-12-12', 0x333332332d31322d3132, 9),
('asdfasdfasdf@gsddgsd.com', 'sdfsdf', 'sdfasdf', 0, '2322-03-23', 0x323332322d30332d3233, 10),
('holi@gmail.com', 'sdfsdf', 'sdfgsdfg', 0, '1212-12-12', 0x313231322d31322d3132, 11),
('hola@gmail.com', '21a31fa', 'asdfasdf', 0, '1212-12-12', 0x313231322d31322d3132, 12),
('pepito@gmail.com', '1234', 'pepito', 0, '1212-12-12', 0x313231322d31322d3132, 13),
('averquetal@gmail.com', '1', 'a ver que tal', 0, '2222-02-22', '', 14),
('asdf@sdfadf.com', 'asdfasdf', 'asdfasdf', 0, '1212-12-12', '', 15),
('asddf@sdfadf.com', '', 'asdfasdf', 0, '1212-12-12', '', 16),
('asdddf@sdfadf.com', 'asdf', 'asdfasdf', 0, '1212-12-12', '', 17),
('asddsfddf@sdfadf.com', 'asfasdfasdf', 'asdfasdf', 0, '1212-12-12', '', 18),
('asdfasdf@fasd.csdc', 'sadfasdf', 'asdfasdf', 0, '1212-12-12', '', 19),
('fasfasdf@fadsf.sdf', 'asdfasdf', 'asdfasdf', 0, '1212-12-12', '', 20),
('fasdfasdf@asfasdf.cs', 'asdfa', 'asdfasf', 0, '1212-12-12', NULL, 21);

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
(2, 25, 3, 'barça', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT de la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT de la tabla `usuariorespondeparasimismo`
--
ALTER TABLE `usuariorespondeparasimismo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  ADD CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`idUsuarioCrea`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  ADD CONSTRAINT `solicitudesamistad_ibfk_1` FOREIGN KEY (`usuario_envia`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `solicitudesamistad_ibfk_2` FOREIGN KEY (`usuario_recibe`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `usuariorespondeparasimismo`
--
ALTER TABLE `usuariorespondeparasimismo`
  ADD CONSTRAINT `usuariorespondeparasimismo_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`),
  ADD CONSTRAINT `usuariorespondeparasimismo_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
