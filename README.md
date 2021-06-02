# ShareReader-Project
U-22コンテスト作品

## Usage
### ./mysql/mysql.envの作成
./mysql/mysql.env.sampleをコピーして作成推奨

```
MYSQL_ROOT_HOST=%
MYSQL_ROOT_PASSWORD=（ルートパスワード）
MYSQL_USER=（ユーザー名）
MYSQL_PASSWORD=（パスワード）
MYSQL_DATABASE=(データーベース名)
```

### コンテナ起動
```
make up
```

- apiサーバー localhost:3000


## Commands
- `make up`  
  `docker-compose up -d` イメージ取得からコンテナ起動まで

- `make stop`  
  `docker-compose stop` コンテナの停止

- `make restart`   
  `docker-compose restart` 全てのコンテナ再起動  
  ソースコードの変更はこれで反映されます。
  
- `make down`  
  `docker-compose down` コンテナ・ネットワークの停止＆削除  
  
[その他コマンド一覧](./doc/commands.md)
  ### windowsでmakeコマンドがない場合
  [qiita Windows10でmakeしたい](https://qiita.com/tyty96/items/f501f44a8d44e3fd6987)