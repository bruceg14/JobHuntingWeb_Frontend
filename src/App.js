import logo from './logo.svg';
import './App.css';
import { Box, Text, Heading, IconButton, HStack, Input, Card, Button, Divider, AbsoluteCenter,
          Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Link, } from '@chakra-ui/react'
import { EmailIcon, ExternalLinkIcon} from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react';
import ApplicationDocument from './components/ApplicationDocument'


function AddCourseCard({jobTitle , setJobTitle, company, setCompany, applicationLink, setApplicationLink}) {

  return(
    <Card p={2}>
      <Heading Heading as='h4' size='md'>
        Add Today's New Application
      </Heading>
      <HStack spacing={4} mt={3}>
        <Input 
          placeholder="Job Title" 
          value={jobTitle} 
          onChange={(e) => setJobTitle(e.target.value)} 
        />
        <Input 
          placeholder="Company" 
          value={company} 
          onChange={(e) => setCompany(e.target.value)} 
        />
        <Input 
          placeholder="Application Link" 
          value={applicationLink} 
          onChange={(e) => setApplicationLink(e.target.value)} 
        />
      </HStack>
      <Box mt={3}>
        <Button> Add </Button>
      </Box>
    </Card>
  )
}

function GraphApplication() {
  return(
    <Box>

    </Box>
  )
}

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [applicationLink, setApplicationLink] = useState("");
  const [totalApp, setTotalApp] = useState(0)
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const now = new Date()
    const utcOffset = now.getTimezoneOffset(); 
    const nyOffset = -5 * 60; 
    const today = new Date(now.getTime() + (nyOffset - utcOffset) * 60000); // Eastern time zone
    const previousDays = [today.toISOString().split('T')[0]];

    for (let i = 1; i <= 6; i++) {
      const previousDay = new Date(today);
      previousDay.setDate(today.getDate() - i);
      previousDays.push(previousDay.toISOString().split('T')[0]);
    }

    setDates(previousDays);
    console.log(previousDays)
  }, []);

  return (
    <Box w="100vw" h="100vh" bg="gray.200" display="flex" justifyContent="center" overflow="auto" >

      <Box w="70vw" h="100vh"  px={3} mt="2%" >
        <Box w="100%" display="flex" justifyContent="space-between">
          <Box>
            <Heading fontSize='2xl'>
              Bruce's Job Hunting Web Project
            </Heading>
          </Box>

          <Box >
            <Link href='https://www.linkedin.com/in/ziyuan-guo-bruce/' isExternal color="#0A66C2" fontSize="20" fontWeight="bold">
              Check out my LinkedIn! <ExternalLinkIcon mx='2px' />
            </Link>
            {/* <Link href='https://www.linkedin.com/in/ziyuan-guo-bruce/' isExternal color="#0A66C2" fontSize="20" fontWeight="bold">
              Check out my LinkedIn! <ExternalLinkIcon mx='2px' />
            </Link> */}
          </Box>
        </Box>

        <Box mt={8}>
          <Text>This is my personal website to document my job application process. For privacy reason I will only share my job application experience for the previous 7 days. </Text>
        </Box>

        <Box mt={8}>
          <AddCourseCard 
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            company={company}
            setcompany={setCompany}
            applicationLink={applicationLink}
            setApplicationLink={setApplicationLink} />
        </Box>

        {/* <Box position='relative' padding='10'>
          <Divider color="black"/>
          <AbsoluteCenter bg='white' px='4'>
            Content
          </AbsoluteCenter>
        </Box> */}

        <Box width="100%" display="flex">
          <Box mt={8} width="50%">
            {dates.map((val, index) => {
              return(
                <Box mb={5}>
                  <ApplicationDocument date={val}  />
                </Box>
              )
            })}
          </Box>
          
          <Box width="50%" mt={8} display="flex" justifyContent="end">
            <Box>
              <Card padding={2} bg="green.100">
                <Stat>
                  <StatLabel>Total application send</StatLabel>
                  <StatNumber>{totalApp}</StatNumber>
                  <StatHelpText>Since February 2024</StatHelpText>
                </Stat>
              </Card>
            </Box>
          </Box>
        </Box>

        <Box height="8px">
        
        </Box>
      </Box>

      
      
    </Box>
  );
}

export default App;