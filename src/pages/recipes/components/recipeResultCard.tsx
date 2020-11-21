import React, { useEffect, useState }from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Typography, CircularProgress, Card, CardContent, CardMedia } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { localdb } from '../../../databases'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      justifyContent:'space-end'
    },
    cover: {
      maxWidth: 100, 
    },
  }),
)

const RecipeResultCard = (props: any) =>  {
  const [url, setUrl] = useState('')
  const classes = useStyles();
  
  useEffect(()=>{
    localdb.getAttachment(props.recipe._id, 'file').then(blob => setUrl(URL.createObjectURL(blob)))
  },[props.recipe._id])                   

  return (

    <Link to={{pathname: '/recipe/' + props.recipe._id, state:{recipe: props.recipe}}} >
      <Card className={classes.card}>
        {url?
          <CardMedia
            className={classes.cover}
            image={url}
            component='img'
            />
          : <CircularProgress color="primary" />
        }
        <CardContent >
          <Typography component="h5" variant="h5">
            {props.recipe.label}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </CardContent>
      </Card>

    </Link>
  )
}

export default RecipeResultCard


