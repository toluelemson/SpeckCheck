import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Flex, Heading, Image, Link, Stack, Text} from "@chakra-ui/react";
import CreateUserForm from "../shared/CreateUserForm.tsx";

const Signup = () => {
    //const { user, setUserFromToken } = useAuth();
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.user) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Image
                        src={'#'}
                        boxSize={'200px'}
                        alt={'SpeckCheck Logo'}
                        alignSelf={'center'}
                    />
                    <Heading fontSize={'2xl'} mb={15}>
                        Register for an account
                    </Heading>
                    <CreateUserForm
                        onSuccess={(token) => {
                            localStorage.setItem('access_token', token);
                            // setUserFromToken();
                            navigate('/');
                        }}
                    />
                    <Link color={'blue.500'} href={'/'}>
                        Have an account? Login now.
                    </Link>
                </Stack>
            </Flex>
            <Flex
                flex={1}
                p={10}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                bgGradient={{ sm: 'linear(to-r, blue.600, purple.600)' }}
            >
                <Text fontSize={'6xl'} color={'white'} fontWeight={'bold'} mb={5}>
                    <Link target={'_blank'} href={'#'}>
                        SpeckCheck
                    </Link>
                </Text>
                <Image
                    alt={'Login Image'}
                    objectFit={'scale-down'}
                    src={'#'}
                />
            </Flex>
        </Stack>
    );
};

export default Signup;