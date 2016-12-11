import os
from setuptools import setup


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname), encoding='utf-8').read()


setup(
    name = "Kontejnery",
    version = "0.0.1",
    author = "Jindrich Samec",
    author_email = "jindrich.samec@xjs.cz",
    description = ("Shows containers on map."),
    url = "https://github.com/jindrichsamec/kontejnery",
    packages=[],
    long_description=read('README.md'),
    setup_requires=['pytest-runner'],
    install_requires=[
        "flask",
        "flask-sqlalchemy",
        "flask-admin==1.3.0",
        "flask-migrate",
        "flask-bootstrap",
        "flask-restful",
        "passlib",
        "bs4",
        'python-slugify',
        'requests',
        'geoalchemy2',
        'psycopg2',
        'shapely'
    ],
    tests_require=['pytest'],
)
