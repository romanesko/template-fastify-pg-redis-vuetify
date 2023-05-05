create table users(
    id bigserial primary key ,
    name text
);

insert into users(name) values('John');
insert into users(name) values('Jack');
insert into users(name) values('Mary');
