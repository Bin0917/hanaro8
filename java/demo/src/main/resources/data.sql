SET FOREIGN_KEY_CHECKS = 0;
# 테이블 정리 후 insert
truncate table User;
truncate table Member;
truncate table Post;
truncate table PostBody;
# truncate table Post;
SET FOREIGN_KEY_CHECKS = 1;

SET time_zone = 'Asia/Seoul';


insert into User(username, email, telno, bloodType)
values ('승빈', 'bean@gmail.com', '01012345678', 'A'),
       ('아무개', 'amugae@gmail.com', '01012348888', 'AB');

insert into Member(nickname, email, passwd, bloodType, isActive)
values ('멤버쓰', 'email@email.com', 'xxxx', 'A', false),
       ('멤보입니다', '이메일@이메일.com', '5678', 'B', true);


insert into Post(title, writer)
values ('Title1', 1);
insert into PostBody(body, post)
values ('body of title1', last_insert_id());
insert into Post(title, writer)
values ('Title2', 2);
insert into PostBody(body, post)
values ('body of title2', last_insert_id());
# insert into Post(title, writer)
# values ('Title3', 3);
# insert into PostBody(body, post)
# values ('body of title3', last_insert_id());

insert into Reply(reply, replier, post)
values ('rrr1-1', 1, 1);
insert into Reply(reply, replier, post)
values ('rrr1-2', 1, 1);
