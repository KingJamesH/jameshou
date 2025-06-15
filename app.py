from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='static')

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

# This is required for Vercel
app = app  # This helps Vercel recognize the app

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
