-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2018 a las 18:38:14
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
(1, 3, 2),
(3, 1, 3),
(4, 37, 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotosusuario`
--

CREATE TABLE `fotosusuario` (
  `idUsuario` int(11) NOT NULL,
  `foto` varchar(100) NOT NULL
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
(25, 3, '¿qué equipo te gusta más?', 'real madrid,barça,Atleti'),
(26, 3, '¿Cual es tu color favorito?', 'azul,verde,amarillo'),
(30, 29, '¿Que asignatura te gusta mas?', 'IS,MS,TAIS,EDA,GPS');

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
('eq77tX1b6fOtIKFbj-Vinnm3G-whlRNC', 1544722668, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"carlos@ucm.es\",\"currentName\":\"carlos\",\"currentId\":29,\"currentPoints\":10000}'),
('u5ggdhCTLHhf__cP0KpxzoLnjoV47oq2', 1544710583, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentPoints\":0,\"currentUser\":\"carlos@ucm.es\",\"currentId\":29}');

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
  `Imagen_perfil` varchar(100) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `puntos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `password`, `nombre`, `sexo`, `fecha_nacimiento`, `Imagen_perfil`, `id`, `puntos`) VALUES
('usuario@ucm.es', '1234', 'usuario1', 0, '2018-11-10', NULL, 1, 0),
('cargom11@ucm.es', '1234', 'carlos', 0, NULL, NULL, 2, 0),
('pepe', '1234', 'carlos', 0, NULL, NULL, 3, 0),
('averquetal@gmail.com', '1', 'a ver que tal', 0, '2222-02-22', '', 14, 0),
('asdf@sdfadf.com', 'asdfasdf', 'asdfasdf', 0, '1212-12-12', '', 15, 0),
('asddf@sdfadf.com', '', 'asdfasdf', 0, '1212-12-12', '', 16, 0),
('asdddf@sdfadf.com', 'asdf', 'asdfasdf', 0, '1212-12-12', '', 17, 0),
('asddsfddf@sdfadf.com', 'asfasdfasdf', 'asdfasdf', 0, '1212-12-12', '', 18, 0),
('asdfasdf@fasd.csdc', 'sadfasdf', 'asdfasdf', 0, '1212-12-12', '', 19, 0),
('fasfasdf@fadsf.sdf', 'asdfasdf', 'asdfasdf', 0, '1212-12-12', '', 20, 0),
('fasdfasdf@asfasdf.cs', 'asdfa', 'asdfasf', 0, '1212-12-12', NULL, 21, 0),
('asdfasdf@fasdf.coom', 'dasf', 'asdfasdf', 0, '2233-03-12', NULL, 22, 0),
('carlos@ucm.es', '1234', 'carlos', 0, '1997-03-21', 'd35010870b3fb74deefd7fa9c4c5086f', 29, 10000),
('cafsdf@fsadf.fasd', 'asdf', 'dasdf', 0, '1980-01-01', '8ce674fde2b00f9cb2d96f9bf5a54a42', 30, 0),
('carsf@fasdf.cs', '1234', 'casdf', 0, '1980-01-01', 'd25fefb518eb067430f094fc2ccfcf50', 31, 0),
('cardsff@fasdf.cs', '1234', 'casdf', 0, '1980-01-01', '4a08e77b4810815b22a4a863fffb07f0', 32, 0),
('cardfdssff@fasdf.cs', '1234', 'casdf', 0, '1980-01-01', '6c96083cf26702ffeddefb1c8654621e', 33, 0),
('cardfdssff@fasdf.cs', '1234', 'casdf', 0, '1980-01-01', '438e34a6851762fc40ad947b431c9320', 34, 0),
('asfsdfasdf@asddf.gr', 'asdf', 'casd', 0, '1980-01-01', '55b5fb98ca4347b3ce9d86853365ebf3', 35, 0),
('asdgdfsg#@kslg.gsd', 'sdfa', 'sdf', 0, '1997-03-21', '78bd0015c5c82678b28358edc4e1f156', 36, 0),
('asdfas@fsa.fsa', 'fsadf', 'fasdf', 0, '1980-01-01', '48614f8554ef7ba668bbc542f15460c9', 37, 0);

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
(1, 26, 3, 1, 'azul', 0, 0),
(2, 26, 3, 2, 'verde', 1, 1);

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
(2, 25, 3, 'barça', 1),
(3, 26, 3, 'azul', 0),
(4, 26, 2, 'azul', 0),
(5, 26, 1, 'azul', 0),
(6, 24, 3, 'Enter text here...', 0),
(7, 24, 3, 'Enter text here...', 0),
(12, 30, 29, 'GPS', 4);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT de la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT de la tabla `usuariorespondeennombredeotro`
--
ALTER TABLE `usuariorespondeennombredeotro`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `usuariorespondeparasimismo`
--
ALTER TABLE `usuariorespondeparasimismo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
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
