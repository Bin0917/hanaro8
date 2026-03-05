alter table User
    add column salhour decimal(8, 3) not null default 0;


CREATE TABLE `Member`
(
    `id`        int unsigned                            NOT NULL AUTO_INCREMENT,
    `password`  varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email`     varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `nickname`  varchar(30) COLLATE utf8mb4_unicode_ci  NOT NULL,
    `bloodType` enum ('A','AB','B','O') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `createdAt` timestamp                               NOT NULL   DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp                               NOT NULL   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `isActive`  bit(1)                                  NOT NULL   DEFAULT b'0',
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_Member_email` (`email`)
);


create table Post
(
    id        int unsigned                                                    not null auto_increment,
    title     varchar(255),
    body      varchar(2000),
    writer    varchar(31)                                                     not null,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP                             not null,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
    primary key (id)
);