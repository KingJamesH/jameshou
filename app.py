from flask import Flask, render_template, send_from_directory, request, jsonify
import os

app = Flask(__name__, static_folder='static')

# Import and initialize routes
from routes import init_routes
init_routes(app)

# Serve static files
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

# This is needed for Vercel
app = app

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
