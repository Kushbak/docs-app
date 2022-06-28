import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import { useParams } from 'react-router-dom'
import { collection, updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-quill/dist/quill.snow.css'

const EditDoc = ({ database }) => {
  const [docsDesc, setDocsDesc] = useState('')
  const [documentTitle, setDocumentTitle] = useState('')
  const params = useParams()
  const isMounted = useRef()
  const collectionRef = collection(database, 'docsData')

  const getQuillData = (value) => {
    setDocsDesc(value)
  }

  const getData = () => {
    const document = doc(collectionRef, params.id)
    onSnapshot(document, (docs) => {
      setDocsDesc(docs.data().docsDesc)
      setDocumentTitle(docs.data().title)
    })
  }

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    const updateDocsData = setTimeout(() => {
      const document = doc(collectionRef, params.id)
      updateDoc(document, {
        docsDesc: docsDesc
      })
        .then(() => {
          toast.success('Document Saved', {
            autoClose: 2000
          })
        })
        .catch(() => {
          toast.error('Cannot Save Document', {
            autoClose: 2000
          })
        })
    }, 1000)
    return () => clearTimeout(updateDocsData)
  }, [docsDesc])

  useEffect(() => {
    if (!isMounted.current) return

    isMounted.current = true
    getData()
  }, [])

  return (
    <div className='editDocs-main'>
      <h1>{documentTitle}</h1>
      <div className='editDocs-inner'>
        <ReactQuill
          value={docsDesc}
          onChange={getQuillData}
        />

      </div>
      <ToastContainer />
    </div>
  )
}

export default EditDoc