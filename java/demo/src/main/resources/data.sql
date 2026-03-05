SET FOREIGN_KEY_CHECKS = 0;
# 테이블 정리 후 insert
truncate table User;
truncate table Member;
# truncate table Post;
SET FOREIGN_KEY_CHECKS = 1;

SET time_zone = 'Asia/Seoul';


insert into User(username, email, telno, bloodType)
values ('승빈', 'bean@gmail.com', '01012345678', 'A'),
       ('아무개', 'amugae@gmail.com', '01012348888', 'AB');

insert into Member(nickname, email, passwd, bloodType, isActive)
values ('멤버쓰', 'email@email.com', '1234', 'A', false),
       ('멤보입니다', '이메일@이메일.com', '5678', 'B', true);


insert into Post(title, writer, body)
values ('Title1', 'hong', 'body of Title1'),
       ('Title2', 'kim', 'body of Title2'),
       ('Title3', 'lee', 'body of Title3');