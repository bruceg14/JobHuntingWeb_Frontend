import '../App.css';
import { Box, Text, Heading, IconButton, HStack, Input, Card, Button, Divider, AbsoluteCenter,
          Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Link, useToast, Avatar,
          InputGroup, InputLeftElement, Icon, Link as ChakraLink, LinkProps, useDisclosure,
          Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from '@chakra-ui/react'
import { EmailIcon, ExternalLinkIcon, SearchIcon,} from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react';
import ApplicationDocument from '../components/ApplicationDocument'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import selfie from "../images/jhw_selfie.jpg"
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import SearchByCompany from "../components/SearchByCompany"
import StatDisplay from "../components/StatDisplay"

// HeadBar is the top of the web page where it have an Icon for display my Resume
// and a search bar that allow user to search base on company(Case insensitive)
function HeadBar({}) {
  const [company, setCompany] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
  const toast = useToast();

  function moreAboutMe() {
    navigate('/Personal'); 
  }

  function searchByCompany() {
    if(company !== ""){
      console.log("open")
      setIsOpen(true)
    } else {
      toast({
        title: "Warning",
        description: "Please Input Something",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      searchByCompany();
    }
  }

  return (
    <Box display="flex" justifyContent="space-between">
      <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)} width="800px">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Result for {company}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SearchByCompany company={company} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack justifyContent="center" alignItems="center">
        <Avatar name='Bruce Guo' src={selfie} onClick={moreAboutMe}/>
        <ChakraLink as={ReactRouterLink} to='/Personal' fontWeight="bold" color="grey.500">
          Check out my Resume...
        </ChakraLink>
      </HStack>

      <Box width="35%">
        <InputGroup >
          <InputLeftElement
            pointerEvents="none" 
            children={<SearchIcon color="gray.300" />}
          />
          <Input 
            value={company}
            onChange={(e) => {setCompany(e.target.value)}} 
            placeholder="Search by company name..." 
            bg="white" 
            onKeyDown={handleKeyDown}/>
          <Button type="button" ml={2} colorScheme='blue' onClick={() => searchByCompany()}>Search</Button>
        </InputGroup>
      </Box>
      
    </Box>
  )
}

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
    <Card p={3} bg="#333333">
      <Heading as='h4' size='md' color="white">
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
        <Button colorScheme='whatsapp' onClick={postApplication}> Add </Button>
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
    
    <Box>
      {/* <Card bg="rgba(255, 255, 255, 0)"> */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Heading as='h4' size='md'>
            Chart of my recent job applications
          </Heading>
        </Box>
        <ResponsiveContainer width="100%" aspect={3 / 1} >
          <LineChart bg="red" data={graphData} margin={{ top: 15, right: 50, left: 30, bottom: 15 }}>
            {/* <rect x={0} y={0} width="100%" height="100%" fill="#FFFFFF" /> */}
            <YAxis dataKey="Number" allowDecimals={false} label={{ value: "Number of Application", angle: -90, position: "insideCenter", offset: 10 }} />
  

            <XAxis dataKey="Date" tickMargin={0} />
            <Tooltip />
            <CartesianGrid stroke="#222222" />
            <Line type="monotone" dataKey="Number" stroke="#ff7300"  />
            <Text x={0} y={20} textAnchor="left" dominantBaseline="hanging" fontWeight="bold" fontSize={20}>
              Chart of my recent applications
            </Text>
            
          </LineChart>
        </ResponsiveContainer>
      {/* </Card> */}
    </Box>
  )
}

function HomePage() {
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
    // fetch(`https://jobhuntingwebbackend-production.up.railway.app/jobHunting/all`)
    // .then(response => {
    //   if(!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // }).then(data => {
    //   setTotalApp(data.length)
    // })
    // .catch(error => {
    //   console.error('There was a problem with your fetch operation:', error);
    // });

    

    
    
  }, []);

  return (
    <Box w="100vw" h="100vh" bg="gray.200" display="flex" justifyContent="center" overflow="auto" >
      
      <Box w="70vw" h="100vh"  px={3} mt="2%" >
        <Box>
          <HeadBar />
        </Box>
        <Box w="100%" display="flex" justifyContent="space-between" mt={4} alignItems="center" py={2}>
        
          <Box>
            <Heading fontSize='2xl'>
              Bruce's Job Hunting Record
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

        {/* <Box mt={6}>
          <Text>This is my personal website to document my job application process. For privacy reason I will only share my job application experience for the previous 7 days. </Text>
        </Box> */}

        <Box mt={8} mb={8}>
          <StatDisplay today={today} />
        </Box>

        <Box width="100%" mt={6}>
          {graph}
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
              {/* <Card padding={2} bg="green.100">
                <Stat>
                  <StatLabel>Total application send</StatLabel>
                  <StatNumber>{totalApp}</StatNumber>
                  <StatHelpText>Since February 2024</StatHelpText>
                </Stat>
              </Card> */}
            </Box>
          </Box>
        </Box>

        <Box height="8px">
        
        </Box>
      </Box>

      
      
    </Box>
  );
}

export default HomePage;