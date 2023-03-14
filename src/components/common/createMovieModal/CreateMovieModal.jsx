import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CreateMovieModal = ({ open, handleClose, setIsMovieCreate }) => {

let initialValues = {
    name:"",
    description:"",
    createdAt:"",
    img:""
}

const onSubmit = (data)=>{
    // console.log(data)
    let arg = {
        name: data.name,
        description: data.description,
        createdAt: data.createdAt,
        img: data.img,
        isLiked: false
    }

    axios.post("http://localhost:5000/movies", arg )
    .then(res => {
        handleClose()
        setIsMovieCreate(true)
    })
    .catch(err => console.log(err))
}
const { handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema,
    onSubmit
})

  return (
    <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"space-evenly",
                    alignItems:"center",
                    height:"400px"
                }}
                    onSubmit={ handleSubmit }
                >
                    <Typography variant='h6' color="primary">Agregar Pelicula</Typography>
                    <TextField 
                        id="outlined-basic" 
                        label="Titulo de la pelicula" 
                        variant="outlined"
                        name='name'
                        fullWidth 
                        onChange={handleChange}
                    />
                      <TextField 
                        id="outlined-basic" 
                        label="Fecha de creacion" 
                        variant="outlined"
                        fullWidth 
                        name='createdAt'
                        onChange={handleChange}
                    />
                      <TextField 
                        id="outlined-basic" 
                        label="Descripcion" 
                        variant="outlined"
                        fullWidth 
                        name='description'
                        onChange={handleChange}
                    />
                      <TextField 
                        id="outlined-basic" 
                        label="Adjuntar URL de la imagen" 
                        variant="outlined"
                        fullWidth 
                        name='img'
                        onChange={handleChange}
                    />
                    <Button type='submit' variant='contained' color='primary'>Agregar</Button>
                </form>
            </Box>
        </Modal>
    </div>
  )
}

export default CreateMovieModal