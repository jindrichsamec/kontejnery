from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from app import app
from database import db

from containers.models.container import Container


admin = Admin(app, name='workshop', template_mode='bootstrap3')
admin.add_view(ModelView(Container, db.session))