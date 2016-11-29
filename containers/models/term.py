from database import db


class Term(db.Model):
    __tablename__ = 'terms'
    id = db.Column(db.Integer, primary_key=True)
    container_id = db.Column(db.Integer, db.ForeignKey('containers.id'), nullable=False)
    container = db.relationship('Container', back_populates="terms")

    datetime_from = db.Column(db.DateTime, nullable=False)
    datetime_to = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<Term: (id: {}) {} - {}>'.format(self.id, self.datetime_from, self.datetime_to)
