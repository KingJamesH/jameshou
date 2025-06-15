from flask import Flask, render_template, send_from_directory, request, jsonify

app = Flask(__name__, 
            static_folder='static',
            static_url_path='',
            template_folder='templates')

def get_page_context(active_page):
    """Helper function to get common template context"""
    return {'active_page': active_page}

# Serve static files with cache control
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

# Main route handler for all pages
@app.route('/')
def home():
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render_template('index.html', **get_page_context('home'))
    return render_template('base.html', **get_page_context('home'))

@app.route('/about')
def about():
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render_template('about.html', **get_page_context('about'))
    return render_template('base.html', **get_page_context('about'))

@app.route('/skills')
def skills():
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render_template('skills.html', **get_page_context('skills'))
    return render_template('base.html', **get_page_context('skills'))

@app.route('/portfolio')
def portfolio():
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render_template('portfolio.html', **get_page_context('portfolio'))
    return render_template('base.html', **get_page_context('portfolio'))

@app.route('/contact')
def contact():
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render_template('contact.html', **get_page_context('contact'))
    return render_template('base.html', **get_page_context('contact'))

# Catch-all route for client-side routing
@app.route('/<path:path>')
def catch_all(path):
    # If the path is for static files, serve them
    if path.startswith('static/'):
        return send_from_directory('', path)
    # Otherwise, serve the index.html and let the client-side router handle it
    return render_template('base.html', **get_page_context('home'))

if __name__ == '__main__':
    app.run(debug=True, port=5001)
