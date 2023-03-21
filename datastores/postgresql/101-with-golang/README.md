# Using PostgreSql with Golang

[Complete Intro To SQL](https://sql.holt.courses/) by Brian Holt, but using Golang, [sqlx](https://github.com/jmoiron/sqlx) and [sql-migrate](https://github.com/rubenv/sql-migrate)

## Setup

### Running Migrations

[Install sql-migrate](https://github.com/rubenv/sql-migrate#installation)

(Assuming the database dirty exists)

```
~/go/bin/sql-migrate up -config=migrations-config.yml
```

To create a new migration

```
~/go/bin/sql-migrate new -config=migrations-config.yml <name>
```

To `undo` the last migration

```
~/go/bin/sql-migrate down -config=migrations-config.yml
```

or to undo all migrations

```
~/go/bin/sql-migrate down -config=migrations-config.yml -limit=0
```

### Running Go Scripts

```
go run main.go
```

### Live Reload

Install [Gin](https://github.com/codegangsta/gin)

```
go install github.com/codegangsta/gin
```

```
~/go/bin/gin --bin bin/gin-bin --appPort 8080 --immediate run .
```

### API Calls

```
curl --location --request GET 'localhost:8080/ingredients/search?term=a&page=1'
curl --location --request GET 'localhost:8080/ingredients/type?type=fruit'

curl --location 'localhost:8080/recipes/search'
curl --location 'localhost:8080/recipes/get?id=1'
```

## Useful Links

1. [Connection](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
1. https://www.alexedwards.net/blog/serving-static-sites-with-go
1. https://jmoiron.github.io/sqlx/
1. [Code for the SQL apps project](https://github.com/btholt/sql-apps)
1. [Intro to Go](https://github.com/martensonbj/fem-intro-to-go) by Brenna Martenson
1. [PostgreSql Window function](https://www.postgresqltutorial.com/postgresql-window-function/)
1. https://stackoverflow.com/questions/18635671/how-to-define-multiple-name-tags-in-a-struct
1. https://stackoverflow.com/questions/12334697/variadic-functions-parameters-pass-through
1. https://stackoverflow.com/questions/8270816/converting-go-struct-to-json
1. https://www.postgresql.org/docs/current/sql-explain.html
