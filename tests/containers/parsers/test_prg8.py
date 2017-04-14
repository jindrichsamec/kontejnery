import pytest
import datetime
from bs4 import BeautifulSoup
from containers.parsers.prg8 import *

current_year = datetime.today().year

parse_datetime_test_data = [
    ('4. 12. 13.00', datetime(current_year, 12, 4, 13)),
    ('1. 1. 13.00', datetime(current_year, 1, 1, 13)),
    ('12. 6. 8.00', datetime(current_year, 6, 12, 8)),
    ('4. 12. 1.00', datetime(current_year, 12, 4, 1)),
    ('4. 12. 23.59', datetime(current_year, 12, 4, 23, 59)),
    ('1. 12. 13.00', datetime(current_year, 12, 1, 13, 00))
]

parse_datetime_interval_test_data = [
    ('4. 2.', '13.00 - 17.00', (datetime(current_year, 2, 4, 13), datetime(current_year, 2, 4, 17))),
    ('4. 2.', '13.00-17.00', (datetime(current_year, 2, 4, 13), datetime(current_year, 2, 4, 17))),
    ('4. 2.', '13.00 / 17.00', (datetime(current_year, 2, 4, 13), datetime(current_year, 2, 4, 17))),
    ('4. 2.', '13.00–17.00', (datetime(current_year, 2, 4, 13), datetime(current_year, 2, 4, 17)))
]


def test_parse(prg8_html_content):
    containers = parse(prg8_html_content)
    expected = {
        'name': 'V Zámcích (u domu 51/64) (Bohnice)',
        'datetime_from': datetime(current_year, 4, 3, 13),
        'datetime_to': datetime(current_year, 4, 3, 17)
    }
    assert len(containers) == 162
    assert containers[4] == expected


@pytest.mark.parametrize("datetime_string, expected", parse_datetime_test_data)
def test_parse_datetime(datetime_string, expected):
    assert expected == parse_datetime(datetime_string)


@pytest.mark.parametrize("date_string, interval_string, expected", parse_datetime_interval_test_data)
def test_parse_datetime_interval(date_string, interval_string, expected):
    assert expected == parse_datetime_interval(date_string, interval_string)


def test_parse_row():
    html_row = '<tr class="mcp8TableOddRow"><td class="mcp8TableEvenCol" align="center">&nbsp; 1. 12.<br /> </td><td class="mcp8TableOddCol" align="center"> 13.00–17.00<br /> </td><td class="mcp8TableEvenCol"> V Zámcích (u domu 51/64)<br /> </td><td class="mcp8TableOddCol"> Bohnice<br /> </td></tr>'

    row = BeautifulSoup(html_row, 'html.parser')

    expected = {
        'name': 'V Zámcích (u domu 51/64) (Bohnice)',
        'datetime_from': datetime(current_year, 12, 1, 13),
        'datetime_to': datetime(current_year, 12, 1, 17)
    }
    assert expected == parse_row(row)

