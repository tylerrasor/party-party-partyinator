import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { Upload } from 'styled-icons/feather/Upload'

const Container = styled.div`
  height: 100px;
  background: #ababab;
  text-justify: auto;
  text-align: center;
  padding-top: 20px;
  border-radius: 10px;
  margin-top: 80px;
`

const StyledUploadIcon = styled(Upload).attrs(props => ({
  ...props,
  size: 24
}))`

`

let Dropzone = props => {
  const onDrop = useCallback(acceptedFiles => {
    props.jamImageOnPage(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Get the party started...</p> :
          <p>Drag and drop or click here to get the party started...</p>
      }
      <StyledUploadIcon/>
    </Container>
  )
}

const StyledAppWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const StyledColumnWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const StyledPartyJammingSpace = styled.div`
  height: 200px;
  background: #ababab;
  text-justify: auto;
  text-align: center;
  padding-top: 20px;
  border-radius: 10px;
  margin-top: 80px;
`

const App = () => {
  const [party, setParty] = useState()
  const jamImageOnPage = image => { setParty(<div><img src={URL.createObjectURL(image[0])}/></div>); console.log(party) }

  return (
    <StyledAppWrapper>
      <StyledColumnWrapper>
        <Dropzone jamImageOnPage={jamImageOnPage}/>
        <StyledPartyJammingSpace>
          {party}
        </StyledPartyJammingSpace>
      </StyledColumnWrapper>
    </StyledAppWrapper>
  )
}

export default App
