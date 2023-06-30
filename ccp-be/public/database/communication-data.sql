-- ----------------------------
-- Records of administrators
-- ----------------------------
INSERT INTO `administrators` VALUES ('1', 'admin', '1234567@qq.com', 'admin');
INSERT INTO `administrators` VALUES ('2', 'adminn', '352452@qq.com', 'adminn');


-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES ('10001', '小王', '王洪波', '1234567@qq.com', '10001', '20', '软件2001', '10001', '计算机', null);
INSERT INTO `students` VALUES ('10002', '小张', '张晓硕', '234567@qq.com', '10002', '20', '软件2001', '10002', '计算机', null);
INSERT INTO `students` VALUES ('10003', '小赵', '赵心怡', '345678@qq.com', '10003', '20', '软件2001', '10003', '计算机', null);
INSERT INTO `students` VALUES ('10004', '小2王', '王文洋', '456789@qq.com', '10004', '20', '软件2002', '10004', '计算机', null);


-- ----------------------------
-- Records of teachers
-- ----------------------------
INSERT INTO `teachers` VALUES ('20001', '苏老师', '苏晶', '1234567@qq.com', '20001', '计算机', '20001', null);
INSERT INTO `teachers` VALUES ('20002', '张老师', '张冬梅', '2345678@qq.com', '20002', '计算机', '20002', null);
INSERT INTO `teachers` VALUES ('20003', '吕老师', '吕兵', '456789@qq.com', '20003', '计算机', '20003', null);
INSERT INTO `teachers` VALUES ('20004', '王老师', '王小王', '23245@qq.com', '20004', '材料', '20004', null);
INSERT INTO `teachers` VALUES ('20005', '刘老师', '刘小刘', '34535@qq.com', '20005', '化工', '20005', null);
INSERT INTO `teachers` VALUES ('20006', '孙老师', '孙小孙', '43563@qq.com', '20006', '农工', '20006', null);


