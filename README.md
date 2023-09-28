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
    rest_framework_simplejwt

### Important Libraries used are:
    serializers -- To convert json data to python data types and vice- versa
    APIView -- To render response in json format easily acting like interface between frontend and backend
    channels -- To make live chat possible, making django asynchronus application
    rest_framework_simplejwt -- for user authentication

### Running backend:
Make sure that python>3.7 is installed
In terminal reach to chatapp folder in backend folder --> cd backend/chatapp
Then run the following commands in terminal:
        pip install -r requirements.txt
        python manage.py makemigrations
        python manage.py migrate
        python manage.py runserver

## Front end
Built with React

All the code of frontend is in frontend folder.

### Main packages installed are:
    Web3sockets -- for live chat 
    MaterialUI -- for ui designing
    Axios -- for getting information from rest_api
    react-cookie -- for storing jwt token

### Runing frontend:
    npm i --force
    npm start
