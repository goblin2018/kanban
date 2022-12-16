

CREATE TABLE project (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  `start_at` TIMESTAMP NULL DEFAULT NULL,
  `end_at` TIMESTAMP NULL DEFAULT NULL,
  `desc` VARCHAR(1000) COMMENT '项目简介',
  `name` VARCHAR(200) NOT NULL COMMENT '项目名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_name`(`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='项目表';