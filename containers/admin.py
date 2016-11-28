from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from containers.models.container import Container

def register_admin(app):

  admin = Admin(app, name='Kontejnery.info', template_mode='bootstrap3')
  admin.add_view(ModelView(Container, app.db.session))
