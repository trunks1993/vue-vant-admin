/*
 Navicat MySQL Data Transfer

 Source Server         : localhost@root
 Source Server Version : 50716
 Source Host           : localhost
 Source Database       : vue_vant_admin

 Target Server Version : 50716
 File Encoding         : utf-8

 Date: 12/04/2018 11:07:51 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `user_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户ID',
  `name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '真实姓名',
  `phone` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '手机号码',
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '帐号',
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '登录密码',
  `parent_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '上级用户',
  `role_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '角色',
  `openid` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'openid',
  `nickname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '微信昵称',
  `sex` int(11) DEFAULT NULL COMMENT '性别',
  `headimgurl` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '微信头像',
  `country` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '国家',
  `province` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '省份',
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '城市',
  `authorize_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '授权码',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '是否删除 0: 正常 1: 删除',
  `review_flag` int(11) DEFAULT '1' COMMENT '审核中 0: 正常 1: 正在审核',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表 ';

-- ----------------------------
--  Records of `t_user`
-- ----------------------------
BEGIN;
INSERT INTO `t_user` VALUES ('1', '0e5dd0a0-f59d-11e8-bd9e-07e3a7d96aa2', '王志坚', '18073778398', 'trunks123', '$2a$10$cpNoV8HIwkMJkvEM08qx0uPsEtM2uIHFHfZvonHZ79oUWzPGq0O1e', '72f2c950-f59b-11e8-bd9e-07e3a7d96aa2', '1', 'oEHFj5_aTMaJETQg3D5iZ8Sjf-dY', 'trunkssssss', '1', 'http://thirdwx.qlogo.cn/mmopen/vi_32/nUYFrDawI8bZp95lLhALcJe6fiaYFrfdEy1LmmqPocaWl8aL9h9QmDHQJ14QlVgazaViaic7yShMh53zkmbia4K54w/132', '中国', '湖南', '长沙', null, '2018-12-02 03:12:33', '2018-12-02 03:12:33', '0', '0'), ('22', '9daa14c0-f76f-11e8-bddf-7deec471cc64', '林俊杰', '15587876666', 'admin', '$2a$10$Uh.a8fiN2hba/lJsFBMi5.uwh71Eg20E/ckAQG2bm4P5dTl7Mtm/6', '0e5dd0a0-f59d-11e8-bd9e-07e3a7d96aa2', 'abc', 'oEHFj5xncp0U4y3HiJEiSZwiHLPM', '沉睡的狮子', '1', 'http://thirdwx.qlogo.cn/mmopen/vi_32/YgQHzy7HSXtI5XqqjnAGtSC0Yfm9PtXOCAosQLnjuMiahl4oDCtjzHGOtBOtgtdWyhPabKwUIch0Ol3uw5xLMoA/132', '中国', '湖南', '益阳', '2018124089663', '2018-12-04 10:52:19', '2018-12-04 10:52:19', '0', '1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
