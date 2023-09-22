import React, {forwardRef} from 'react';
import {GoogleLogin} from 'react-google-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Button } from '@mui/material';
import {FcGoogle} from 'react-icons/fc';
import './login.css'

const Client_id = "290081485876-km2aepfp9ajsmskkhettq5tlhubn6vk2.apps.googleusercontent.com";

const GoogleLoginOption = ({handleLogin}) => {

    const onFailure = (res) => {
        console.log('Login Failed ! res :', res);
    }

  return (
    <div>
        <GoogleOAuthProvider clientId={Client_id}>
          <GoogleLogin 
              clientId={ Client_id }
              buttonText='Login'
              onSuccess={handleLogin }
              onFailure={ onFailure }
              cookiePolicy={'single_host_origin'}
              isSignedIn={false}
              size='large'
              render={(renderProps) => (
                <Button
                  variant='contained'
                  sx={{
                      backgroundColor: '#FFFFFF',
                      color: '#000000',
                      fontWeight: 400,
                      fontSize: 16, 
                      '&:hover': { backgroundColor: '#FFFFFF'},
                      textTransform: 'none',
                      width: '100%', 
                      margin: '5px 0px'
                      
                  }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="google-login-button"
                >
                <FcGoogle className='google-icon' /> Login with Google
                </Button>
              )}
          />
        </GoogleOAuthProvider>
    </div>
  )
};

export default GoogleLoginOption