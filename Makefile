SOURCES = oranch.js

# ========================================================
# Node tests
# ========================================================

VOWS = ./node_modules/.bin/vows -v
TESTS ?= test/orach_options_test.js

test:
	@NODE_ENV=test $(VOWS) test/oranch_matching_test.js
	@NODE_ENV=test $(VOWS) test/oranch_options_test.js



# ========================================================
# Static Analysis
# ========================================================

JSHINT = jshint

hint: lint
lint:
	$(JSHINT) $(SOURCES)

.PHONY: test hint lint