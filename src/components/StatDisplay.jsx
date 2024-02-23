import React, { useState, useEffect } from 'react';
import { Box, Card, CardBody, Stat,
            StatLabel, StatNumber, StatHelpText} from '@chakra-ui/react'

function StatDisplay({today}) {
    const [highestApplication, setHighestApplication] = useState([today, 0])
    const [totalApp, setTotalApp] = useState(0)
    const [todayNumber, setTodayNumber] = useState(0)
    useEffect(() => {
        const url = `https://jobhuntingwebbackend-production.up.railway.app/jobHunting/getHighestDate`
        fetch(url).then(response => {
            if(!response.ok){
                throw new Error('Erro fetching the highest applications send in a day');
            }
            return response.json()
        }).then(data => {
            setHighestApplication(data)
        })
        
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

        fetch(`https://jobhuntingwebbackend-production.up.railway.app/jobHunting/getByDate?date=${today}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => 
            {
                if (Array.isArray(data)) {
                    setTodayNumber(data.length);
                  } else {
                    console.error('Expected an array but received:', data);
                  }
            }
        )
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
    })

    // if(today == ""){
    //     return(
    //         <Box>
    //             <Text>Hee </Text>
    //         </Box>
    //     )
    // }
    
    return(
        <Card p={3}>
            <Box display="flex" justifyContent="space-between">
                <Box width="25%" display='flex' justifyContent='center'>
                    <Box>
                        <Stat >
                            <StatLabel >Most Application Send in a Day</StatLabel>
                            <StatNumber>{highestApplication[1]}</StatNumber>
                            <StatHelpText>
                                In {highestApplication[0]}
                            </StatHelpText>
                            
                        </Stat>
                    </Box>
                </Box>
                
                <Box width="50%" display='flex' justifyContent='center'>
                    <Box>
                        <Stat>
                            <StatLabel >Total Application Send</StatLabel>
                            <StatNumber>{totalApp}</StatNumber>
                            <StatHelpText>Since February 2024</StatHelpText>
                        </Stat>
                    </Box>
                </Box>

                {/* <Box width="25%" display='flex' justifyContent='center'>
                    <Box>
                        <Stat >
                            <StatLabel >Application Send Today</StatLabel>
                            <StatNumber>{todayNumber}</StatNumber>
                            <StatHelpText>
                                {today}
                            </StatHelpText>
                        </Stat>
                    </Box>
                </Box> */}
            
            </Box>
        </Card>
    
    )
}
export default StatDisplay