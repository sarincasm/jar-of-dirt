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

## Useful Links

1. [Connection](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
1.
