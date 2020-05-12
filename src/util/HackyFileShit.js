import React from 'react'
import Stream from 'stream-browserify'
import {createPartyImage} from '../stolen-party-stuff/party'

export const fileToImgTag = (file, size) => {
  return <img src={URL.createObjectURL(file)} width={size} height={size} alt='just do the thing already'/>
}

const jamBitsIntoGifFile = (bits, file_name) => {
  return new File([bits], `${file_name}.gif`, {type: 'image/gif'})
}

const appendBuffers = (buf1, buf2) => {
  let tmp = new Uint8Array(buf1.byteLength + buf2.byteLength)
  tmp.set(new Uint8Array(buf1), 0)
  tmp.set(new Uint8Array(buf2), buf1.byteLength)
  return tmp.buffer
}

let partifiedBytes = new Uint8Array(0)
const doTheHackyWritingBytesManuallyThing = someBytes => {
  partifiedBytes = appendBuffers(partifiedBytes, someBytes)
}

export const theMagic = async (input, shouldIParty) => {
  partifiedBytes = new Uint8Array(0)
  let hackyStream = new Stream.Writable()
  hackyStream.write = doTheHackyWritingBytesManuallyThing
  await createPartyImage(input, hackyStream, shouldIParty)
  console.log(`partifiedBytes: ${partifiedBytes}`)

  const file_name = input.path.replace(/\.(png|jpeg|gif)/, '').replace(/^/, 'party-')

  return jamBitsIntoGifFile(partifiedBytes, file_name)
}