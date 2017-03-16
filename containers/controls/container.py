from containers.models import Container, Term
from containers.exceptions import ContainerNotFound

def get_container(container_id, since):
    container = Container.query.get(container_id)
    terms = container.get_terms(since)

    if container is None:
        raise ContainerNotFound()
    return {'id': container.id, 'name': container.name, 'coordinates': container.get_coordinates(), 'terms': terms}

def list_containers(since, till):
    containers = Container.query.join(Term).\
        filter(Container.coordinates != None).\
        filter(Term.datetime_from >= since).\
        filter(Term.datetime_to <= till)

    return [{'id': c.id, 'name': c.name, 'coordinates': c.get_coordinates()} for c in containers]
