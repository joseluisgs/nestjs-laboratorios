create table ROLES
(
    id          varchar(36)                         not null
        primary key,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    description varchar(250)                        not null,
    name        varchar(100)                        not null,
    constraint IDX_130b69a58da8bb01c373f8ca3d
        unique (name)
);

INSERT INTO USERS_DB.ROLES (id, created_at, updated_at, description, name) VALUES ('9ded2a8b-a2c6-4f27-b5f9-765ab683b25f', '2023-09-30 12:05:35', '2023-09-30 12:05:35', 'Administración', 'ADMIN');
INSERT INTO USERS_DB.ROLES (id, created_at, updated_at, description, name) VALUES ('b012ad7e-bf10-4312-9a77-770bc1ebf4f0', '2023-09-30 12:06:51', '2023-09-30 12:06:51', 'Vendedor', 'SELLER');
INSERT INTO USERS_DB.ROLES (id, created_at, updated_at, description, name) VALUES ('49160113-16cc-42bf-b4c7-4181819b79fe', '2023-09-30 12:07:11', '2023-09-30 12:07:11', 'Usuario', 'USER');
