import React, { useEffect } from "react";
import second from "../data/images/bg.jpg";
import repairing from "../data/images/repairing.png";
import gadgets from "../data/images/gadgets.png";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const navigateToRepairing =(e)=>{
        e.preventDefault()
        navigate('/dashboard/home')
        
    }

    const navigateToElectronics =(e)=>{
        e.preventDefault()
        navigate('/electronics/home')
        
    }

    useEffect(()=>{
        if (!userInfo) {
            navigate("/sign-in");
          }
    },[userInfo])
  return (
    <div className="">
      <img
        src={second}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="flex h-screen">
        <div className="xl:flex m-auto gap-20">
        <Card className="mt-6 w-52 bg-white cursor-pointer">
        <CardBody>
        
        <img src={repairing} alt="repairing" />
      
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={navigateToRepairing} className="w-full">Repairing</Button>
      </CardFooter>
        </Card>

        <Card className="mt-6 w-52 bg-white cursor-pointer">
        <CardBody>
        
        <img src={gadgets} alt="repairing" />
      
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={navigateToElectronics} className="w-full">Electronics</Button>
      </CardFooter>
        </Card>
        </div>
      </div>
    </div>
    
  );
};

export default HomePage;
