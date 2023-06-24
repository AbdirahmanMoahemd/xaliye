import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import background from "../../data/images/background.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "@/actions/userActions";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setVisible] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => {
    setVisible(!isVisible);
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      // navigate(redirect);
      setMessage(
        "Your system is in maintenance mode, please contact our support team"
      );
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // // DISPACTH LOGIN
    dispatch(login(email, password));
    console.log(email);
    console.log(password);
  };

  return (
    <div className="relative min-h-screen w-full">
      <img
        src={background}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-20 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form onSubmit={submitHandler}>
            <CardBody className="flex flex-col gap-4">
              {message != "" && <Message severity="error" text={message} />}
              {error && <Message severity="error" text={error} />}
              {loading && (
                <ProgressSpinner
                  style={{ width: "50px", height: "50px" }}
                  strokeWidth="8"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              )}

              <Input
                type="email"
                value={email}
                label="Email"
                size="lg"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type={isVisible ? "password" : "text"}
                label="Password"
                size="lg"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="pt-3">
                <input type="checkbox" onChange={toggle} />
                <span className="pl-2">Show Password</span>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit">
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
