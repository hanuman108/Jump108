CREATE TABLE `user` (
  `name` varchar(50) NOT NULL,
  `dob` date DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `intent` (
  `intent_id` int(11) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `category` varchar(25) DEFAULT NULL,
  `type` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`intent_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `intent_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1