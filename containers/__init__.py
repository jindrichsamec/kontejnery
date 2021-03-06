import click
from flask import Blueprint
from flask_restful import Api
from containers.controls.crawler import run_crawler

from .views import *


def register_container(app):

    api = Api(app, prefix='/api')
    api.add_resource(ContainerDetail, '/<string:slug>')
    api.add_resource(ContainerList, '/list')

    @app.route('/.well-known/acme-challenge/<string:lets_encrypt_key>')
    def letsencrypt(lets_encrypt_key):
        return '{}.{}'.format(lets_encrypt_key, app.config['LETS_ENCRYPT_SECRET'])

    @app.route('/')
    def index():
        return 'Velkoobjemkay API'

    @app.cli.command()
    def crawler():
        """Run crawler and updates list of containers"""
        run_crawler()
