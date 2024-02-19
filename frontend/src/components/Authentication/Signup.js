import React,{useState} from 'react'
import { FormLabel, VStack,Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { FormControl,useToast } from '@chakra-ui/react'

const Signup = () => {
    
    const [show,setShow]=useState(false)
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState()
    const [confirmPassword,setConfirmPassowrd]=useState()
    const [pic,setPic]=useState();
    const [loading,setLoading]=useState(false)
    const toast=useToast();

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
            const data=new FormData();
            data.append("file",pics);
            data.append('upload_preset',"chat-app" )
            data.append("cloud_name","du1lom7gh")
            fetch('https://api.cloudinary.com/v1_1/du1lom7gh/image/upload',{
                method:"post",
                body:data,
            }).then((res)=>{res.json()}).then(data=>{
                console.log('data->',data)
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

    const submitHandler=()=>{}

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
                                onChange={(e)=>{setPassword(e.target.value)}}
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