-- ----------------------------
-- Records of activities
-- ----------------------------
-- INSERT INTO `activities` VALUES ('1', '20001', '妙笔生花', '画画活动', '2023-06-27 11:54:46', '2023-05-29 11:54:49', '2023-06-30 13:54:49', '1');
-- INSERT INTO `activities` VALUES ('2', '20002', '奇思妙想', '拍照活动', '2023-06-13 11:55:15', '2023-06-29 11:55:18', '2023-06-30 11:54:49', '2');
-- INSERT INTO `activities` VALUES ('3', '20003', '神笔马良', '画画', '2023-06-29 12:00:59', '2023-06-30 12:01:02', '2023-06-30 11:54:49', '3');
-- INSERT INTO `activities` VALUES ('4', '20004', '猴子上树', '运动', '2023-06-29 12:06:33', '2023-06-29 12:06:38', '2023-06-30 11:54:49', '4');
-- INSERT INTO `activities` VALUES ('5', '20005', '水中捞月', '拍照', '2023-06-29 12:07:02', '2023-06-29 12:07:05', '2023-06-30 12:54:49', '5');
-- INSERT INTO `activities` VALUES ('6', '20006', '马失前蹄', '运动', '2023-06-29 12:07:33', '2023-06-29 12:07:38', '2023-06-30 15:54:49', '6');
INSERT INTO `activities` (`ActivityID`, `TeacherID`, `Title`, `Description`, `CreationTime`, `BeginTime`, `EndTime`) VALUES 
(1, 20003, '校园音乐会', '我们很高兴地宣布，我们将举办一场校园音乐会，邀请了校园内的各类音乐团队和个人参与。我们期待你的加入，让我们一起享受音乐的魅力。', '2023-06-29 22:00:00', '2023-06-30 19:00:00', '2023-06-30 21:00:00'),
(2, 20004, '科学讲座', '本次科学讲座，我们邀请了物理系的著名教授来给我们分享关于量子力学的最新研究成果。这将是一个充满智慧和启发的夜晚，不容错过。', '2023-06-29 22:05:00', '2023-06-30 14:00:00', '2023-06-30 16:00:00'),
(3, 20002, '艺术展览', '我们的艺术系学生将在本次艺术展览中展出他们的作品。这些作品包括绘画、雕塑和摄影。我们欢迎所有的学生和教职工来参观展览，感受艺术的魅力。', '2023-06-29 22:10:00', '2023-06-30 10:00:00', '2023-06-30 18:00:00'),
(4, 20005, '健身大赛', '我们将举办一场健身大赛，比赛项目包括举重、跑步和瑜伽。无论你是运动达人还是初学者，我们都欢迎你的参与。', '2023-06-29 22:15:00', '2023-06-30 09:00:00', '2023-06-30 12:00:00'),
(5, 20001, '公益讲座', '我们将举办一场公益讲座，主题为环保和可持续发展。我们邀请了一些环保专家和志愿者来分享他们的经验和知识。', '2023-06-29 22:20:00', '2023-06-30 13:00:00', '2023-06-30 15:00:00'),
(6, 20006, '电影之夜', '我们将在操场上设立大屏幕，播放经典电影。带上你的小板凳和零食，让我们一起在星空下享受电影之夜。', '2023-06-29 22:25:00', '2023-06-30 20:00:00', '2023-06-30 22:00:00'),
(7, 20004, '书籍交流会', '我们将在图书馆举办一场书籍交流会，你可以带上你的二手书来交换，也可以来寻找你感兴趣的书籍。', '2023-06-29 22:30:00', '2023-06-30 15:00:00', '2023-06-30 17:00:00'),
(8, 20003, '户外野餐', '我们将在校园的草坪上举办一场户外野餐，你可以带上你的朋友和美食，让我们一起享受美好的午后时光。', '2023-06-29 22:35:00', '2023-06-30 12:00:00', '2023-06-30 14:00:00'),
(9, 20002, '编程比赛', '我们将举办一场编程比赛，无论你是计算机专业的学生还是编程爱好者，我们都欢迎你的参与。', '2023-06-29 22:40:00', '2023-06-30 10:00:00', '2023-06-30 17:00:00'),
(10, 20001, '校园清洁日', '我们将举办一场校园清洁日活动，希望大家积极参与，让我们的校园更加干净整洁。', '2023-06-29 22:45:00', '2023-06-30 08:00:00', '2023-06-30 12:00:00');



-- ----------------------------
-- Records of registrations
-- ----------------------------
INSERT INTO `registrations` VALUES ('1', '10004', '1', '2023-06-29 11:57:18');
INSERT INTO `registrations` VALUES ('2', '10003', '1', '2023-06-29 11:57:32');
INSERT INTO `registrations` VALUES ('3', '10001', '2', '2023-06-29 12:17:51');
INSERT INTO `registrations` VALUES ('4', '10004', '3', '2023-06-29 11:57:18');
INSERT INTO `registrations` VALUES ('5', '10003', '3', '2023-06-29 11:57:32');
INSERT INTO `registrations` VALUES ('6', '10001', '3', '2023-06-29 12:17:51');
INSERT INTO `registrations` VALUES ('7', '10004', '5', '2023-06-29 11:57:18');
INSERT INTO `registrations` VALUES ('8', '10003', '6', '2023-06-29 11:57:32');
INSERT INTO `registrations` VALUES ('9', '10001', '7', '2023-06-29 12:17:51');
INSERT INTO `registrations` VALUES ('10', '10004', '8', '2023-06-29 11:57:18');
INSERT INTO `registrations` VALUES ('11', '10003', '8', '2023-06-29 11:57:32');
INSERT INTO `registrations` VALUES ('12', '10001', '9', '2023-06-29 12:17:51');

