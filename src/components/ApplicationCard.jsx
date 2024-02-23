import React from 'react';
import { Box, Text, Heading, Card, Link} from '@chakra-ui/react'
import { ExternalLinkIcon} from '@chakra-ui/icons'

function ApplicationCard({jobTitle, company, applicationLink}) {
    return(
        <Box>
            <Card bg="#E5E5E5" p={3}>
                <Box mb={1}>
                    <Heading as='h4' size='md' >{jobTitle}</Heading>
                </Box>

                <Text color="gray.700">{company}</Text>
                
                
                <Link href={applicationLink} color="blue" isExternal>
                    Link To Job Post <ExternalLinkIcon mx='2px' />
                </Link>
                
                
            </Card>
        </Box>
    )
}

export default ApplicationCard;