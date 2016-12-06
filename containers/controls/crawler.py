import requests
from flask import current_app
from slugify import slugify
from containers.models.container import Container
from containers.models.term import Term
from containers.parsers.prg8 import parse

def run_crawler():
    uri = 'http://www.praha8.cz/kontejnery-na-velkoobjemovy-odpad.html'
    content = fetch_content(uri)
    containers = parse_data(content)
    [create_container(container['name'], container['datetime_from'], container['datetime_to']) for container in containers]
    current_app.db.session.commit()


def fetch_content(uri):
    return requests.get(uri).content

def parse_data(string):
    return parse(string)

def normalize_name(name):
    return slugify(name)


def create_container(name, datetime_from, datetime_to):
    slug = normalize_name(name)
    container = Container.query.filter_by(slug = slug).first()

    if container is None:
        container = Container(name=name, slug=slug)
        current_app.db.session.add(container)

    term = container.query.join(Term).filter_by(datetime_from=datetime_from, datetime_to=datetime_to).first()
    if term is None:
        container.terms.append(Term(datetime_from=datetime_from, datetime_to=datetime_to))

