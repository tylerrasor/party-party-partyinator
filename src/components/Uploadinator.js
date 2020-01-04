import React, { useCallback } from 'react'
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

let Uploadinator = ({ jamImageOnPage }) => {
  const onDrop = useCallback(files => {
    let imageToParty = <p>you don't want to party anything? lame.</p>
    if (files.length === 1) {
      if (files[0].type.match(/image/)) {
        imageToParty = <img src={URL.createObjectURL(files[0])}/>
      } else {
        imageToParty = <p>bruh... I don't know how to handle that type of file</p>
      }
    } else {
      imageToParty = (
        <>
          <p>whoa, too much at party at one time dude</p>
          <p>one at a time please</p>
        </>
      )
    }
    jamImageOnPage(imageToParty)
  }, [jamImageOnPage])
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

export default Uploadinator
