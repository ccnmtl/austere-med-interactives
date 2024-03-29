S3CMD ?= s3cmd
S3_FLAGS ?= --acl-public --delete-removed --no-progress --no-mime-magic --guess-mime-type
INTERMEDIATE_STEPS = mkdir -p dist/images && cp src/images/favicon-am.svg dist/images/favicon-am.svg && cp -r src/audio dist/audio
DIST_CLEAN = rm -rf dist
DATA_SENTINAL = src/data/triage.json src/data/medkit.json

src/data/triage.json: data/triage.csv
	cd data && ./databuild.py triage.csv

src/data/medkit.json: data/medkit.csv
	cd data && ./databuild.py medkit.csv

data: $(DATA_SENTINAL)
	make src/data/triage.json
	make src/data/medkit.json

runserver: $(JS_SENTINAL) $(DATA_SENTINAL)
	-mkdir dist && mkdir dist/images
	$(INTERMEDIATE_STEPS) && \
	npm run dev

build: $(JS_SENTINAL) $(DATA_SENTINAL)
	npm run build:dev && \
	$(INTERMEDIATE_STEPS)

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
	$(DIST_CLEAN) && \
	npm run build:prod && \
	$(INTERMEDIATE_STEPS) && \
	$(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(STAGING_BUCKET)/

deploy-prod: $(JS_SENTINAL) $(DATA_SENTINAL) 
	$(DIST_CLEAN) && \
	npm run build:prod && \
	$(INTERMEDIATE_STEPS) && \
	$(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(PROD_BUCKET)/

.PHONY: runserver build dev eslint test cypress deploy-stage deploy-prod cypress data
