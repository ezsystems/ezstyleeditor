CREATE TABLE IF NOT EXISTS `ezcssesitestyle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'name',
  `current_version` int(11) NOT NULL,
  `selected` smallint(6) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `ezcssesitestyle_definition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sitestyle_id` int(11) NOT NULL DEFAULT 0,
  `style` text,
  `version` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `ezcssesitestyle_version` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` int(11) NOT NULL DEFAULT 0,
  `sitestyle_id` int(11) NOT NULL DEFAULT 0,
  `created` int(11) NOT NULL DEFAULT 0,
  `modified` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;