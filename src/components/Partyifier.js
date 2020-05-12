import React, { useState } from 'react'
import styled from 'styled-components'
import { fileToImgTag, theMagic } from '../util/HackyFileShit'
import {noPartyColours, partyColours} from '../stolen-party-stuff/party'
import { isMobile } from 'react-device-detect'

const StyledPartyJammingSpace = styled.div`
  height: ${isMobile ? '36vh' : '100px'};
  width: ${isMobile ? '90vw' : '100px'};
  background: #ababab;
  text-justify: auto;
  text-align: center;
  padding: ${isMobile ? '2vh' : '20px'};
  border-radius: 10px;
  margin-top: ${isMobile ? '5vh' : '80px'};
`

const alpha = 0.7
const StyledPartyOverlay = styled.div`
  @keyframes party {
      0%{ background-color: rgba(${props => props.colours[0].join()}, ${alpha}); }
     11%{ background-color: rgba(${props => props.colours[1].join()}, ${alpha}); }
     22%{ background-color: rgba(${props => props.colours[2].join()}, ${alpha}); }
     33%{ background-color: rgba(${props => props.colours[3].join()}, ${alpha}); }
     44%{ background-color: rgba(${props => props.colours[4].join()}, ${alpha}); }
     55%{ background-color: rgba(${props => props.colours[5].join()}, ${alpha}); }
     66%{ background-color: rgba(${props => props.colours[6].join()}, ${alpha}); }
     77%{ background-color: rgba(${props => props.colours[7].join()}, ${alpha}); }
     88%{ background-color: rgba(${props => props.colours[8].join()}, ${alpha}); }
    100%{ background-color: rgba(${props => props.colours[9].join()}, ${alpha}); }
  }
  
  filter: brightness(85%);
  opacity: ${props => props.isPartying ? '1' : '0'};
  animation: party 0.8s infinite;
  transition: opacity 2s ease-out;
  height: ${isMobile ? '36vh' : '100px'};
  width: ${isMobile ? '90vw' : '100px'};
  padding: ${isMobile ? '2vh' : '20px'};
  border-radius: 10px;
  margin-top: ${isMobile ? '-40vh' : '-140px'};
  z-index: 200001;
`

const StyledDoItButton = styled.button`
  margin-top: 10px;
  width: 100px;
`

const StyledDownloadButton = styled.button`
  width: 100px;
`

const doTheThing = async (image, setPartyFile, setGettingReadyToParty, shouldIParty) => {
  if (image !== null) {
    setGettingReadyToParty(true)
    const partyMagic = await theMagic(image, shouldIParty)
    return new Promise(resolve => setTimeout(() => { setPartyFile(partyMagic); resolve() }, 3000))
  }
}

const download = file => {
  let a = document.createElement('a')
  a.href = URL.createObjectURL(file)
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // eslint-disable-next-line no-undef
  gtag('event', 'file_stuff', { 'event_category': 'file_download', 'event_label': file.name })
}

const Partyifier = ({ maybePartyFile, shouldIParty }) => {
  const [fileToParty, setFileToParty] = useState(null)
  const [partyFile, setPartyFile] = useState(null)
  const [gettingReadyToParty, setGettingReadyToParty] = useState(false)

  let partyToDisplay = maybePartyFile
  let doItButton = null
  let downloadButton = null
  if (maybePartyFile instanceof File) {
    if (maybePartyFile !== fileToParty) {
      setFileToParty(maybePartyFile)
      setPartyFile(null)
    }
    // for some reason on first render we loop through this code once before the setState call works?? help me @tim.huddle
    if (fileToParty !== null) {
      partyToDisplay = fileToImgTag(fileToParty, isMobile ? 300 : 100)
      doItButton = <StyledDoItButton onClick={() => doTheThing(fileToParty, setPartyFile, setGettingReadyToParty, shouldIParty).then(_ => setGettingReadyToParty(false))} disabled={gettingReadyToParty}>{gettingReadyToParty ? shouldIParty ? 'just chillll' : 'just wait your turn, see?' : 'do it'}</StyledDoItButton>
    }
  }

  if (partyFile instanceof File) {
    partyToDisplay = fileToImgTag(partyFile, isMobile ? 300 : 100)
    doItButton = <StyledDoItButton onClick={() => {setPartyFile(null); setGettingReadyToParty(false)}}>reset</StyledDoItButton>
    downloadButton = <StyledDownloadButton onClick={() => download(partyFile)}>download</StyledDownloadButton>
  }

  return (
    <>
      {partyToDisplay &&
        <>
          <StyledPartyJammingSpace isPartying={gettingReadyToParty}>
            {partyToDisplay}
          </StyledPartyJammingSpace>
          <StyledPartyOverlay isPartying={gettingReadyToParty} colours={shouldIParty ? partyColours : noPartyColours} />
          {doItButton}
          {downloadButton}
        </>
      }
    </>
  )
}

export default Partyifier
