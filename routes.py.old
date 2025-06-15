from flask import render_template

def init_routes(app):
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
