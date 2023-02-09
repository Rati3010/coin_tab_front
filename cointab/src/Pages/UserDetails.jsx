import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon,ArrowRightIcon } from '@chakra-ui/icons'
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Select,
} from '@chakra-ui/react';
const UserDetails = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [gender , setGender] = useState('');
  const getUsers = () => {
    axios.get(`https://ill-erin-marlin-shoe.cyclic.app/userdetails?page=${page}&gender=${gender}`).then((result) => {
      setUsers(result.data.users)
    }).catch((err) => {
      console.log(err)
    });
  }
  useEffect(() => {
    getUsers();
  }, [page,gender])
  return (
    <div>
      <Select onChange={(e)=>setGender(e.target.value)} placeholder='Filter by gender' >
        <option value='male'>Male</option>
        <option value='female'>Female</option>
      </Select>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>User Details</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Gender</Th>
              <Th>Country</Th>
              <Th>Phone</Th>
              <Th>Gmail</Th>
              <Th>Cell</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users && users.map((user,index) => {
              return (<Tr key={index}>
                <Td>{user.name.title + " " + user.name.first + " " + user.name.last}</Td>
                <Td>{user.gender}</Td>
                <Td>{user.location.country}</Td>
                <Td>{user.phone}</Td>
                <Td>{user.email}</Td>
                <Td>{user.cell}</Td>
              </Tr>)
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <div><Button onClick={()=>setPage((value)=>value-1)}><ArrowLeftIcon/></Button><input value={page} style={{width:'20px',textAlign:'center'}} onChange={(e)=>setPage(e.target.value)} /><Button onClick={()=>setPage((value)=>value+1)}><ArrowRightIcon/></Button></div>
    </div>
  )
}

export default UserDetails