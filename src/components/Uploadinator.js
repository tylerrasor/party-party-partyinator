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

let Uploadinator = props => {
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

export default Uploadinator
