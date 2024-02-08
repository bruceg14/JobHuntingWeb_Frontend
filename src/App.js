import logo from './logo.svg';
import './App.css';
import { Box, Text, Heading, IconButton, HStack, Input, Card, Button, Divider, AbsoluteCenter,
          Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Link, useToast} from '@chakra-ui/react'
import { EmailIcon, ExternalLinkIcon} from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react';
import ApplicationDocument from './components/ApplicationDocument'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function AddCourseCard({jobTitle , setJobTitle, company, setCompany, applicationLink, setApplicationLink, date}) {
  const toast = useToast();
  function postApplication() {
    fetch('https://jobhuntingwebbackend-production.up.railway.app/jobHunting/add', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'jobTitle': jobTitle,
        'company': company,
        'link': applicationLink,
        'date': date
      })
    })
    .then(response => response.text())
    .then(data => {
      if(data === "Saved") {
        toast({
          title: "Success.",
          description: "Your application was submitted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setJobTitle("")
        setCompany("")
        setApplicationLink("")
      }
      console.log("response", data)
    })
    .catch(error => {
      toast({
        title: "Error.",
        description: "There was a problem adding your applicaiton.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error('There was a problem with your fetch operation:', error)
    });
  }

  return(
    <Card p={2}>
      <Heading as='h4' size='md'>
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
        <Button onClick={postApplication}> Add </Button>
      </Box>
    </Card>
  )
}

function GraphApplication({dates}) {
  const [graphData, setGraphData] = useState([])
  const newDates = dates.slice().reverse();
  useEffect(() => {
    let appPerDay = [];
    const fetchAppNumber = Array.from(newDates).map(date => { 
      return fetch(`https://jobhuntingwebbackend-production.up.railway.app/jobHunting/getByDate?date=${date}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          return data.length; 
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
          return 0; 
        });
    });

    Promise.all(fetchAppNumber).then(results => {
      appPerDay = results; 
      const data = appPerDay.map((val, index) => {
        return {
          Number: val,
          Date: newDates[index] || "No date", 
        };
      });
      
      setGraphData(data)
    }).catch(error => {
      console.error('There was an error with the batch operation:', error);
    });

  }, [])
  return(
    <Card>
      <Box display="flex" justifyContent="center">
        <Heading as='h4' size='md'>
          Chart of my recent job applications
        </Heading>
      </Box>
      <ResponsiveContainer width="100%" aspect={3 / 1} >
        <LineChart bg="red" data={graphData} margin={{ top: 15, right: 50, left: 30, bottom: 15 }}>
          {/* <rect x={0} y={0} width="100%" height="100%" fill="#FFFFFF" /> */}
          <YAxis dataKey="Number" label={{ value: "Number of Application", angle: -90, position: "insideCenter", offset: 10 }} />
 

          <XAxis dataKey="Date" tickMargin={0} />
          <Tooltip />
          <CartesianGrid stroke="#222222" />
          <Line type="monotone" dataKey="Number" stroke="#ff7300"  />
          <Text x={0} y={20} textAnchor="left" dominantBaseline="hanging" fontWeight="bold" fontSize={20}>
            Chart of my recent applications
          </Text>
          
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [applicationLink, setApplicationLink] = useState("");
  const [totalApp, setTotalApp] = useState(0)
  const [dates, setDates] = useState([]);

  const [today, setToday] = useState("")
  const [graph, setGraph] = useState(<Box></Box>)

  useEffect(() => {
    const now = new Date()
    const utcOffset = now.getTimezoneOffset(); 
    const nyOffset = -5 * 60; 
    const today = new Date(now.getTime() + (nyOffset - utcOffset) * 60000); // Eastern time zone
    const previousDays = [today.toISOString().split('T')[0]];
    setToday(previousDays[0])

    for (let i = 1; i <= 6; i++) {
      const previousDay = new Date(today);
      previousDay.setDate(today.getDate() - i);
      previousDays.push(previousDay.toISOString().split('T')[0]);
    }

    setDates(previousDays);
    setGraph(<Box><GraphApplication dates={previousDays} /></Box>)
    fetch(`https://jobhuntingwebbackend-production.up.railway.app/jobHunting/all`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      setTotalApp(data.length)
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });

    

    
    
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
            setCompany={setCompany}
            applicationLink={applicationLink}
            setApplicationLink={setApplicationLink} 
            date={today}
            />
        </Box>

        <Box width="100%" mt={6}>
          {graph}
        </Box>

        {/* <Box position='relative' padding='10'>
          <Divider color="black"/>
          <AbsoluteCenter bg='white' px='4'>
            Content
          </AbsoluteCenter>
        </Box> */}

        <Box width="100%" display="flex">
          <Box mt={8} width="60%">
            {dates.map((val, index) => {
              return(
                <Box mb={5} key={`JobApplicationOn${val}`}>
                  <ApplicationDocument date={val}  />
                </Box>
              )
            })}
          </Box>
          
          <Box width="40%" mt={8} display="flex" justifyContent="end">
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