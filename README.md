# kontejnery
Shows trash containers on map

## How to

Run Python API server
- install python3.5 runtime (use virtualenv)
- install python dependencies `pip install -e .`
- run `FLASK_APP=runner python -m runner.py`

Run Python tests
- `python setup.py test`

Run Frontend development server
- before that, run Python API server
- go to `<project_root>/frontend`
- run `yarn install`
- run `yarn start`

Build Frontend application
- go to `<project_root>/frontend`
- run `yarn build`
- built distribution is in `<project_root>/frontend/build`
