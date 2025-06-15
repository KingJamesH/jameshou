from flask import Flask, send_from_directory, render_template, request, redirect, url_for
import os

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
    # List of valid routes
    valid_routes = ['', 'about', 'skills', 'portfolio', 'contact']
    
    # If the path is a valid route, redirect to it
    if path in valid_routes:
        return redirect(url_for(path))
        
    # If the path is for static files, serve them
    if path.startswith('static/'):
        try:
            return send_from_directory('', path)
        except:
            pass
            
    # For any other route, serve the index.html and let client-side handle it
    return render_template('index.html', active_page='home')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
