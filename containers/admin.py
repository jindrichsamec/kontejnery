from flask_basicauth import BasicAuth
from flask_admin import Admin
from flask_admin.contrib.geoa import ModelView

from containers.models import Container, Term
from .exceptions import AuthException

def register_admin(app):

    basic_auth = BasicAuth(app)

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

        def is_accessible(self):
            if not basic_auth.authenticate():
                raise AuthException('Not authenticated.')
            else:
                return True

        def inaccessible_callback(self, name, **kwargs):
            return redirect(basic_auth.challenge())

    admin = Admin(app, name='Kontejnery.info')
    admin.add_view(MyView(Container, app.db.session))
