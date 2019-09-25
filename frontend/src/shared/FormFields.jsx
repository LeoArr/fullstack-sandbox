import React from 'react'
import { FormControl, InputLabel, Input } from '@material-ui/core'

export const CustomTextField = ({ value, onChange, label, className }) => {
  return (
    <FormControl className={className}>
      <InputLabel>{label}</InputLabel>
      <Input value={value} onChange={onChange} />
    </FormControl>
  )
}
