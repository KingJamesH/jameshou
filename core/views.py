from django.shortcuts import render

def home(request):
    return render(request, 'index.html', {'active_page': 'home'})

def about(request):
    return render(request, 'about.html', {'active_page': 'about'})

def skills(request):
    return render(request, 'skills.html', {'active_page': 'skills'})

def portfolio(request):
    return render(request, 'portfolio.html', {'active_page': 'portfolio'})

def contact(request):
    return render(request, 'contact.html', {'active_page': 'contact'})
