IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'notifications')
                  BEGIN
                      CREATE TABLE notifications (
                      id BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
                      user_id VARCHAR(150) NOT NULL,
                      title VARCHAR(255) NOT NULL,
                      message TEXT NOT NULL,
                      datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
                      is_read BIT DEFAULT 0,
                      read_datetime DATETIME DEFAULT NULL,
                      deleted BIT DEFAULT 0,
                      deleted_datetime DATETIME DEFAULT NULL
                    ); 
                  END;
