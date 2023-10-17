import { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { signIn, reAuth } from '../../api/authentication';
import { userDetailsContext } from '../../utils/userDetailsContext';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from '../../utils/reAuth';

const Login = () => {
  const [userDetails, setUserDetails, , setIsLoggedIn, , setCurrentUser] =
    useContext(userDetailsContext);
  const { email, password } = userDetails;
  const navigate = useNavigate();

  useAuthCheck(reAuth, setIsLoggedIn, setCurrentUser, navigate);

  const signInUser = async () => {
    const user = await signIn(userDetails.email, userDetails.password);
    try {
      if (user) {
        setIsLoggedIn(true);
        setUserDetails({
          email: '',
          password: '',
        });
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);

      console.log(error);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <div className="login-container">
          <Typography variant="h4" component="h1" gutterBottom>
            Flight Scanner
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Cheap flights for all
          </Typography>
          <form className="login">
            <TextField
              value={email}
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              label="Email address"
              fullWidth
              margin="normal"
            />
            <TextField
              value={password}
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              label="Password"
              fullWidth
              margin="normal"
            />
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                onClick={signInUser}
                fullWidth
              >
                Login
              </Button>
            </div>
          </form>
          <div className="new-user">
            <Typography variant="body1" gutterBottom>
              Not a member yet? Don't Miss Out!
            </Typography>
            <a href="/register">Register here</a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
