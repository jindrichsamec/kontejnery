import traceback
from datetime import datetime
from flask import jsonify, g, request, render_template
from flask_restful import reqparse, Resource

from .controls.container import get_container, list_containers
from .exceptions import ContainerNotFound, UnspecifiedError, InvalidArguments

__all__ = ('ContainerDetail', 'ContainerList')

def convert_to_datetime(datetime_string):
    return datetime.strptime(datetime_string, '%Y-%m-%dT%H:%M:%S.%fZ')


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

        parser = reqparse.RequestParser()
        parser.add_argument('since', type=convert_to_datetime, required=True)
        parser.add_argument('till', type=convert_to_datetime, required=True)

        args = parser.parse_args()

        data = list_containers(args['since'], args['till'])
        return {'status_code': 200, 'data': data}
