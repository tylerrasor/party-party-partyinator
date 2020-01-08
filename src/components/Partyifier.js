import React, { useState } from 'react'
import styled from 'styled-components'
import { fileToImgTag, theMagic } from '../util/HackyFileShit'

const StyledPartyJammingSpace = styled.div`
  height: 100px;
  width: 100px;
  background: #ababab;
  text-justify: auto;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  margin-top: 80px;
`

const StyledDoItButton = styled.button`
  margin-top: 10px;
  width: 100px;
`

const doTheThing = async (image, setPartyFile) => {
  if (image !== null) {
    setPartyFile(await theMagic(image))
  }
}

const Partyifier = ({ party }) => {
  const [partyFile, setPartyFile] = useState(null)

  let partyToDisplay = party
  if (party instanceof File) {
    partyToDisplay = fileToImgTag(party)
  }

  let theRealParty = null
  if (partyFile instanceof File) {
    theRealParty = fileToImgTag(partyFile)
  }

  return (
    <>
      {partyToDisplay &&
        <>
          <StyledPartyJammingSpace>
            {partyToDisplay}
          </StyledPartyJammingSpace>
          <StyledDoItButton onClick={() => doTheThing(party, setPartyFile)}>do it</StyledDoItButton>
        </>
      }
      {partyFile &&
        <StyledPartyJammingSpace>
          {theRealParty}
        </StyledPartyJammingSpace>
      }
    </>
  )
}

export default Partyifier
