

CREATE TABLE project (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` INT NOT NULL,
  `updated_at` INT NOT NULL,
  `deleted_at` INT NOT NULL,
  `start_at` INT,
  `end_at` INT,
  `desc` VARCHAR(1000) COMMENT '项目简介',
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='项目表';