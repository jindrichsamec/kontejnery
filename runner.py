import os
from app import create_app

containers = create_app()

if __name__ == '__main__':
    port = os.environ.get('PORT') or 5000
    containers.run(host='0.0.0.0', port=int(port))
