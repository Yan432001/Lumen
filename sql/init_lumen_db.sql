-- ============================================================================
-- Lumen All-in-One Database Setup for phpMyAdmin
-- Database: lumen_db
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `lumen_db`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `lumen_db`;

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

-- ----------------------------------------------------------------------------
-- 1. Users
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 2. Categories
-- ----------------------------------------------------------------------------
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. Tags
-- ----------------------------------------------------------------------------
CREATE TABLE `tags` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. Photos
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 5. Photo Tags Junction
-- ----------------------------------------------------------------------------
CREATE TABLE `photo_tags` (
  `photo_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`photo_id`, `tag_id`),
  CONSTRAINT `fk_photo_tags_photo` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_photo_tags_tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE,
  INDEX `idx_photo_tags_tag` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. Boards
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 7. Board Photos (Pins)
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 8. Likes
-- ----------------------------------------------------------------------------
CREATE TABLE `likes` (
  `user_id` INT NOT NULL,
  `photo_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `photo_id`),
  CONSTRAINT `fk_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_likes_photo` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  INDEX `idx_likes_photo` (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. Reactions (laugh, wow, heart, fire, skull)
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 10. Comments
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 11. Reports
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 12. Spotlight Presets
-- ----------------------------------------------------------------------------
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

-- ============================================================================
-- SEED DATA
-- =================================-------------------------------------------

-- 1. Seed Admin User
-- Plain Password: Admin1234!
-- Hash generated via bcrypt (10 rounds): $2b$10$lpubySTKvkTppPj5/sUfzOZi8qdeZL1WpLfpYSUaqGhSc157dFxNi
-- REPLACE: Update email/password for production
INSERT INTO `users` (`id`, `email`, `password_hash`, `username`, `avatar_url`, `role`, `created_at`)
VALUES (
  1,
  'admin@lumen.com',
  '$2b$10$lpubySTKvkTppPj5/sUfzOZi8qdeZL1WpLfpYSUaqGhSc157dFxNi',
  'admin',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
  'admin',
  NOW()
) ON DUPLICATE KEY UPDATE `id`=`id`;

-- 2. Seed Categories
INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Funny Animals', 'funny-animals'),
(2, 'Funny People', 'funny-people'),
(3, 'Memes', 'memes'),
(4, 'Fails', 'fails'),
(5, 'Reactions', 'reactions'),
(6, 'Wholesome', 'wholesome')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 3. Seed Tags
INSERT INTO `tags` (`id`, `name`, `slug`) VALUES
(1, 'cat', 'cat'),
(2, 'dog', 'dog'),
(3, 'awkward', 'awkward'),
(4, 'oops', 'oops'),
(5, 'facepalm', 'facepalm'),
(6, 'giggle', 'giggle'),
(7, 'viral', 'viral'),
(8, 'mood', 'mood'),
(9, 'cute', 'cute'),
(10, 'chaos', 'chaos'),
(11, 'unexpected', 'unexpected'),
(12, 'hero', 'hero')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 4. Seed Photos
-- REPLACE: Replace placeholder picsum.photos URLs with local storage paths later
-- TODO: Expand to 24 photos in Phase 3
INSERT INTO `photos` (`id`, `user_id`, `title`, `description`, `image_url`, `thumbnail_url`, `width`, `height`, `category_id`, `status`, `views`, `created_at`) VALUES
(
  1,
  1,
  'Cat who has never once been sorry',
  'Looked directly into my soul while pushing the water glass over the counter ledge.',
  'https://picsum.photos/id/1025/800/1000',
  'https://picsum.photos/id/1025/400/500',
  800,
  1000,
  1,
  'published',
  42,
  NOW()
),
(
  2,
  1,
  'Attempted jump onto kitchen counter',
  'Physics calculation error of approximately 30 centimeters. Dignity not found.',
  'https://picsum.photos/id/1062/800/800',
  'https://picsum.photos/id/1062/400/400',
  800,
  800,
  4,
  'published',
  88,
  NOW()
),
(
  3,
  1,
  'Monday morning espresso realization',
  'When you see that your 9:00 AM meeting could have been an unanswered email.',
  'https://picsum.photos/id/1069/800/1100',
  'https://picsum.photos/id/1069/400/550',
  800,
  1100,
  3,
  'published',
  15,
  NOW()
)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 5. Seed Photo Tags
INSERT INTO `photo_tags` (`photo_id`, `tag_id`) VALUES
(1, 1),
(1, 10),
(1, 8),
(2, 4),
(2, 5),
(2, 10),
(3, 8),
(3, 6),
(3, 7)
ON DUPLICATE KEY UPDATE `photo_id`=VALUES(`photo_id`);

-- 6. Seed Sample Board
INSERT INTO `boards` (`id`, `user_id`, `name`, `description`, `is_private`, `created_at`) VALUES
(
  1,
  1,
  'Hall of Chaos',
  'A curated collection of questionable decisions and zero regrets.',
  FALSE,
  NOW()
)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 7. Seed Board Photos
INSERT INTO `board_photos` (`board_id`, `photo_id`, `position`, `added_at`) VALUES
(1, 1, 1, NOW()),
(1, 2, 2, NOW()),
(1, 3, 3, NOW())
ON DUPLICATE KEY UPDATE `position`=VALUES(`position`);