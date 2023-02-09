import { Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
const Home = () => {
  const [fetchUserInProgress, setFetchUserInProgress] = useState(false);
  const [deleteUserInProgress, setDeleteUserInProgress] = useState(false);
  const toast = useToast();
    const fetchUsers = () => {
      if(fetchUserInProgress){
        toast({
          title: 'Data fetch in progress',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
         return;
      }
      setFetchUserInProgress(true);
      axios.get('https://ill-erin-marlin-shoe.cyclic.app/').then((result) => {
        setFetchUserInProgress(false)
        toast({
          title: 'Fetched successfully',
          status: 'success',
          position: 'top',
          isClosable: true,
        })
      }).catch((err) => {
        setFetchUserInProgress(false)
        toast({
          title: 'Unable to fetch',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
      })
    };

  const deleteUsers = () => {
    if(deleteUserInProgress){
      toast({
        title: 'Deletion in progress',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
       return;
    }
    setDeleteUserInProgress(true)
    axios.delete('https://ill-erin-marlin-shoe.cyclic.app/').then((result) => {
      setDeleteUserInProgress(false)
      toast({
        title: 'Deleted successfully',
        status: 'success',
        position: 'top',
        isClosable: true,
      })
    }).catch((err) => {
      setDeleteUserInProgress(false)
      toast({
        title: 'Unable to delete',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
    })
  }

  return (
    <div>
      <Button onClick={fetchUsers}>Fetch Users</Button>
      <Button onClick={deleteUsers}>Delete Users</Button>
      <Link to="/userdetails"><Button>User Details</Button></Link>
    </div>
  );
};

export default Home;
