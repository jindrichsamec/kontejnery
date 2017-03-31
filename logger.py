import sys
import logging

def register_logger(app):

  formatter = logging.Formatter("[%(levelname)s] %(asctime)s - %(message)s")
  handler = logging.StreamHandler(stream=sys.stdout)
  handler.setFormatter(formatter)

  for h in app.logger.handlers:
    app.logger.removeHandler(h)

  app.logger.addHandler(handler)
  app.logger.setLevel(logging.INFO)
