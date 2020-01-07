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

let partified = new Uint8Array(0)
const doTheHackyWritingBytesManuallyThing = someBytes => {
  partified = appendBuffers(partified, someBytes)
}

const appendBuffers = (buf1, buf2) => {
  let tmp = new Uint8Array(buf1.byteLength + buf2.byteLength)
  tmp.set(new Uint8Array(buf1), 0)
  tmp.set(new Uint8Array(buf2), buf1.byteLength)
  return tmp.buffer
}

const doTheThing = async image => {
  if (image !== null) {
    let thePartyStream = new Stream.Writable()
    thePartyStream.write = doTheHackyWritingBytesManuallyThing
    await createPartyImage(image, thePartyStream)

    setTimeout(() => console.log(partified), 500)
  }
}

const Partyifier = ({ party }) => {
  let partyToDisplay = party
  if (party instanceof File) {
    partyToDisplay = <img src={URL.createObjectURL(party)} width='100' height='100' alt='just do the thing already'/>
  }

  return (
    <>
      <StyledPartyJammingSpace>
        {partyToDisplay}
      </StyledPartyJammingSpace>
      <StyledDoItButton onClick={doTheThing(party)}>do it</StyledDoItButton>
    </>
  )
}

export default Partyifier
