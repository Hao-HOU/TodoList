# Host: localhost  (Version 5.7.17-log)
# Date: 2018-04-16 12:31:58
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "list"
#

DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list_content` varchar(500) NOT NULL DEFAULT '' COMMENT '待办事项内容',
  `done` int(1) NOT NULL DEFAULT '0' COMMENT '0为未完成，1为已完成',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='待办事项列表';
