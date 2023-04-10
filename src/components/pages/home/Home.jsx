import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardMovie from '../../common/cardMovie/CardMovie'
import Header from '../../common/header/Header'
import styles from './Home.module.css'
import confetti from 'canvas-confetti'
import Button from '@mui/material/Button';
import CreateMovieModal from '../../common/createMovieModal/CreateMovieModal'


const Home = () => {

    const [movies, setMovies] = useState([])
    const [dispatchLike, setDispatchLike] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [isMovieCreate, setIsMovieCreate] = useState(false)
    const [isMovieDelete, setIsMovieDelete] = useState(false)

    // funciones modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios.get("https://app-movies-two.vercel.app//movies")
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err))

            setDispatchLike(false)
            setIsMovieCreate(false)
            setIsMovieDelete(false)

    }, [dispatchLike, isMovieCreate, isMovieDelete])
    // console.log("movies", movies) //arreglo movies

    const handleLike =(movie)=>{

        if(!movie.isLiked){
            confetti({
                zIndex:999,
                particleCount: 100,
                apread:160,
                angle:-100,
                origin:{
                    x:0.5,
                    y:0
                }
            })
        }

// modifica la propiedad isLiked
// tambien se puede con el verbo put(aca hay que pasar todas las propiedades, con patch solo una propiedad)
        axios.patch(`http://localhost:5000/movies/${movie.id}`, {
            isLiked: !movie.isLiked
        } )
        .then (res => setDispatchLike(true))
        .catch(err => console.log(err))
    }

    const moviesFiltered = movies.filter(movie => movie.isLiked)

// funcion delete
const deleteMovieById=(id)=>{
    // console.log("este es el id: "+id)
    axios.delete(`http://localhost:5000/movies/${id}`)
    .then(res => setIsMovieDelete(true))
    .catch(err => console.log(err))
}

  return (
    <>
        <Header setFavorite={setFavorite}/>
        <Button onClick={handleOpen}>AGREGAR PELICULA</Button>
        <CreateMovieModal 
            open={open}
            handleClose={ handleClose } 
            setIsMovieCreate={setIsMovieCreate}
            />
        <div className={styles.containerCards}>

            {
                !favorite ? (
                    movies.map((movie)=>{
                        return (                        
                            <CardMovie 
                            movie={movie}  
                            key={movie.id} 
                            handleLike={handleLike} 
                            deleteMovieById={deleteMovieById}
                            />
                        );
                    })
                ): (
                    moviesFiltered.map((movie)=>{
                        return (                        
                            <CardMovie 
                            movie={movie}  
                            key={movie.id} 
                            handleLike={handleLike} 
                            deleteMovieById={deleteMovieById}
                            />
                        )
                    })
                )
            }
        </div>
    </>
  )
}

export default Home