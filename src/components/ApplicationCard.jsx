import React, { useState, useEffect } from 'react';
import { Box, Text, Heading, IconButton, HStack, Card, Button, Link, } from '@chakra-ui/react'
import { ExternalLinkIcon} from '@chakra-ui/icons'

function ApplicationCard({jobTitle, company, applicationLink}) {
    return(
        <Box>
            <Card bg="#DDDDDD">
                <HStack  display="flex" justifyContent="space-between" p={2} >
                    <Box width="50%">
                        <Text fontWeight="bold">{jobTitle}</Text>
                    </Box>

                    <Box width="20%">
                        <Text fontWeight="bold">{company}</Text>
                    </Box>

                    <Box width="30%">
                        {/* <Text>{applicationLink}</Text> */}
                        <Link href={applicationLink} color="blue" isExternal>
                            Link To Job Post <ExternalLinkIcon mx='2px' />
                        </Link>
                    </Box>
                </HStack>
            </Card>
        </Box>
    )
}

export default ApplicationCard;