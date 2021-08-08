# Commands
- `make up`  
  `docker-compose up -d` イメージ取得からコンテナ起動まで

- `make up_api`
  apiとmysqlのコンテナの起動

- `make stop`  
  `docker-compose stop` コンテナの停止

- `make restart`   
  `docker-compose restart` 全てのコンテナ再起動  
  ソースコードの変更はこれで反映されます。

- `make restart_api`  
  apiコンテナの再起動

- `make restart_db`  
  databaseのコンテナの再起動

- `make restart_socket`  
  websocketコンテナの再起動
  
- `make down`  
  `docker-compose down` コンテナ・ネットワークの停止＆削除  

- `make down_image`  
  コンテナ・ネットワーク・イメージの停止＆削除

- `make down_vol`  
  `docker-compse down -v` コンテナ・ネットワーク・ボリュームの停止＆削除 