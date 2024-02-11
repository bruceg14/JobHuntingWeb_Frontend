import React, { useState, useEffect } from 'react';
import { Box, Text, Heading, IconButton, HStack, Card, Button, CardHeader, CardBody, Spinner} from '@chakra-ui/react'
import ApplicationCard from './ApplicationCard'

function SearchByCompany({company}) {
    const [listApplications, setListApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        const url = `https://jobhuntingwebbackend-production.up.railway.app/jobHunting/getByCompany?company=${company}`
        fetch(url).then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setListApplications(data);
            setIsLoading(false)
        }).catch(error => {
          console.error('There was a problem with your fetch operation:', error);
          return 0; 
        });
    }, [])

    if(isLoading) {
        return(
            <Box width="100%" display="flex" justifyContent="center">
                <Spinner />
            </Box>
        )
    }
    return(
        <Box>
            {listApplications.length === 0 ? 
            <Card bg="#333333">
                <Box display="flex" justifyContent="center" p={2}>
                    <Text color="white">
                        No Application to this Company
                    </Text>
                </Box>
            </Card> 
            : 
            <Box>
                {listApplications.map((val) => {
                    return(
                        <Box  key={`${val.company}/${val.jobTitle}`} mb={3}>
                            <ApplicationCard jobTitle={val.jobTitle} company={val.company} applicationLink={val.link}/>
                        </Box>
                    )
                })}
            </Box>}  
        </Box>
    )
}

export default SearchByCompany;