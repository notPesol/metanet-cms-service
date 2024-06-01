CREATE DATABASE `cms`;

CREATE DATABASE `shofree`;

CREATE TABLE `cms`.`users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `is_deleted` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (current_timestamp),
  `updated_at` TIMESTAMP DEFAULT (current_timestamp)
);

CREATE TABLE `cms`.`wallets` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `balance` DECIMAL(10, 2) DEFAULT 0,
  `is_deleted` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (current_timestamp),
  `updated_at` TIMESTAMP DEFAULT (current_timestamp)
);

CREATE TABLE `cms`.`transactions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `type` ENUM('deposit', 'withdraw', 'payment') NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `is_deleted` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (current_timestamp),
  `updated_at` TIMESTAMP DEFAULT (current_timestamp)
);

CREATE TABLE `shofree`.`products` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10, 2) NOT NULL,
  `stock` INT DEFAULT 0,
  `is_deleted` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (current_timestamp),
  `updated_at` TIMESTAMP DEFAULT (current_timestamp)
);

CREATE TABLE `shofree`.`cart_items` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `is_deleted` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (current_timestamp),
  `updated_at` TIMESTAMP DEFAULT (current_timestamp)
);

CREATE TABLE `shofree`.`orders` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `status` ENUM(
    'pending',
    'paid',
    'shipped',
    'completed',
    'cancelled'
  ) NOT NULL,
  `is_deleted` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (current_timestamp),
  `updated_at` TIMESTAMP DEFAULT (current_timestamp)
);

CREATE TABLE `shofree`.`order_items` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `is_deleted` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (current_timestamp),
  `updated_at` TIMESTAMP DEFAULT (current_timestamp)
);

ALTER TABLE
  `cms`.`wallets`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `cms`.`users` (`id`);

ALTER TABLE
  `cms`.`transactions`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `cms`.`users` (`id`);

ALTER TABLE
  `shofree`.`cart_items`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `cms`.`users` (`id`);

ALTER TABLE
  `shofree`.`cart_items`
ADD
  FOREIGN KEY (`product_id`) REFERENCES `shofree`.`products` (`id`);

ALTER TABLE
  `shofree`.`orders`
ADD
  FOREIGN KEY (`user_id`) REFERENCES `cms`.`users` (`id`);

ALTER TABLE
  `shofree`.`order_items`
ADD
  FOREIGN KEY (`order_id`) REFERENCES `shofree`.`orders` (`id`);

ALTER TABLE
  `shofree`.`order_items`
ADD
  FOREIGN KEY (`product_id`) REFERENCES `shofree`.`products` (`id`);