# Chat Application

By Karanam Preethi
EE Department,
IIT JODHPUR (roll no: B21EE032),

## Backend

Done with Django.

All the code of backend is in chatapp folder of backend folder.

All the required packages are in requirements.txt file in chat app folder

### Main packages installed are:
    Channels with daphne
    rest_framework

### Important Libraries used are:
    serializers -- To convert json data to python data types and vice- versa
    APIView -- To render response in json format easily acting like interface between frontend and backend
    channels -- To make live chat possible, making django asynchronus application

### Running backend:
    Make sure that python>3.7 is installed
    In terminal reach to chatapp folder in backend folder --> cd backend/chatapp
    Then run the following commands in terminal:
        pip install -r requirements.txt
        python manage.py makemigrations
        python manage.py migrate
        python manage.py runserver
