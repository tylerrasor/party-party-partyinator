import React, { useState } from 'react'
import styled from 'styled-components'
import Stream from 'stream-browserify'
import { createPartyImage } from '../stolen-party-stuff/party'

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

let partifiedBytes = new Uint8Array(0)
const doTheHackyWritingBytesManuallyThing = someBytes => {
  partifiedBytes = appendBuffers(partifiedBytes, someBytes)
}

const appendBuffers = (buf1, buf2) => {
  let tmp = new Uint8Array(buf1.byteLength + buf2.byteLength)
  tmp.set(new Uint8Array(buf1), 0)
  tmp.set(new Uint8Array(buf2), buf1.byteLength)
  return tmp.buffer
}

const doTheThing = async (image, setPartyFile) => {
  if (image !== null) {
    let thePartyStream = new Stream.Writable()
    thePartyStream.write = doTheHackyWritingBytesManuallyThing
    await createPartyImage(image, thePartyStream)

    waitAbitAndSetFile(setPartyFile)
  }
}

const waitAbitAndSetFile = setPartyFile => {
  // don't know why we have to wait for the gifencoder to write to the stream???
  setTimeout(() => setPartyFile(new File([partifiedBytes], 'this_is_a_name.gif', {type: 'image/gif'})), 500)
}

const wrapFileToImgTag = file => {
  console.log(URL.createObjectURL(file))
  return <img src={URL.createObjectURL(file)} width='100' height='100' alt='just do the thing already'/>
}

const Partyifier = ({ party }) => {
  const [partyFile, setPartyFile] = useState(null)

  let partyToDisplay = party
  if (party instanceof File) {
    partyToDisplay = wrapFileToImgTag(party)
  }

  let theRealParty = null
  if (partyFile instanceof File) {
    theRealParty = wrapFileToImgTag(partyFile)
  }

  return (
    <>
      <StyledPartyJammingSpace>
        {partyToDisplay}
      </StyledPartyJammingSpace>
      <StyledDoItButton onClick={() => doTheThing(party, setPartyFile)}>do it</StyledDoItButton>
      {partyFile &&
        <StyledPartyJammingSpace>
          {theRealParty}
        </StyledPartyJammingSpace>
      }
    </>
  )
}

export default Partyifier
