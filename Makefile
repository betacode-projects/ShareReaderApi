up: 
	docker-compose up -d

stop:
	docker-compose stop

restart:
	docker-compose restart

restart_api:
	docker-compose restart api

restart_socket:
	docker-compose restart websocket

restart_db:
	docker-compose restart mysql

down:
	docker-compose down

down_image:
	docker-compose down --rmi all

down_vol:
	docker-compose down -v