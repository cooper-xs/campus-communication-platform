-- Drop tables in the correct order to satisfy foreign key constraints
DROP TABLE IF EXISTS `toprequests`;
DROP TABLE IF EXISTS `postmoderation`;
DROP TABLE IF EXISTS `reply`;
DROP TABLE IF EXISTS `registrations`;
DROP TABLE IF EXISTS `messages`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `videos`;
DROP TABLE IF EXISTS `posts`;
DROP TABLE IF EXISTS `activities`;
DROP TABLE IF EXISTS `teachers`;
DROP TABLE IF EXISTS `students`;
DROP TABLE IF EXISTS `authentications`;
DROP TABLE IF EXISTS `administrators`;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for activities
-- ----------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities` (
  `ActivityID` int(11) NOT NULL AUTO_INCREMENT,
  `TeacherID` int(11) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `CreationTime` datetime DEFAULT NULL,
	`BeginTime` datetime DEFAULT NULL,
	`EndTime` datetime DEFAULT NULL,
--   `VideoID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ActivityID`),
  KEY `TeacherID` (`TeacherID`),
  CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`TeacherID`) REFERENCES `teachers` (`TeacherID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for administrators
-- ----------------------------
DROP TABLE IF EXISTS `administrators`;
CREATE TABLE `administrators` (
  `AdminID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`AdminID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for authentications
-- ----------------------------
DROP TABLE IF EXISTS `authentications`;
CREATE TABLE `authentications` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) DEFAULT NULL,
  `PID` varchar(18) DEFAULT NULL,
  `UserType` varchar(255) DEFAULT NULL,
  `Academy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `CommentID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `PostID` int(11) DEFAULT NULL,
  `Content` varchar(255) DEFAULT NULL,
  `CreationTime` datetime DEFAULT NULL,
  PRIMARY KEY (`CommentID`),
  KEY `UserID` (`UserID`),
  KEY `PostID` (`PostID`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `students` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`PostID`) REFERENCES `posts` (`PostID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `MessageID` int(11) NOT NULL AUTO_INCREMENT,
  `SenderID` int(11) DEFAULT NULL,
  `RecipientID` int(11) DEFAULT NULL,
  `Content` varchar(255) DEFAULT NULL,
  `CreationTime` datetime DEFAULT NULL,
  PRIMARY KEY (`MessageID`),
  KEY `SenderID` (`SenderID`),
  KEY `RecipientID` (`RecipientID`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`SenderID`) REFERENCES `students` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`RecipientID`) REFERENCES `students` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for postmoderation
-- ----------------------------
DROP TABLE IF EXISTS `postmoderation`;
CREATE TABLE `postmoderation` (
  `ModerationID` int(11) NOT NULL AUTO_INCREMENT,
  `PostID` int(11) DEFAULT NULL,
  `AdminID` int(11) DEFAULT NULL,
  `ModerationStatus` tinyint(1) DEFAULT NULL COMMENT '0: 审核为通过状态, 1: 审核为不通过状态, 2: 修改为待审核状态',
  `ModerationTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ModerationID`),
  KEY `PostID` (`PostID`) USING BTREE,
  KEY `ReviewerID` (`AdminID`) USING BTREE,
  CONSTRAINT `postmoderation_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `posts` (`PostID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `postmoderation_ibfk_2` FOREIGN KEY (`AdminID`) REFERENCES `administrators` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `PostID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Content` varchar(255) DEFAULT NULL,
  `Post_img` varchar(255) DEFAULT NULL,
  `CreationTime` datetime DEFAULT NULL,
  `State` tinyint(1) DEFAULT NULL COMMENT '0: 直接通过, 1: 需要审核, 2:审核已通过, 3:审核未通过, 4:草稿未发布',
  PRIMARY KEY (`PostID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `students` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for registrations
-- ----------------------------
DROP TABLE IF EXISTS `registrations`;
CREATE TABLE `registrations` (
  `RegistrationID` int(11) NOT NULL AUTO_INCREMENT,
  `StudentID` int(11) DEFAULT NULL,
  `ActivityID` int(11) DEFAULT NULL,
  `RegistrationTime` datetime DEFAULT NULL,
  PRIMARY KEY (`RegistrationID`),
  KEY `StudentID` (`StudentID`),
  KEY `ActivityID` (`ActivityID`),
  CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `students` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `registrations_ibfk_2` FOREIGN KEY (`ActivityID`) REFERENCES `activities` (`ActivityID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `ReplyID` int(11) NOT NULL AUTO_INCREMENT,
  `CommentID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Content` varchar(255) NOT NULL,
  `CreationTime` datetime NOT NULL,
  `UserNickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ReplyID`),
  KEY `comment` (`CommentID`),
  CONSTRAINT `comment` FOREIGN KEY (`CommentID`) REFERENCES `comments` (`CommentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `StudentID` int(11) NOT NULL AUTO_INCREMENT,
  `NickName` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `Grade` int(11) DEFAULT NULL,
  `Academy` varchar(255) DEFAULT NULL,
  `Class` varchar(255) DEFAULT NULL,
  `PID` varchar(255) DEFAULT NULL,
  `Verified` tinyint(1) DEFAULT NULL COMMENT ' 0: 未认证, 1:认证通过',
  PRIMARY KEY (`StudentID`)
) ENGINE=InnoDB AUTO_INCREMENT=10005 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for teachers
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `TeacherID` int(11) NOT NULL AUTO_INCREMENT,
  `NickName` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `Academy` varchar(255) DEFAULT NULL,
  `PID` varchar(255) DEFAULT NULL,
  `Verified` tinyint(255) DEFAULT NULL,
  PRIMARY KEY (`TeacherID`)
) ENGINE=InnoDB AUTO_INCREMENT=20003 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for toprequests
-- ----------------------------
DROP TABLE IF EXISTS `toprequests`;
CREATE TABLE `toprequests` (
  `RequestID` int(11) NOT NULL AUTO_INCREMENT,
  `PostID` int(11) DEFAULT NULL,
  `CreationTime` datetime DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `AdminID` int(11) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`RequestID`),
  KEY `PostID` (`PostID`),
  KEY `toprequests_ibfk_2` (`AdminID`),
  CONSTRAINT `toprequests_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `posts` (`PostID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `toprequests_ibfk_2` FOREIGN KEY (`AdminID`) REFERENCES `administrators` (`AdminID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for videos
-- ----------------------------
DROP TABLE IF EXISTS `videos`;
CREATE TABLE `videos` (
  `VideoID` int(11) NOT NULL AUTO_INCREMENT,
  `TeacherID` int(11) DEFAULT NULL,
  `ActivityID` int(11) DEFAULT NULL,
  `VideoPath` varchar(255) DEFAULT NULL,
  `CreationTime` datetime DEFAULT NULL,
  PRIMARY KEY (`VideoID`),
  KEY `TeacherID` (`TeacherID`),
  KEY `ActivityID` (`ActivityID`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`TeacherID`) REFERENCES `teachers` (`TeacherID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`ActivityID`) REFERENCES `activities` (`ActivityID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
