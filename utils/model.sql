create table if not exists employee (
    id serial primary key,
    user_id text not null,
    name text not null,
    division text not null,
    position text not null,
    gender text not null,
    birth text not null,
    salary int not null,
    contract text not null,
    phone text not null
);

create table if not exists users (
    id serial primary key,
    username text not null,
    email text not null,
    password text not null,
    birth text,
    company text,
    division text,
    position text,
    gender text
);