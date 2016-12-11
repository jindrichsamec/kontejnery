from containers.models import Container, Term
from containers.exceptions import ContainerNotFound

def get_container(container_id):
    container = Container.query.get(container_id)

    if container is None:
        raise ContainerNotFound()
    return {'id': container.id, 'name': container.name, 'coordinates': container.coordinates}

def list_containers():
    containers = Container.query.all()
    return [{'id': c.id, 'name': c.name, 'coordinates': c.coordinates} for c in containers]