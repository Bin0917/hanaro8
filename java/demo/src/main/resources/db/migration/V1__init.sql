# create table User
# (
#     createdAt datetime(6)  null,
#     id        int unsigned auto_increment
#         primary key,
#     updatedAt datetime(6)  null,
#     username  varchar(31)  not null,
#     email     varchar(255) not null,
#     constraint UKe6gkqunxajvyxl5uctpl2vl2p
#         unique (email)
# );
CREATE TABLE `user`
(
    `createdAt` datetime(6) DEFAULT NULL,
    `id`        int unsigned                            NOT NULL AUTO_INCREMENT,
    `updatedAt` datetime(6) DEFAULT NULL,
    `telno`     varchar(12) COLLATE utf8mb4_unicode_ci  NOT NULL,
    `username`  varchar(31) COLLATE utf8mb4_unicode_ci  NOT NULL,
    `email`     varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_User_email` (`email`),
    UNIQUE KEY `unique_User_telno` (`username`, `telno`)
);
