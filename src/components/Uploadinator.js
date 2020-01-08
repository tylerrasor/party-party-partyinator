import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { Upload } from 'styled-icons/feather/Upload'
import { BrowserView } from 'react-device-detect'

const Container = styled.div`
  height: 100px;
  width: 50%;
  min-width: 400px;
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
  margin-top: 15px;
`

const StyledBrowserView = styled(BrowserView)`
  display: inline;
`

let Uploadinator = ({ jamImageOnPage }) => {
  const onDrop = useCallback(files => {
    let imageToParty = <p>whoa, I can't party that</p>
    // using react-dropzone's validation for file type and size means if we get a single file it *should* be partiable
    if (files.length === 1) {
      imageToParty = files[0]
    }
    jamImageOnPage(imageToParty)
  }, [jamImageOnPage])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/jpeg, image/png', maxSize: 102400})

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <div>Get the party started...</div> :
          <div><StyledBrowserView>Drag and drop or </StyledBrowserView>click here to get the party started...</div>
      }
      <StyledUploadIcon/>
    </Container>
  )
}

export default Uploadinator
