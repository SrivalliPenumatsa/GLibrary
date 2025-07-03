import React from 'react'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check'


export default function AlertComponent() {
  return (
    <div>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Announcement updated successfully
</Alert>
    </div>
  )
}