-- ----------------------------
-- Records of videos
-- ----------------------------
INSERT INTO `videos` VALUES ('1', '20001', '1', 'https://zxsmain.oss-cn-shenzhen.aliyuncs.com/ccp/1688043741101_demo2.mp4', '2023-06-29 12:00:20');
INSERT INTO `videos` VALUES ('2', '20002', '2', 'https://zxsmain.oss-cn-shenzhen.aliyuncs.com/ccp/1688043741101_demo2.mp4', '2023-06-29 12:00:41');
INSERT INTO `videos` VALUES ('3', '20003', '2', 'https://zxsmain.oss-cn-shenzhen.aliyuncs.com/ccp/1688043741101_demo2.mp4', '2023-06-29 12:20:19');
INSERT INTO `videos` VALUES ('4', '20004', '4', 'https://zxsmain.oss-cn-shenzhen.aliyuncs.com/ccp/1688043741101_demo2.mp4', '2023-06-29 12:20:34');
INSERT INTO `videos` VALUES ('5', '20005', '5', 'https://zxsmain.oss-cn-shenzhen.aliyuncs.com/ccp/1688043741101_demo2.mp4', '2023-06-29 12:20:53');
INSERT INTO `videos` VALUES ('6', '20006', '6', 'https://zxsmain.oss-cn-shenzhen.aliyuncs.com/ccp/1688043741101_demo2.mp4', '2023-06-29 12:21:05');


-- ----------------------------
-- Records of authentications
-- ----------------------------
INSERT INTO `authentications` VALUES ('1', '王洪波', '10001', 'student', '计算机');
INSERT INTO `authentications` VALUES ('2', '张晓硕', '10002', 'student', '计算机');
INSERT INTO `authentications` VALUES ('3', '赵心怡', '10003', 'student', '计算机');
INSERT INTO `authentications` VALUES ('4', '王文洋', '10004', 'student', '计算机');
INSERT INTO `authentications` VALUES ('5', '苏晶', '20001', 'teacher', '计算机');
INSERT INTO `authentications` VALUES ('6', '张冬梅', '20002', 'teacher', '计算机');
INSERT INTO `authentications` VALUES ('7', '吕兵', '20003', 'teacher', '计算机');



-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('1', '10001', '失物招领', '校园卡丢失，急寻', null, '2023-06-29 11:29:21', '0');
INSERT INTO `posts` VALUES ('2', '10002', '求助', '捞人！！！', null, '2023-06-29 11:51:46', '0');
INSERT INTO `posts` VALUES ('3', '10003', '情感咨询', '送花', null, '2023-06-29 11:53:11', '0');
INSERT INTO `posts` VALUES ('4', '10004', '数据库', '数据库考试作弊', null, '2023-06-29 12:09:25', '1');

-- ---------------------------
-- Records of postmoderation
-- ----------------------------
INSERT INTO `postmoderation` VALUES ('1', '4', '1', '1', '2023-06-29 11:53:38');

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '10001', '1', '赞赞赞', '2023-06-29 11:55:47');
INSERT INTO `comments` VALUES ('2', '10002', '2', '啦啦啦', '2023-06-29 11:56:55');
INSERT INTO `comments` VALUES ('3', '10003', '3', '同意！', '2023-06-29 12:09:51');


-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO `reply` VALUES ('1', '1', '10004', '你好', '2023-06-29 11:58:11', '王文洋');
INSERT INTO `reply` VALUES ('2', '2', '10003', '你好', '2023-06-29 11:59:06', '赵心怡');
INSERT INTO `reply` VALUES ('3', '3', '10001', '你好', '2023-06-29 12:18:53', '王洪波');



-- ----------------------------
-- Records of toprequests
-- ----------------------------
INSERT INTO `toprequests` VALUES ('1', '2', '2023-06-29 11:59:33', '10002', '1', null);
INSERT INTO `toprequests` VALUES ('2', '3', '2023-06-29 11:59:58', '10003', '1', null);
INSERT INTO `toprequests` VALUES ('3', '1', '2023-06-29 12:19:22', '10001', '2', null);
INSERT INTO `toprequests` VALUES ('4', '4', '2023-06-29 12:19:50', '10004', '2', null);


