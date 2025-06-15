from http import HTTPStatus, HTTPMethod
from flask import Flask, request, send_from_directory, render_template, redirect, url_for
import os

app = Flask(__name__, static_folder='../static', template_folder='../templates')

# Import and initialize routes
from routes import init_routes
init_routes(app)

# Serve static files
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# This is the handler that Vercel will use
def handler(event, context):
    # This is a simple handler that will return a basic response
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/html',
        },
        'body': 'Hello from Vercel!'
    }

# This is needed for local development
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
