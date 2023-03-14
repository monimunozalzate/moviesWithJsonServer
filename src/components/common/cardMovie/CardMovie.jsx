import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const CardMovie = ( { movie, handleLike, deleteMovieById } ) => {

  return (
    <Card sx={{ width: 300, height: 500 }}>
      <CardHeader
        title={movie.name}
        subheader={movie.createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={movie.img}
        alt={movie.name}
      />
      <CardContent sx={{height: 150 }}>
        <Typography variant="body2" color="text.secondary">
          {movie.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="add to favorites" onClick={()=> handleLike(movie)} >
          <FavoriteIcon  
            color={movie.isLiked ? "error" : "disabled" }  />
        </IconButton>
        <IconButton aria-label="share">
        </IconButton>   
        <Button type='button' variant='contained' color='primary' onClick={()=> deleteMovieById(movie.id)}>Eliminar</Button>       
      </CardActions>    
    </Card>
  )
}

export default CardMovie