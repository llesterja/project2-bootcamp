import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { register, reAuth } from '../../api/authentication/index';
import { useNavigate } from 'react-router-dom';
import { userDetailsContext } from '../../utils/userDetailsContext';
import { useAuthCheck } from '../../utils/reAuth';
import '../../CSS/login.css';

const Register = () => {
  const [state, setState] = useState({
    email: '',
    userName: '',
    password: '',
  });

  const [, , , setIsLoggedIn, , setCurrentUser] =
    useContext(userDetailsContext);

  const navigate = useNavigate();

  useAuthCheck(reAuth, setIsLoggedIn, setCurrentUser, navigate);

  const registerUser = async () => {
    const { email, password } = state;
    try {
      const user = await register(email, password);
      console.log({ user });
      setState({
        email: '',
        userName: '',
        password: '',
      });
      setIsLoggedIn(true);
      navigate('/Feed');
    } catch (error) {
      console.log(`failed to register user: ${error}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <div className="login-container">
          <Typography variant="h4" component="h1" gutterBottom>
            FlightScanner
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Cheap flights for all
          </Typography>
          <form>
            <TextField
              type="email"
              name="email"
              value={state.email}
              label="Email"
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              type="password"
              name="password"
              value={state.password}
              label="Password"
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
              required
            />
            <div className="button-container">
              <Button
                onClick={registerUser}
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </div>
          </form>
          <div className="existing-user">
            <Typography variant="body1" gutterBottom>
              Already a member?
            </Typography>
            <a href="/login">Login here </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
