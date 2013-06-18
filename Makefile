SOURCES = oranch.js

# ========================================================
# Node tests
# ========================================================

VOWS = ./node_modules/.bin/vows -v
TESTS ?= test/*_test.js

test:
	@NODE_ENV=test $(VOWS) $(TESTS)



# ========================================================
# Static Analysis
# ========================================================

JSHINT = jshint

hint: lint
lint:
	$(JSHINT) $(SOURCES)

.PHONY: test hint lint