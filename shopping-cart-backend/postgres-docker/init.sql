begin;
create table if not exists users
(
    id   serial primary key,
    name varchar(50) not null,
    age  integer     not null
);
create table if not exists products
(
    id        serial primary key,
    color     varchar(30) not null,
    size      varchar(3)  not null,
    available integer
);
create table if not exists orders
(
    id           serial primary key,
    user_id      integer references users (id),
    created_date date not null
);
create table if not exists order_items
(
    order_id   integer references orders (id),
    product_id integer references products (id),
    amount     integer
);
insert into products(color, size, available)
values ('WHITE', 'S', 5),
       ('WHITE', 'M', 3),
       ('WHITE', 'L', 6),
       ('WHITE', 'XL', 2),
       ('WHITE', 'XXL', 1),
       ('BLACK', 'S', 5),
       ('BLACK', 'M', 3),
       ('BLACK', 'L', 6),
       ('BLACK', 'XL', 2),
       ('BLACK', 'XXL', 1),
       ('GREEN', 'S', 5),
       ('GREEN', 'M', 3),
       ('GREEN', 'L', 6),
       ('GREEN', 'XL', 2),
       ('GREEN', 'XXL', 1);
commit;