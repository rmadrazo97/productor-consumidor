# Productor Consumidor

Se desea crear en una base de datos las relaciones existentes entre actrices y los films en los que ha laborado cada una, para esto el estudiante deberá de leer el HTML del sitio de actrices y almacenar lo que se le indica  en una base de datos mysql 

## Estructura

El proyecto está compuesto de 3 piezas de software cada una corriendo en diferentes maquinas: 

#### 1. Productores: 

  Parámetros de entrada: 

   - productores= < cantidad > 

   - puerto= < cantidad > 

  - queuesize= < cantidad >

#### 2. Consumidor: 

  Parametros de entrada:
    - ip:puerto identificador

#### 3. BDD Mysql:
   Tablas: 
- actress(id, name, dob, url,word, Idconsumidor)
- films (id, movie_name, url, idconsumidor) 
- actress_filmografy (actress_id, fild_id, idconsumidor) 

## Aspectos a reforzar en la práctica:

1. comunicación entre procesos 
2. Uso de sockets
3. Sincronización procesos
4. Concurrencia de procesos 
5. Manejo correcto y adecuado de la sección crítica
6. Procesos en condiciones de concurrencia en el manejo de la base de BDD
7. Uso correcto de Transaccionalidad en acceso a BDD
8. Tolerancia a Fallos
9. Pool de hilos
10. UI

## Referencias
- URL BASE: https://en.wikipedia.org/wiki/List_of_American_film_actresses
## Contributors (github users)
- rmadrazo97
- .... .... ....

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
