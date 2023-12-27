import { Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

const CustomSkeleton = ({tableHead}) => {
    return (
        <>
            <Table container={"true"} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                    <TableHead >
                        <TableRow sx={{ bgcolor: 'grey' }} >
                        {
                            tableHead.map((ele,index)=>{
                                return  <TableCell key={index} align='center' sx={{  fontSize: '15px', fontWeight: '800' , cursor: "pointer" }}>
                                {ele}
                            </TableCell>
                            })
                        }
                           
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {
                             tableHead.map((ele, index) => {
                                {/* console.log(ele) */ }
                                return <TableRow key={index}>
                                {
                                    tableHead.map((ele,index)=>{
                                        return <TableCell key={index}  align='center' sx={{ cursor: "pointer",p:'5px',  }}>
                                            <Skeleton sx={{ height: "60px", width:'80%' }} />
                                          </TableCell>
                                    })
                                }
                                          
                                     </TableRow>
                                
                            })
                            }
                    </TableBody>
                </Table>
            </Table>
        </>
    )
}

export default CustomSkeleton