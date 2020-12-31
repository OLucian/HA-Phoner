# Phone Management Assignment

### Installation

Requires [docker] / [docker-compose] to run.

```sh
$ git clone https://github.com/OLucian/HA-Phoner.git phoner
$ cd phoner
$ docker-compose up -d
$ docker-compose exec api yarn db:latest

Seed some data (optional): 
$ docker-compose exec api yarn db:seed:run
go to -> http://localhost:3000
```
