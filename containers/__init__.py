import click
from flask import Blueprint
from flask_restful import Api
from containers.controls.crawler import run_crawler

from .views import *


def register_container(app):

    api = Api(app, prefix='/api')
    api.add_resource(ContainerDetail, '/<int:container_id>', endpoint='container')
    api.add_resource(ContainerList, '/list', endpoint='container_list')

    #user_blueprint = Blueprint('web_user', __name__, template_folder='templates', url_prefix='/web/user')
    #user_blueprint.add_url_rule('/list', view_func=user_listing, endpoint='web_user_listing')
    #user_blueprint.add_url_rule('/<int:user_id>', view_func=user_detail, endpoint='web_user_detail')
    #app.register_blueprint(user_blueprint)

    @app.route('/')
    def index():
        pages = [
            {'url': '/api/list', 'label': 'List of containers'},
            {'url': '/api/1', 'label': 'Detail of container'},
            {'url': '/admin', 'label': 'Admin'}
        ]
        result = ['<a href="{}">{}</a>'.format(page['url'], page['label']) for page in pages]
        return '<br>'.join(result)

    @app.cli.command()
    def crawler():
        """Run crawler and updates list of containers"""
        run_crawler()
