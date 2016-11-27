from app import create_app

containers = create_app()

if __name__ == '__main__':
    containers.run(debug=True, host='0.0.0.0')
