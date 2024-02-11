import React, { useState, useEffect } from 'react';
import { Box, Text, Heading, IconButton, HStack, Card, Button, CardHeader, CardBody} from '@chakra-ui/react'
import ApplicationCard from './ApplicationCard'

function ApplicationDocument({date}) {
    const [listOfApplications, setListOfApplications] = useState([])
    
    const [listComponents, setListComponents] = useState(<Box></Box>)
    useEffect(() => {
        fetch(`https://jobhuntingwebbackend-production.up.railway.app/jobHunting/getByDate?date=${date}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            setListOfApplications(data)
          })
          .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
          });
    }, [])
    

    return(
        <Box>
            <Card>
                <CardHeader>
                    <Box display="flex" justifyContent="space-between">
                        <Heading size='md'>{date}</Heading>
                        <Text> {listOfApplications.length} applied </Text>
                    </Box>
                </CardHeader>

                <CardBody>
                    {listOfApplications.length === 0 ? 
                    <Card bg="#333333">
                        <Box display="flex" justifyContent="center" p={2}>
                            <Text color="white">
                                No Job Applied This Day
                            </Text>
                        </Box>
                    </Card> 
                    : 
                    <Box>
                        {listOfApplications.map((val) => {
                            return(
                                <Box  key={`${val.company}/${val.jobTitle}`} mb={3}>
                                    <ApplicationCard  jobTitle={val.jobTitle} company={val.company} applicationLink={val.link}/>
                                </Box>
                            )
                        })}
                    </Box>}

                </CardBody>
            </Card>

        </Box>
    )
}

export default ApplicationDocument;