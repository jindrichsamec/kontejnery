from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from containers.models import Container, Term

def register_admin(app):

    class MyView(ModelView):
        inline_models = (Term, )

    admin = Admin(app, name='Kontejnery.info')
    admin.add_view(MyView(Container, app.db.session))