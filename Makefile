STAGING_URL=https://austere-medicine.stage.ctl.columbia.edu/
PROD_URL=https://austere-medicine.ctl.columbia.edu/
STAGING_BUCKET=austere-medicine.stage.ctl.columbia.edu
PROD_BUCKET=austere-medicine.ctl.columbia.edu
INTERMEDIATE_STEPS ?= echo nothing
NODE_MODULES ?= ./node_modules
DIST ?= dist
JS_SENTINAL ?= $(NODE_MODULES)/sentinal

include *.mk

.DEFAULT_GOAL = install

$(JS_SENTINAL): package.json
	rm -rf $(NODE_MODULES)
	npm install
	touch $(JS_SENTINAL)

install:
	touch package.json 
	make $(JS_SENTINAL)

clean:
	rm -rf $(NODE_MODULES) $(DIST) $(DATA_SENTINAL)

.PHONY: clean install
