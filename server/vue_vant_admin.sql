/*
 Navicat MySQL Data Transfer

 Source Server         : localhost@root
 Source Server Version : 50716
 Source Host           : localhost
 Source Database       : vue_vant_admin

 Target Server Version : 50716
 File Encoding         : utf-8

 Date: 12/07/2018 13:36:38 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `t_category`
-- ----------------------------
DROP TABLE IF EXISTS `t_category`;
CREATE TABLE `t_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `category_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '分类id',
  `parent_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '父级id',
  `CREATED_TIME` datetime DEFAULT NULL COMMENT '分类名称',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`,`category_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='商品分类表 ';

-- ----------------------------
--  Table structure for `t_product`
-- ----------------------------
DROP TABLE IF EXISTS `t_product`;
CREATE TABLE `t_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `product_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品id(spu编码)',
  `category_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '分类id',
  `detail` text COLLATE utf8_unicode_ci COMMENT '商品详情',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`,`product_id`),
  KEY `product_id` (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `t_product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `t_category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='商品表 ';

-- ----------------------------
--  Table structure for `t_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `role_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '角色id',
  `role_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '角色名称',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`,`role_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='角色表 ';

-- ----------------------------
--  Records of `t_role`
-- ----------------------------
BEGIN;
INSERT INTO `t_role` VALUES ('1', '0', '管理员', '2018-12-07 13:28:04', '2018-12-07 13:28:07', '0');
COMMIT;

-- ----------------------------
--  Table structure for `t_sku`
-- ----------------------------
DROP TABLE IF EXISTS `t_sku`;
CREATE TABLE `t_sku` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `sku_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT 'sku_id',
  `product_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品编码id',
  `sku_price` decimal(32,8) DEFAULT NULL COMMENT '价格',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`,`sku_id`),
  KEY `product_id` (`product_id`),
  KEY `sku_id` (`sku_id`),
  CONSTRAINT `t_sku_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='商品sku表 ';

-- ----------------------------
--  Table structure for `t_sku_key`
-- ----------------------------
DROP TABLE IF EXISTS `t_sku_key`;
CREATE TABLE `t_sku_key` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `sku_key_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '选项id',
  `sku_key_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '选项名称 例如颜色',
  `sku_value_id` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '属性id 例如红色的id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '是否删除 0',
  PRIMARY KEY (`id`,`sku_key_id`),
  KEY `sku_key_id` (`sku_key_id`),
  KEY `sku_value_id` (`sku_value_id`),
  CONSTRAINT `t_sku_key_ibfk_1` FOREIGN KEY (`sku_value_id`) REFERENCES `t_sku_value` (`sku_value_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='sku属性选项 ';

-- ----------------------------
--  Table structure for `t_sku_relation`
-- ----------------------------
DROP TABLE IF EXISTS `t_sku_relation`;
CREATE TABLE `t_sku_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `sku_relation_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT 'sku_relation_id',
  `sku_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT 'sku编码',
  `sku_key_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '属性选项id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`,`sku_relation_id`),
  KEY `sku_id` (`sku_id`),
  KEY `sku_key_id` (`sku_key_id`),
  CONSTRAINT `t_sku_relation_ibfk_1` FOREIGN KEY (`sku_id`) REFERENCES `t_sku` (`sku_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_sku_relation_ibfk_2` FOREIGN KEY (`sku_key_id`) REFERENCES `t_sku_key` (`sku_key_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='sku属性选项关联表 ';

-- ----------------------------
--  Table structure for `t_sku_value`
-- ----------------------------
DROP TABLE IF EXISTS `t_sku_value`;
CREATE TABLE `t_sku_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `sku_value_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '属性id',
  `sku_value_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '属性名称',
  `category_id` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '分类id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`,`sku_value_id`),
  KEY `sku_value_id` (`sku_value_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `t_sku_value_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `t_category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='sku属性表 ';

-- ----------------------------
--  Table structure for `t_stock`
-- ----------------------------
DROP TABLE IF EXISTS `t_stock`;
CREATE TABLE `t_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `sku_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT 'sku编码',
  `user_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户id',
  `stock` int(11) NOT NULL COMMENT '库存',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `sku_id` (`sku_id`),
  CONSTRAINT `t_stock_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_stock_ibfk_2` FOREIGN KEY (`sku_id`) REFERENCES `t_sku` (`sku_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='库存表 ';

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
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `t_user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表 ';

-- ----------------------------
--  Records of `t_user`
-- ----------------------------
BEGIN;
INSERT INTO `t_user` VALUES ('1', '0e5dd0a0-f59d-11e8-bd9e-07e3a7d96aa2', '王志坚', '18073778398', 'trunks123', '$2a$10$cpNoV8HIwkMJkvEM08qx0uPsEtM2uIHFHfZvonHZ79oUWzPGq0O1e', '72f2c950-f59b-11e8-bd9e-07e3a7d96aa2', '0', 'oEHFj5_aTMaJETQg3D5iZ8Sjf-dY', 'trunkssssss', '1', 'http://thirdwx.qlogo.cn/mmopen/vi_32/nUYFrDawI8bZp95lLhALcJe6fiaYFrfdEy1LmmqPocaWl8aL9h9QmDHQJ14QlVgazaViaic7yShMh53zkmbia4K54w/132', '中国', '湖南', '长沙', null, '2018-12-02 03:12:33', '2018-12-02 03:12:33', '0', '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
