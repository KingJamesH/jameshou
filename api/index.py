import os
from flask import Flask, request, send_from_directory, render_template, redirect, url_for

app = Flask(__name__, static_folder='../static', template_folder='../templates')

# Import and initialize routes
from routes import init_routes
init_routes(app)

# Serve static files
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# This is the entry point for Vercel
def handler(event, context):
    return app(event, context)

# This is needed for local development
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
