import React, { useState, useEffect } from 'react';
import { Box, Text, Heading, IconButton, HStack, Card, Button, CardHeader, CardBody} from '@chakra-ui/react'
import ApplicationCard from './ApplicationCard'

function ApplicationDocument({date}) {
    const [listOfApplications, setListOfApplications] = useState([])

    

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
                    <Card bg="#DDDDDD">
                        <Box display="flex" justifyContent="center" p={2}>
                            <Text>
                                No Job Applied This Day
                            </Text>
                        </Box>
                    </Card> 
                    : 
                    <ApplicationCard />}

                </CardBody>
            </Card>

        </Box>
    )
}

export default ApplicationDocument;