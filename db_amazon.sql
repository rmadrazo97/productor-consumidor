
use sopes;


create table Actress(
	id int not null auto_increment primary key,
    actress_name varchar(150) not null,
	actress_role varchar(50),	
    actress_url varchar(150),
	letter varchar(100),
	id_consumidor varchar(25)
);

create table Films(
	id int not null auto_increment primary key,
    movie_name varchar(100) not null,
	movie_url varchar(150) not null,
    id_consumidor varchar(25)    
);


create table Actress_Filmography(
	actress_id int not null,
    film_id int not null,	
    CONSTRAINT fk_actress FOREIGN KEY (actress_id) REFERENCES Actress(id),
    CONSTRAINT fk_films FOREIGN KEY (film_id) REFERENCES Films(id)    
);	


show tables;


drop table Actress;
drop table Films;
drop table Actress_Filmography;




select * from Actress;
select * from Films;
select * from Actress_Filmography;