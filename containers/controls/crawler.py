import requests
from flask import current_app
from slugify import slugify
from containers.models.container import Container
from containers.models.term import Term
from containers.parsers.prg8 import parse

def run_crawler():
    uri = 'http://www.praha8.cz/kontejnery-na-velkoobjemovy-odpad.html'
    current_app.logger.info('Fetching uri {}'.format(uri))
    content = fetch_content(uri)

    current_app.logger.info('Parsing content')
    containers = parse_data(content)

    rows = len(containers)
    current_app.logger.info('Creating containers. There is {} lines'.format(rows))

    total = {'containers': 0, 'terms': 0}
    for container in containers:
        containers, terms = create_container(container['name'], container['datetime_from'], container['datetime_to'])
        total['containers'] += containers
        total['terms'] += terms

    current_app.db.session.commit()
    current_app.logger.info('Complete! There are {} new containres and {} new terms'.format(total['containers'], total['terms']))


def fetch_content(uri):
    return requests.get(uri).content

def parse_data(string):
    return parse(string)

def normalize_name(name):
    name = name[:name.rfind('(')]
    return slugify(name)


def create_container(name, datetime_from, datetime_to):
    slug = normalize_name(name)
    container = Container.query.filter(Container.slug.like(slug + '%')).first()
    new_terms = 0
    new_containers = 0

    if container is None:
        container = Container(name=name, slug=slug)
        current_app.logger.info('Create new container {}'.format(container.name))
        current_app.db.session.add(container)
        new_containers = 1

    term = container.query.join(Term).filter_by(datetime_from=datetime_from, datetime_to=datetime_to).first()
    if term is None:
        term = Term(datetime_from=datetime_from, datetime_to=datetime_to)
        container.terms.append(term)
        new_terms = 1

    return new_containers, new_terms


