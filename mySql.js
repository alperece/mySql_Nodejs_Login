/* 

CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

! USE u her seferinde kullanmayı unutma:
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL, 
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

! The  NOT NULL constraint ensures that the column will not contain NULL
! Each column has a specific data type and optional size e.g.,VARCHAR(255)
! It means that you cannot insert a string whose length is greater than 255 into this column. 
! VARCHAR is the variable-length string 
! An INT will always be 4 bytes no matter what length is specified.
! InnoDB is a storage engine for the database management system MySQL
! InnoDB is a general-purpose storage engine that balances high reliability and high performance. 


! INSERT VALUE TO TABLE:
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

! ADD PRIMARY KEY to ID:
ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);

! MODIFY TABLE ID COLUMN:
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

! INT(11):

if the stored value has less digits than x, ZEROFILL will prepend zeros.

INT(5) ZEROFILL with the stored value of 32 will show 00032
INT(5) with the stored value of 32 will show 32
INT with the stored value of 32 will show 32

if the stored value has more digits than x, it will be shown as it is.

INT(3) ZEROFILL with the stored value of 250000 will show 250000
INT(3) with the stored value of 250000 will show 250000
INT with the stored value of 250000 will show 250000

*/