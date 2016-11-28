import traceback

from flask import jsonify, g, request, render_template
from flask_restful import Resource

from .control import get_container, list_containers
from .exceptions import ContainerNotFound, UnspecifiedError, InvalidArguments

__all__ = ('ContainerDetail', 'ContainerList')


class ContainerDetail(Resource):
    def get(self, container_id):
        try:
            data = get_container(container_id)
            return {'status_code': 200, 'data': data}
        except ContainerNotFound:
            return {'status_code': 404}, 404
        except UnspecifiedError as e:
            return {'status_code': 500, 'info': str(e)}, 500

class ContainerList(Resource):
    def get(self):
        data = list_containers()
        return {'status_code': 200, 'data': data}
