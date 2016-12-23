import traceback
from datetime import datetime
from flask import jsonify, g, request, render_template
from flask_restful import reqparse, Resource

from .controls.container import get_container, list_containers
from .exceptions import ContainerNotFound, UnspecifiedError, InvalidArguments

__all__ = ('ContainerDetail', 'ContainerList')

def convert_to_start_date(date_string):
    return convert_to_date(date_string, '23:59:59')

def convert_to_end_date(date_string):
    return convert_to_date(date_string, '00:00:00')

def convert_to_date(date_string, time_string):
    return datetime.strptime('{} {}'.format(date_string, time_string), '%Y-%m-%d %H:%M:%S')


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
        parser.add_argument('date_from', type=convert_to_start_date, required=True)
        parser.add_argument('date_to', type=convert_to_end_date, required=True)

        args = parser.parse_args()

        data = list_containers(args['date_from'], args['date_to'])
        return {'status_code': 200, 'data': data}
