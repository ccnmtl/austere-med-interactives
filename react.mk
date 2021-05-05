S3CMD ?= s3cmd
S3_FLAGS ?= --acl-public --delete-removed --no-progress --no-mime-magic --guess-mime-type
INTERMEDIATE_STEPS = cp src/images/favicon-am.svg dist/images/favicon-am.svg && cp -r src/audio dist/audio
DATA_SENTINAL = src/data/triage.json src/data/medkit.json

src/data/triage.json: data/triage.csv
	cd data && ./databuild.py triage.csv

src/data/medkit.json: data/medkit.csv
	cd data && ./databuild.py medkit.csv

data: $(DATA_SENTINAL)
	touch $(DATA_SENTINAL)
	make src/data/triage.json
	make src/data/medkit.json

runserver: $(JS_SENTINAL) $(DATA_SENTINAL)
	-cp -r src/images dist/images
	-cp -r src/audio dist/audio
	npm run dev

build: $(JS_SENTINAL) $(DATA_SENTINAL)
	npm run build:dev
	-cp -r src/images dist/images
	-cp -r src/audio dist/audio

dev: $(JS_SENTINAL) $(DATA_SENTINAL) 
	npm run dev 

eslint: $(JS_SENTINAL) $(DATA_SENTINAL)
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
	npm run build:prod \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(STAGING_BUCKET)/

deploy-prod: $(JS_SENTINAL) $(DATA_SENTINAL) 
	npm run build:prod \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(PROD_BUCKET)/

.PHONY: runserver build dev eslint test cypress deploy-stage deploy-prod cypress data
