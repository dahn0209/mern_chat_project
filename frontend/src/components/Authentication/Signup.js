import React,{useState} from 'react'
import { FormLabel, VStack,Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { FormControl,useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

 
const Signup = () => {
    
    const [show,setShow]=useState(false)
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState()
    const [confirmPassword,setConfirmPassowrd]=useState()
    const [pic,setPic]=useState();
    const [loading,setLoading]=useState(false)
    const toast=useToast();
    const history=useHistory();

    const handleClick=()=> setShow(!show);

    const postDetails=(pics)=>{
        setLoading(true);

        if(pics===undefined){
           
            toast({
                title: 'Select Image.',
                description: "Warning dude",
                duration: 5000,
                isClosable: true,
                position:"bottom"
            }) 
            return;
        }

        if((pics.type==="image/jpeg")|| (pics.type==="image/png")){
            console.log('pics=>',pics)
            const data=new FormData();
            data.append('file', pics);
            data.append('upload_preset',"chat-app" )
            data.append("cloud_name","dsfz1ie14")
            fetch('https://api.cloudinary.com/v1_1/dsfz1ie14/image/upload',{
                method:"post",
                body:data,
            })
            .then((res)=>{res.json()})
            .then((data)=>{
                console.log('data->',data);
                console.log('toString->',data.url.toString())
                setPic(data.url.toString());
                setLoading(false);
            }).catch((err)=>{
                console.log(err);
                setLoading(false);
            })
        }else{
            toast({
                title: 'Select Image Please',
                description: "thiis is Warning",
                duration: 5000,
                isClosable: true,
                position:"bottom"
            }) 
            setLoading(false);
            return;
        }
        

    };

    const submitHandler=async ()=>{
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toast({
              title: "Fill all Fields",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast({
              title: "Passwords do Not Match",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
        } 
        
        try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "/api/user",
              {
                name,
                email,
                password,
                pic,
              },
              config
            );
            console.log(data);
            toast({
              title: "Registration Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
          } catch (error) {
            toast({
              title: "Error!",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
          }
    }

    return (
        <VStack spacing="5px" color='black'>
            <FormControl id='first-name' isRequired >
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter your Name'
                    onChange={(e)=>{setName(e.target.value)}}
                />
            </FormControl>
            <FormControl id='email' isRequired >
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your Email'
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
            </FormControl>

            <FormControl id='password' isRequired >
                    <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={ show? "text": "password"}
                                placeholder='Enter your password'
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h="1.75rem" size="sm" onClick={handleClick} >
                                    {show? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
            </FormControl>

            <FormControl id='password' isRequired >
                    <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={ show? "text": "password"}
                                placeholder='Confirm password'
                                onChange={(e)=>{setConfirmPassowrd(e.target.value)}}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h="1.75rem" size="sm" onClick={handleClick} >
                                    {show? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
            </FormControl>

            <FormControl id='pic' >
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e)=>{
                        console.log('vdff=>',e.target.files)
                        postDetails(e.target.files[0])}}
                />
            </FormControl>

            <Button
                colorScheme='blue'
                width="100%"
                style={{marginTop:15}}
                onClick={submitHandler}
                isLoading={loading}>Sign Up</Button>
            
        </VStack>
    )
}

export default Signup
