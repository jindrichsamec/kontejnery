import json
import geoalchemy2.functions as func
from database import db
from geoalchemy2.types import Geography

class Container(db.Model):
    """
        Defines container position and name.
        Uses SRID 4326  (WGS 84)
        @link https://napoveda.seznam.cz/forum/viewtopic.php?f=31&t=26591&sid=6a47a61ee21176a150ad73fdfe584179
    """
    __tablename__ = 'containers'
    id = db.Column(db.Integer, primary_key=True)
    terms = db.relationship('Term')

    name = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), nullable=False)
    coordinates = db.Column(Geography('POINT', srid=4326))

    def get_coordinates(self):
        if self.coordinates is None:
            return self.coordinates
        geom_json = json.loads(db.session.scalar(func.ST_AsGeoJSON(self.coordinates)))
        return geom_json['coordinates']

    def __repr__(self):
        return '<Container #{}: {}>'.format(self.id, self.slug)
