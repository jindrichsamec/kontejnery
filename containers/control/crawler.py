import requests
from containers.models.parser import Parser

def run_crawler():
    "Run crawler and wait for termination"

    uri = 'http://www.praha8.cz/kontejnery-na-velkoobjemovy-odpad.html'
    content = fetch_content(uri)
    data = parse_data(uri)


def fetch_content(uri):
    """Fetch contentent and return html content."""
    return requests.get(uri).content

def parse_data(string):
    parser = new Parser()

