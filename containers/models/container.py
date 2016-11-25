from database import db


class Container(db.Model):
    __tablename__ = 'containers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    position = db.Column(db.String, index=True)
    datetime_from = db.Column(db.DateTime)
    datetime_to = db.Column(db.DateTime)

    def __repr__(self):
        return '<Container {}: {}>'.format(self.id, self.name)
