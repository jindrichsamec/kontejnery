import traceback

from flask import jsonify, g, request, render_template
from flask_restful import Resource

from .control import get_container, list_containers
from .exceptions import ContainerNotFound, UnspecifiedError, InvalidArguments

__all__ = ('ContainerDetail', 'ContainerList')


class ContainerDetail(Resource):
    def get(self, user_id):
        try:
            data = get_container(user_id)
            return {'status_code': 200, 'data': data}
        except UserNotFound:
            return {'status_code': 404}, 404
        except UnspecifiedError as e:
            return {'status_code': 500, 'info': str(e)}, 500

class ContainerList(Resource):
    def get(self):
        return {'status_code': 200, 'data': ['List of containers']}
