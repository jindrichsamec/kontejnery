from flask_admin import Admin
from flask_admin.contrib.geoa import ModelView

from containers.models import Container, Term

def register_admin(app):

    class MyView(ModelView):
        can_delete = False
        can_create = False
        form_edit_rules = ('name', 'slug', 'coordinates')
        form_widget_args = {
            'coordinates': {
                'data-width': 1200,
                'data-height': 600,
                #'data-lat': 14.4805383682251,
                #'data-lng': 50.1063225815669,
                'data-zoom': 13,
            }
        }

    admin = Admin(app, name='Kontejnery.info')
    admin.add_view(MyView(Container, app.db.session))