import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomModal from '../Modal'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'


const Docs = ({ database }) => {
  const [docsData, setDocsData] = useState([])
  const [title, setTitle] = useState('')
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChangeTitle = (e) => setTitle(e.target.value)
  const collectionRef = collection(database, 'docsData')
  const isMounted = useRef()
  const navigate = useNavigate()

  const addData = () => {
    addDoc(collectionRef, {
      title: title,
      docsDesc: '',
    })
      .then(() => {
        alert('Data Added')
        handleClose()
      })
      .catch((err) => {
        alert('Cannot add data')
        console.log('err', err)
      })
  }

  const getID = (id) => {
    navigate(`/editDoc/${id}`)
  }

  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      setDocsData(data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
    })
  }

  useEffect(() => {
    if (isMounted.current) {
      return
    }

    isMounted.current = true
    getData()
  }, [])

  return (
    <div className='docs-main'>
      <h1>Docs Clone</h1>

      <button
        className='add-docs'
        onClick={handleOpen}
      >
        Add a Document
      </button>

      <div className='grid-main'>
        {docsData.map((doc) => {
          return (
            <div key={doc.id} className='grid-child' onClick={() => getID(doc.id)}>
              <p>{doc.title}</p>
              <div dangerouslySetInnerHTML={{ __html: doc.docsDesc }} />
            </div>
          )
        })}
      </div>

      <CustomModal
        open={open}
        setOpen={setOpen}
        addData={addData}
        title={title}
        setTitle={handleChangeTitle}
      />
    </div>
  )
}

export default Docs