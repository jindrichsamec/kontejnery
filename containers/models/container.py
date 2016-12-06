from database import db

class Container(db.Model):
    __tablename__ = 'containers'
    id = db.Column(db.Integer, primary_key=True)
    terms = db.relationship('Term')

    name = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), nullable=False)
    position = db.Column(db.String, index=True)

    def __repr__(self):
        return '<Container #{}: {}>'.format(self.id, self.slug)
