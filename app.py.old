from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='static', static_url_path='')

# Serve static files directly from root
@app.route('/<path:path>')
def serve_file(path):
    if os.path.exists(f'static/{path}') and os.path.isfile(f'static/{path}'):
        return send_from_directory('static', path)
    return render_template('404.html'), 404

# Main routes
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

# This is needed for Vercel
app = app

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
