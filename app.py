from flask import Flask, render_template, send_from_directory, request

app = Flask(__name__, 
            static_folder='static',
            static_url_path='',
            template_folder='templates')

# Serve static files with cache control
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

# Main route handler for all pages
@app.route('/')
def home():
    return render_template('index.html', active_page='home')

@app.route('/about')
def about():
    return render_template('about.html', active_page='about')

@app.route('/skills')
def skills():
    return render_template('skills.html', active_page='skills')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html', active_page='portfolio')

@app.route('/contact')
def contact():
    return render_template('contact.html', active_page='contact')

# Catch-all route for client-side routing
@app.route('/<path:path>')
def catch_all(path):
    # If the path is for static files, serve them
    if path.startswith('static/'):
        return send_from_directory('', path)
    # Otherwise, serve the index.html and let the client-side router handle it
    return render_template('index.html', active_page='home')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
