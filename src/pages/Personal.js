import { Box, Heading, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon} from '@chakra-ui/icons'
import React from 'react';
import selfie from "../images/jhw_selfie.jpg"
import Resume from "../images/Resume.pdf"
import { useNavigate } from 'react-router-dom';

function Personal() {
    let navigate = useNavigate();

    function goHome() {
        navigate('/'); 
    }

    return(
        <Box w="100vw" h="100vh" bg="gray.200" display="flex" justifyContent="center" overflow="auto" >
            <Box w="15vw" display="flex" alignItems="center" justifyContent="center">
                <IconButton onClick={goHome} colorScheme='teal' size='lg'>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Box w="70vw" h="100vh"  px={3} mt="2%" >
                <Box display="flex" justifyContent="center" >
                    {/* <Box w="14vw">
                        <IconButton>
                            <ArrowBackIcon />
                        </IconButton>
                    </Box> */}
                    <Box >
                        <Heading>
                            My Resume
                        </Heading>
                    </Box>
                    {/* <Box w="14vw">
                    </Box> */}
                </Box>

                <Box mt="2%" width="100%" height="80%" overflow="auto" borderWidth="1px" borderRadius="lg" borderColor="gray.200">
                    <iframe
                        src={Resume}
                        style={{
                        width: '100%',
                        height: '100%',
                        }}
                        frameBorder="0"
                        title="Ziyuan Guo Resume.pdf"
                    >
                    
                    </iframe>
                </Box>
            </Box>
            <Box w="15vw">
                
            </Box>
        </Box>
    )
}

export default Personal