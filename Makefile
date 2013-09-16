all: clean build

clean:
	rm -rf build public/weekmeals.js

build: js

js: amd
	@./node_modules/.bin/r.js -o build.json

amd:
	@./node_modules/.bin/grunt

.PHONY: build js

