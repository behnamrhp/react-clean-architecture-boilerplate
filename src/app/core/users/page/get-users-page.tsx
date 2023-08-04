import { CircularProgress, Container } from '@mui/material'
import { DataGrid, GridLoadingOverlay } from '@mui/x-data-grid'
import React, { Suspense } from 'react'
import Users from '~/features/core/users/domain/entity/users'
import UsersTable from '../view/users-table'
import usersTableVm from '../vm/users-table-vm'


export default function GetUsersPage() {
  const vm = usersTableVm();
  return (
      <UsersTable vm={vm} />
  )
}
