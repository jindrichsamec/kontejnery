from flask.json import JSONEncoder
import flask.ext.restful.representations.json

class CustomJSONEncoder(JSONEncoder):

    def default(self, obj):
        try:
            if isinstance(obj, 'datetime'):
              return obj.isoformat()
        except TypeError:
            pass
        return JSONEncoder.default(self, obj)

def register_encoder(app):
    app.config['RESTFUL_JSON'] = {'cls': CustomJSONEncoder}
