-- ============================================================================
-- Lumen Database Schema
-- Complete schema for all phases: users, categories, tags, photos, boards,
-- interactions (likes, reactions, comments), moderation, and spotlight presets.
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `reports`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `reactions`;
DROP TABLE IF EXISTS `likes`;
DROP TABLE IF EXISTS `board_photos`;
DROP TABLE IF EXISTS `boards`;
DROP TABLE IF EXISTS `photo_tags`;
DROP TABLE IF EXISTS `photos`;
DROP TABLE IF EXISTS `tags`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `spotlight_presets`;
DROP TABLE IF EXISTS `users`;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `avatar_url` VARCHAR(512) DEFAULT NULL,
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tags` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `photos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `image_url` VARCHAR(512) NOT NULL,
  `thumbnail_url` VARCHAR(512) NOT NULL,
  `width` INT NOT NULL,
  `height` INT NOT NULL,
  `category_id` INT NOT NULL,
  `status` ENUM('draft', 'published', 'hidden', 'removed') NOT NULL DEFAULT 'published',
  `views` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_photos_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_photos_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT,
  INDEX `idx_photos_category_status` (`category_id`, `status`),
  INDEX `idx_photos_user` (`user_id`),
  INDEX `idx_photos_status_created` (`status`, `created_at` DESC),
  INDEX `idx_photos_views` (`views` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `photo_tags` (
  `photo_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`photo_id`, `tag_id`),
  CONSTRAINT `fk_photo_tags_photo` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_photo_tags_tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE,
  INDEX `idx_photo_tags_tag` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `boards` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `is_private` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_boards_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  INDEX `idx_boards_user_private` (`user_id`, `is_private`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `board_photos` (
  `board_id` INT NOT NULL,
  `photo_id` INT NOT NULL,
  `position` INT NOT NULL DEFAULT 0,
  `added_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`board_id`, `photo_id`),
  CONSTRAINT `fk_board_photos_board` FOREIGN KEY (`board_id`) REFERENCES `boards` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_board_photos_photo` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  INDEX `idx_board_photos_order` (`board_id`, `position` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `likes` (
  `user_id` INT NOT NULL,
  `photo_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `photo_id`),
  CONSTRAINT `fk_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_likes_photo` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  INDEX `idx_likes_photo` (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `reactions` (
  `user_id` INT NOT NULL,
  `photo_id` INT NOT NULL,
  `emoji` ENUM('laugh', 'wow', 'heart', 'fire', 'skull') NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `photo_id`, `emoji`),
  CONSTRAINT `fk_reactions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reactions_photo` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  INDEX `idx_reactions_photo_emoji` (`photo_id`, `emoji`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `comments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `photo_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `body` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_comments_photo` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  INDEX `idx_comments_photo_created` (`photo_id`, `created_at` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `reports` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `photo_id` INT NOT NULL,
  `reporter_id` INT NOT NULL,
  `reason` VARCHAR(255) NOT NULL,
  `status` ENUM('open', 'resolved', 'dismissed') NOT NULL DEFAULT 'open',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_reports_photo` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reports_reporter` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  INDEX `idx_reports_status` (`status`, `created_at` DESC),
  INDEX `idx_reports_photo` (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `spotlight_presets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `shape` ENUM('circle', 'ellipse', 'square', 'rounded-square', 'star', 'hexagon', 'custom') NOT NULL DEFAULT 'circle',
  `radius` INT NOT NULL DEFAULT 250,
  `softness` INT NOT NULL DEFAULT 40,
  `darkness` INT NOT NULL DEFAULT 85,
  `intensity` INT NOT NULL DEFAULT 100,
  `follow_speed` INT NOT NULL DEFAULT 20,
  `blend_mode` VARCHAR(50) NOT NULL DEFAULT 'normal',
  `color` VARCHAR(50) NOT NULL DEFAULT '#ffffff',
  `effects` JSON NOT NULL,
  `idle_behavior` ENUM('none', 'fade', 'wander') NOT NULL DEFAULT 'none',
  `mobile_behavior` ENUM('follow', 'fixed', 'disabled') NOT NULL DEFAULT 'follow',
  `ambient_light` INT NOT NULL DEFAULT 15,
  `is_active` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_spotlight_presets_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;