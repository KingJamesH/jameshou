# Personal Portfolio Website

A modern, responsive personal portfolio website built with Flask, HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Modern and clean UI with smooth animations
- Five main pages: Home, About, Skills, Portfolio, and Contact
- Interactive elements and smooth scrolling
- Easy to customize with your own content

## Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/personal-website.git
   cd personal-website
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. Make sure you're in the project directory
2. Run the Flask application:
   ```bash
   python app.py
   ```
3. Open your browser and navigate to `http://127.0.0.1:5000/`

## Customization

1. **Personal Information**: Update the content in the HTML files located in the `templates` directory.
2. **Styling**: Modify the CSS in `static/css/style.css` to match your preferred colors and styles.
3. **Images**: Replace the placeholder images in `static/images/` with your own.
4. **Projects**: Update the project cards in `templates/portfolio.html` with your own projects.
5. **Social Media**: Update the social media links in the HTML files with your own profiles.

## Project Structure

```
personal-website/
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── profile.jpg
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── about.html
│   ├── skills.html
│   ├── portfolio.html
│   └── contact.html
├── app.py
└── requirements.txt
```

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (loaded via CDN)

## License

This project is open source and available under the [MIT License](LICENSE).

---

Feel free to customize this template to make it your own! If you have any questions or need further assistance, please don't hesitate to reach out.
