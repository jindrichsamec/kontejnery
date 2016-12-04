import pytest
import os

@pytest.fixture
def prg8_html_content():
    return open(os.path.join(os.path.dirname(__file__) + '/containers/parsers/', 'prg8.html'), encoding='utf-8').read()