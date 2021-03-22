S3CMD ?= s3cmd
S3_FLAGS ?= --acl-public --delete-removed --no-progress --no-mime-magic --guess-mime-type
INTERMEDIATE_STEPS ?= echo nothing
DATA_SENTINAL = src/data/triage.js src/data/medkit.js

src/data/triage.js: data/triage.csv
	cd data && python3 databuild.py triage.csv

src/data/medkit.js: data/medkit.csv
	cd data && python3 databuild.py medkit.csv

runserver: $(JS_SENTINAL) $(DATA_SENTINAL)
	-cp src/images/* dist/images/.
	npm run serve

build: $(JS_SENTINAL) $(DATA_SENTINAL)
	npm run build
	cp src/images/* dist/images/.

dev: $(JS_SENTINAL) $(DATA_SENTINAL) 
	npm run dev 

eslint: $(JS_SENTINAL)
	npm run eslint

test: $(JS_SENTINAL) eslint $(DATA_SENTINAL)
	npm run test
	npm run cypress:test

cypress:
	npm run cypress:open

watch-test: $(JS_SENTINAL) $(DATA_SENTINAL)
	npm run test:watch

snapshot: $(JS_SENTINAL) $(DATA_SENTINAL)
	npm run test:snapshot

deploy-stage: $(JS_SENTINAL $(DATA_SENTINAL)) 
	npm run build:stage \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(STAGING_BUCKET)/

deploy-prod: $(JS_SENTINAL) $(DATA_SENTINAL) 
	npm run build:prod \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(PROD_BUCKET)/

.PHONY: runserver build dev eslint test cypress deploy-stage deploy-prod cypress demo
