VENV := venv

.PHONY: all clean serve

all: serve

$(VENV)/bin/activate: requirements.txt
	python3 -m venv $(VENV)
	$(VENV)/bin/pip install -r requirements.txt

serve: $(VENV)/bin/activate
	. $(VENV)/bin/activate && mkdocs serve

clean:
	rm -rf $(VENV)