from containers.models import Container, Term
from containers.exceptions import ContainerNotFound
from database import db

def get_container(slug, since):
    container = Container.query.\
        filter(Container.slug == slug).\
        first()
    terms = container.get_terms(since)

    if container is None:
        raise ContainerNotFound()
    return {'slug': container.slug, 'name': container.name, 'coordinates': container.get_coordinates(), 'terms': terms}

def list_containers(since, till):
    result = db.session.query(Container, Term).\
        join(Term).\
        filter(Container.coordinates != None).\
        filter(Term.datetime_from >= since).\
        filter(Term.datetime_to <= till).\
        order_by(Term.datetime_from.desc())

    return [{'slug': container.slug, 'name': container.name, 'coordinates': container.get_coordinates(), 'till': term.datetime_to} for (container, term) in result]
