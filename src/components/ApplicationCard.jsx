import React, { useState, useEffect } from 'react';
import { Box, Text, Heading, IconButton, HStack, Card, Button, } from '@chakra-ui/react'


function ApplicationCard({jobTitle, company, applicationLink}) {
    return(
        <Box>
            <Card>
                <HStack>
                    <Box>
                        <Text>{jobTitle}</Text>
                    </Box>

                    <Box>
                        <Text>{company}</Text>
                    </Box>

                    <Box>
                        <Text>{applicationLink}</Text>
                    </Box>
                </HStack>
            </Card>
        </Box>
    )
}

export default ApplicationCard;