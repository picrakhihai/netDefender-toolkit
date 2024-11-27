from django.shortcuts import render

def password_generator_view(request):
    return render(request, 'password_generator/index.html')
