# node-express-server
making practice with Express

This is my first attempt to create a webserver with express framework.<br>
Please consider that everything is made for fun and learning.<br>
Lot of improvements has to be implemented, i'll make it as soon as I improve my skill.<br>
If you want to try it, run:<br>
```docker-compose up -d```<br>
If you want to see your database status type:<br>
```docker exec -it axum_project_db_1 bash``` (replace axum_project_db_1 with another name if docker gives a different name to the db container)<br>
```psql -h localhost -d postgres -U postgres``` (type: postgres if it asks a password)<br>
then type:<br>  ```SELECT * FROM users;```<br>
type:  ```exit``` for exiting postgres shell<br>
test it with ```localhost:8000/```<br>
type:<br> ```docker-compose down``` to quit the program.
