from flask import Blueprint
from flask_restful import Api

from .views import *


def register_container(app):

    api = Api(app, prefix='/container')
    api.add_resource(ContainerDetail, '/<int:container_id>', endpoint='container')
    api.add_resource(ContainerList, '/list', endpoint='container_list')

    #user_blueprint = Blueprint('web_user', __name__, template_folder='templates', url_prefix='/web/user')
    #user_blueprint.add_url_rule('/list', view_func=user_listing, endpoint='web_user_listing')
    #user_blueprint.add_url_rule('/<int:user_id>', view_func=user_detail, endpoint='web_user_detail')
    #app.register_blueprint(user_blueprint)
