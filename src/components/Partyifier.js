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

const Partyifier = ({ maybePartyFile }) => {
  const [fileToParty, setFileToParty] = useState(null)
  const [partyFile, setPartyFile] = useState(null)

  let partyToDisplay = maybePartyFile
  let doItButton = null
  if (maybePartyFile instanceof File) {
    if (maybePartyFile !== fileToParty) {
      setFileToParty(maybePartyFile)
    }
    // for some reason on first render we loop through this code once before the setState call works?? help me @tim.huddle
    if (fileToParty !== null) {
      partyToDisplay = fileToImgTag(fileToParty)
      doItButton = <StyledDoItButton onClick={() => doTheThing(fileToParty, setPartyFile)}>{'do it'}</StyledDoItButton>
    }
  }

  if (partyFile instanceof File) {
    partyToDisplay = fileToImgTag(partyFile)
    doItButton = <StyledDoItButton onClick={() => setPartyFile(null)}>reset</StyledDoItButton>
  }

  return (
    <>
      {partyToDisplay &&
        <>
          <StyledPartyJammingSpace>
            {partyToDisplay}
          </StyledPartyJammingSpace>
          {doItButton}
        </>
      }
    </>
  )
}

export default Partyifier
