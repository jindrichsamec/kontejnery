from .models import Container, Term
from .exceptions import ContainerNotFound

def get_container(container_id):
    container = Container.query.get(container_id)

    if container is None:
        raise ContainerNotFound()
    return {'id': container.id, 'name': container.name, 'position': container.position}

def list_containers():
    containers = Container.query.all()
    return [{'id': c.id, 'name': c.name} for c in containers]