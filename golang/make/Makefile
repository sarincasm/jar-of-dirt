DIRTY_VAR = 'i am a dirty var'

hello:
	echo "Dirty"

silent:
	@echo "Dirty"

build:
	go build -o bin/main main.go

run:
	go run main.go

compile:
	GOOS=freebsd GOARCH=386 go build -o bin/main-freebsd-386 main.go
	GOOS=linux GOARCH=386 go build -o bin/main-linux-386 main.go
	GOOS=windows GOARCH=386 go build -o bin/main-windows-386 main.go
	# GOOS=nnoo GOARCH=386 go build -o bin/main-nnoo-386 main.go

multiple: compile run

target: dep
	go run main.go

dep:
	@echo "I got a jar"

var:
	@echo ${DIRTY_VAR}

SOURCES := ${wildcard *.go}
OUTPUTS := ${SOURCES:%.go=bin/%}

all: ${OUTPUTS}

show:
	echo ${SOURCES}
	echo ${OUTPUTS}

bin/%: %.go
# will run if the relevant go file ($^) has changed after the binary ($@)
	go build -o $@ $^

clean:
	rm -rf bin
