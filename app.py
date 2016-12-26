from flask import Flask
from database import register_db
from bootstrap import register_bootstrap
from containers import register_container
from containers.admin import register_admin
from json_encoder import register_encoder
import os


def create_app():
  app = Flask(__name__)
  app.config['SECRET_KEY'] = 'd76b9af7-0caf-4749-b671-65912beea187'
  app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or 'postgresql+psycopg2://localhost:5432/containers'
  app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
  app.config['MAPBOX_MAP_ID'] = 'mapbox.streets'
  app.config['MAPBOX_SEARCH'] = True
  app.config['MAPBOX_ACCESS_TOKEN'] = 'pk.eyJ1IjoiamluZHJpY2hzYW1lYyIsImEiOiJjaXdkdnJ0cmQwMDd2MnlueHN6ZGlrY2M4In0.9LfZvNCXUBeczArL77FgOg'
  register_encoder(app)

  register_db(app)
  register_bootstrap(app)

  register_admin(app)
  register_container(app)
  return app