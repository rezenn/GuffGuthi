-- user table

create table users(
    user_id uuid primary key default
    uuid_generate_v4(),
    user_name varchar(255) not null,
    user_email varchar(255) unique not null,
    user_password varchar(255)  not null,
    created_at date default current_date
);

-- test test test
create table test(
    user_id uuid primary key default
    uuid_generate_v4(),
    user_name varchar(255) not null,
    user_email varchar(255) unique not null,
    user_password varchar(255)  not null,
    coverPic varchar(255),
    profilePic varchar(255),
    bio varchar(255),
    location varchar(255),

    created_at date default current_date
);

create table posts(
    post_id serial primary key not null,
    post_title varchar(255) not null,
    post_desc text not null,
    user_id uuid references test(user_id) on delete cascade,
    img varchar(255),
    created_at timestamp default current_timestamp
);

create table comments(
    comments_id serial primary key not null,
    comments_desc text not null,
    user_id uuid references test(user_id) on delete cascade,
    post_id int references posts(post_id) on delete cascade,
    created_at timestamp default current_timestamp
);

create table likes(
    likes_id serial primary key not null,
    user_id uuid references test(user_id) on delete cascade,
    post_id int references posts(post_id) on delete cascade,
    created_at timestamp default current_timestamp
);


create table follow(
    follow_id serial primary key not null,
    followerUser_id uuid not null,
    followedUser_id uuid not null,
    created_at timestamp default current_timestamp,
    foreign key (followerUser_id) references test(user_id) on delete cascade,
    foreign key (followedUser_id) references test(user_id) on delete cascade,
    check (followerUser_id <> followedUser_id),
    unique (followerUser_id, followedUser_id)
);


