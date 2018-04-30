/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : afeng-eggjs

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-04-30 17:54:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for af_attachment
-- ----------------------------
DROP TABLE IF EXISTS `af_attachment`;
CREATE TABLE `af_attachment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) DEFAULT NULL COMMENT '文件名',
  `extname` varchar(255) DEFAULT NULL COMMENT '文件后缀名',
  `url` varchar(255) DEFAULT NULL COMMENT '文件网络地址',
  `extra` varchar(255) DEFAULT NULL COMMENT '其它说明',
  `created_at` int(11) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '是否删除',
  `update_at` int(11) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for af_user
-- ----------------------------
DROP TABLE IF EXISTS `af_user`;
CREATE TABLE `af_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `session_key` varchar(50) DEFAULT '',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `rf_token` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '刷新token',
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '是否删除',
  `created_at` int(11) DEFAULT '0' COMMENT '创建时间',
  `update_at` int(11) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
