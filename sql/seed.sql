-- ============================================================================
-- Lumen Seed Data (Phase 1)
-- 1 Admin user, 6 Categories, 12 Tags, 3 Sample photos, 1 Sample board.
-- Spotlight presets are omitted here and seeded in Phase 2.1 as requested.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Admin User
-- Plain Password: Admin1234!
-- Hash: $2b$10$lpubySTKvkTppPj5/sUfzOZi8qdeZL1WpLfpYSUaqGhSc157dFxNi
-- Generated via bcrypt with 10 salt rounds: bcrypt.hash('Admin1234!', 10)
-- ----------------------------------------------------------------------------
-- REPLACE: Change the email, username, and password in production
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

-- ----------------------------------------------------------------------------
-- 2. Categories
-- ----------------------------------------------------------------------------
INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Funny Animals', 'funny-animals'),
(2, 'Funny People', 'funny-people'),
(3, 'Memes', 'memes'),
(4, 'Fails', 'fails'),
(5, 'Reactions', 'reactions'),
(6, 'Wholesome', 'wholesome')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- ----------------------------------------------------------------------------
-- 3. Tags
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 4. Sample Photos
-- ----------------------------------------------------------------------------
-- REPLACE: Replace placeholder picsum.photos URLs with real uploaded assets
-- TODO: Expand to 24 items in Phase 3 for masonry infinite-scroll testing
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

-- ----------------------------------------------------------------------------
-- 5. Photo Tags Junction
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 6. Sample Board
-- ----------------------------------------------------------------------------
-- REPLACE: Sample board for testing pins
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

-- ----------------------------------------------------------------------------
-- 7. Board Photos (Pins in Board)
-- ----------------------------------------------------------------------------
INSERT INTO `board_photos` (`board_id`, `photo_id`, `position`, `added_at`) VALUES
(1, 1, 1, NOW()),
(1, 2, 2, NOW()),
(1, 3, 3, NOW())
ON DUPLICATE KEY UPDATE `position`=VALUES(`position`);