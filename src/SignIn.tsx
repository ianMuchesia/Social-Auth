import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';


const SignIn = () => {
    const handleGoogleLogin = async (credentialResponse:any) => {
        try {
          const idToken = credentialResponse.credential;

          console.log(idToken)
    
          // Send the ID Token to the backend for verification and login
          const response = await axios.post('http://41.90.106.13:5080/api/auth/google', { idToken });

          console.log(response)
    
          // Process the backend response
          const { token, user } = response.data;
          console.log('Login successful:', user);
    
          // Save token (e.g., in localStorage)
          localStorage.setItem('authToken', token);
        } catch (error:any) {
          console.error('Login failed:', error.response?.data || error.message);
        }
      };


    
      const handleFacebookLogin = async (accessToken: string) => {
        try {
          // Send the access token to the backend for verification and login
          const response = await axios.post('http://41.90.106.13:5080/api/auth/facebook', { accessToken });
    
          // Process the backend response
          const { token, user } = response.data;
          console.log('Login successful:', user);
    
          // Save token (e.g., in localStorage)
          localStorage.setItem('authToken', token);
        } catch (error: any) {
          console.error('Login failed:', error.response?.data || error.message);
        }
      };

        // const appId = '1088597931155576';
        // const responseFacebook = (response:any) => {
        //     console.log(response);

        //     if(response.accessToken){
        //         axios.post('http://localhost:5088/api/auth/facebook', {
        //             accessToken: response.accessToken
        //         }).then((response) => {
        //             console.log(response);
        //         }).catch((error) => {
        //             console.log(error);
        //         });
        //     }
        // }
      


      const responseFacebook = (response: any) => {
        console.log('Facebook response:', response);
    
        if (response.accessToken) {
          // Pass the access token to the backend
          handleFacebookLogin(response.accessToken);
        } else {
          console.error('Failed to get Facebook access token');
        }
      };

    
      return (
        
       <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Sign In</h1>
            <GoogleOAuthProvider clientId="440101887990-9v1rodn4ntq0hujugt92dktuastkvtfe.apps.googleusercontent.com">
          <div>
            <h1>React Google Login</h1>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.error('Google login failed')}
            />
          </div>
        </GoogleOAuthProvider>
        </div>
        <div>
            <h2>Facebook Login</h2>
            <FacebookLogin
                appId={"1101372864364446"}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                icon="fa-facebook"
            />
        </div>
        </div>
      );
}

export default SignIn