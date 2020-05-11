
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
	id_consumidor varchar(25),
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

delete from Actress where id=1;

#INSERT INTO Actress_Filmography VALUES(SELECT id from Actress where actress_name="Diahne Abbot");
SELECT a.id, f.id
INTO Actress_Filmography
FROM Actress as a, Films as f
WHERE a.name = "Diahnne Abbott" and b.name = "Taxi Driver";


INSERT INTO Actress_Filmography (actress_id, film_id)
  SELECT a.id, f.id
  FROM Actress as a, Films as f 
  WHERE a.actress_name = "Diahnne Abbott" and f.movie_name = "Taxi Driver";
