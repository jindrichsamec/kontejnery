from flask import Flask
from flask_cors import CORS, cross_origin
from database import register_db
from bootstrap import register_bootstrap
from containers import register_container
from containers.admin import register_admin
from json_encoder import register_encoder
from logger import register_logger
import os


def create_app():
  app = Flask(__name__)
  app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
  app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or 'postgresql+psycopg2://localhost:32768/containers'
  app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
  app.config['MAPBOX_MAP_ID'] = 'mapbox.streets'
  app.config['MAPBOX_SEARCH'] = True
  app.config['MAPBOX_ACCESS_TOKEN'] = os.environ.get('MAPBOX_ACCESS_TOKEN')
  app.config['LETS_ENCRYPT_SECRET'] = os.environ.get('LETS_ENCRYPT_SECRET')

  app.config['BASIC_AUTH_USERNAME'] = os.environ.get('HTTP_AUTH_USERNAME')
  app.config['BASIC_AUTH_PASSWORD'] = os.environ.get('HTTP_AUTH_PASSWORD')

  cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
  register_logger(app)
  register_encoder(app)

  register_db(app)
  register_bootstrap(app)

  register_admin(app)
  register_container(app)
  return app
