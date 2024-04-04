CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(150) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    read BIT DEFAULT 0,
    read_datetime DATETIME DEFAULT NULL,
    deleted BIT DEFAULT 0,
    deleted_datetime DATETIME DEFAULT NULL
);
