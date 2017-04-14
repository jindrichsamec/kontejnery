import pytest
from containers.controls.crawler import *


normalize_name_test_data = [
  ("U Sluncové x Za Invalidovnou (parkoviště)", 'u-sluncove-x-za-invalidovnou'),
  ("U Sluncové x Za Invalidovnou (parkoviště) (Kobylisy)", 'u-sluncove-x-za-invalidovnou-parkoviste'),
  ("Pekařova x Jestřebická (Kobylisy)", 'pekarova-x-jestrebicka'),
]


@pytest.mark.parametrize("name, expected", normalize_name_test_data)
def test_normalize_name(name, expected):
  assert expected == normalize_name(name)

