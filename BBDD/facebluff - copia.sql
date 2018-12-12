-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2018 a las 09:56:11
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
(3, 1, 3);

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
(27, 28, '¿fasdf?', 'asdfsdaf,asdfasdf,asdfasdfa'),
(28, 28, '¿que marca te gusta mas?', 'mac,asus,acer'),
(29, 27, '¿A donde te gustaría ir?', 'Almeria,Filipinas,Tokio');

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
('W30ZUfaTCdImnvsnnxwSJxuxrE2Cp_RF', 1544691215, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"carlos@ucm.es\",\"currentName\":\"carlos\",\"currentId\":27,\"currentPoints\":0}'),
('WPs4UQxqkFbBgU3aK_ZumfETsDBK7Qwl', 1544613909, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"carlos@ucm.es\",\"currentName\":\"carlos\",\"currentId\":27}');

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
('prueba3@faasdf.csd', 'fasdf', 'dasdfas', 0, '1234-03-12', 'C:\\Users\\carlo\\OneDrive\\Documentos\\GitHub\\AplicacionWeb\\uploads\\ca5ae53f9cb72d3d62331854f2d95aeb', 25, 0),
('fasdfas@sdfc.cs', 'sdfas', 'asfsdf', 0, '1986-03-12', 'C:\\Users\\carlo\\OneDrive\\Documentos\\GitHub\\AplicacionWeb\\uploads\\1ac035c87ce685a6d6c3e61ff79004bf', 26, 0),
('carlos@ucm.es', '1234', 'carlos', 0, '1997-03-21', 'C:\\Users\\carlo\\OneDrive\\Documentos\\GitHub\\AplicacionWeb\\uploads\\76659da7e6e2dd3e67ba67fa6fe82d6a', 27, 0),
('meme@ucm.es', '1234', 'meme', 1, '1997-01-26', 'C:\\Users\\carlo\\OneDrive\\Documentos\\GitHub\\AplicacionWeb\\uploads\\a8bb08e832a30ecf84fd61648d4a5fde', 28, 100);

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
(8, 29, 27, 'Tokio', 2);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT de la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT de la tabla `usuariorespondeennombredeotro`
--
ALTER TABLE `usuariorespondeennombredeotro`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `usuariorespondeparasimismo`
--
ALTER TABLE `usuariorespondeparasimismo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
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
