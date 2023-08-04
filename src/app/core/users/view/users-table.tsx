import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { IGetUsersPageProps } from './i-users-table';

export default function UsersTable(props: IGetUsersPageProps) {
  const { vm } = props;
  return (
    <Container>
      <DataGrid
      rows={
        vm.users.map((user) => ({ 
          id: user.id, 
          name: user.name, 
          email: user.email, }))
      }
      columns={[
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'name' },
        { field: 'email', headerName: 'email' },
      ]}
      />
    </Container>
  )
}
