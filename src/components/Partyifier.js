import React, { useState } from 'react'
import styled from 'styled-components'

const StyledPartyJammingSpace = styled.div`
  height: 200px;
  background: #ababab;
  text-justify: auto;
  text-align: center;
  padding-top: 20px;
  border-radius: 10px;
  margin-top: 80px;
`

const Partyifier = ({ party }) => {
  let partyToDisplay = party
  if (party instanceof File) {
    partyToDisplay = <img src={URL.createObjectURL(party)} width='100' height='100' alt='just do the thing already'/>
  }

  return (
    <StyledPartyJammingSpace>
      {partyToDisplay}
    </StyledPartyJammingSpace>
  )
}

export default Partyifier
