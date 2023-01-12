# Using PostgreSql with Golang

[Complete Intro To SQL](https://sql.holt.courses/) by Brian Holt, but using Golang, [sqlx](https://github.com/jmoiron/sqlx) and [sql-migrate](https://github.com/rubenv/sql-migrate)

## Quick Start

### Running Migrations

[Install sql-migrate](https://github.com/rubenv/sql-migrate#installation)

(Assuming the database dirty exists)

```
~/go/bin/sql-migrate new -config=migrations-config.yml init
~/go/bin/sql-migrate up -config=migrations-config.yml
~/go/bin/sql-migrate down -config=migrations-config.yml
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
~/go/bin/gin --bin bin/gin-bin --appPort 8080 --immediate run main.go
```

## Useful Links

1. [Connection](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
1. https://www.alexedwards.net/blog/serving-static-sites-with-go
1. https://jmoiron.github.io/sqlx/
1. [Intro to Go](https://github.com/martensonbj/fem-intro-to-go) by Brenna Martenson
