-- user table

create table users(
    user_id uuid primary key default
    uuid_generate_v4(),
    user_name varchar(255) not null,
    user_email varchar(255) unique not null,
    user_password varchar(255)  not null,
    created_at date default current_date
);

--fake user for test

insert into users(user_name,user_email,user_password) values('Jun', 'jun@mail.com', 'hello');