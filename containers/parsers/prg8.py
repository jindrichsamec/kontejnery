"""Parser for P-8"""
from datetime import datetime
import re
from bs4 import BeautifulSoup
from flask import current_app

def parse(html_doc):
    """Parses HTML string and return data"""

    soup = BeautifulSoup(html_doc, 'html.parser')

    tables = soup.find_all('table', class_='mcp8')
    containers_list = []
    for table in tables:
        containers_list += parse_table(table, containers_list)
    return containers_list


def parse_table(table, containers_list):
    rows = []
    for tr in table.find_all('tr'):
        if 'mcp8TableHeaderRow' not in tr['class']:
            try:
                rows.append(parse_row(tr))
            except ValueError as e:
                current_app.logger.error('Cant parse row {}, becasue {}'.format(tr, e))

    return rows

def parse_row(row):
    tds = row.find_all('td')
    datetime_from, datetime_to = parse_datetime_interval(tds[0].text.strip(), tds[1].text.strip())
    name = '{} ({})'.format(tds[2].text.strip(), tds[3].text.strip()) if len(tds) > 3 else tds[2].text.strip()

    return {
        'name': name,
        'datetime_from': datetime_from,
        'datetime_to': datetime_to
    }


def parse_datetime_interval(date_as_string, timeinterval_as_string):

    match = re.search('(\d{1,2}.\d{1,2})[^0-9]*(\d{1,2}.\d{1,2})', timeinterval_as_string)
    datetime_from_string = '{} {}'.format(date_as_string, match.group(1))
    datetime_to_string = '{} {}'.format(date_as_string, match.group(2))

    datetime_from = parse_datetime(datetime_from_string)
    datetime_to = parse_datetime(datetime_to_string)
    return (datetime_from, datetime_to)


def parse_datetime(datetime_as_string):
    result = datetime.strptime(datetime_as_string, '%d. %m. %H.%M')
    year = datetime.today().year
    currentMonth = datetime.today().month
    if result.month < currentMonth and currentMonth > 10:
        year = year + 1
    return result.replace(year=year)
