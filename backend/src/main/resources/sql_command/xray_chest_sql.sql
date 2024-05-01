drop database XrayChestDtb;
create database XrayChestDtb;
use XrayChestDtb;

create table doctor(
	id int auto_increment,
    name varchar(100), 
    sex varchar(10),
    address text,
    birthday varchar(30),
    
    primary key(id)
);

create table record(
	id int auto_increment,
    url text,
    mark text,
    name varchar(100),
    sex varchar(10),
	address text,
	birthday varchar(30),
    phone varchar(15),
    weight double,
    height double,
    medical_history text,
    create_date timestamp not null default now(),
    update_date timestamp not null default now(),
    is_remove boolean,
    doctor_id int,
    
    primary key(id)
    
);

create table album(
	id int auto_increment,
    name varchar(100),
    doctor_note text,
    create_date timestamp not null default now(),
    update_date timestamp not null default now(),
    cover_photo text,
    doctor_id int,
    
    primary key(id)
);

create table image_record(
	album_id int,
    record_id int,
    
    primary key(album_id, record_id)
);

alter table album 
add constraint fk_album_doctor_id foreign key(doctor_id) references doctor(id);

alter table record 
add constraint fk_record_doctor_id foreign key(doctor_id) references doctor(id);

alter table image_record 
add constraint fk_image_record_record_id foreign key(record_id) references record(id);

alter table image_record 
add constraint fk_image_record_album_id foreign key(album_id) references album(id);

alter table record 
modify column mark boolean;

alter table record 
add column doctor_note text;

alter table album 
drop column doctor_note;

INSERT INTO doctor (name, sex, address, birthday) VALUES ('Nguyen Van A', 'Male', '12A Tran Hung Dao, Ha Noi', '1990-01-01');
select * from doctor;
select * from record;
select * from album;
select * from image_record;
delete from album where id >= 1;
DELETE FROM record WHERE id = 45 or id = 46;
DELETE FROM image_record WHERE album_id >= 1;









