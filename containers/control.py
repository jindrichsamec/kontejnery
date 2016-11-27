from .models.container import Container
from .exceptions import ContainerNotFound

def get_container(container_id):
  container = Container.query.get(container_id)

  if container is None:
    raise ContainerNotFound()
  return {'id': container.id, 'title': container.title, 'point': container.point}

def list_containers():
  containers = Container.query.all()
  return [{'id': c.id, 'title': c.title} for c in continares]