import React, { useEffect, useState }from 'react'
import { Card, CardMedia, CardContent, Typography }  from '@material-ui/core'
import { Link } from 'react-router-dom'
import { localdb } from '../../../databases'
import CircularProgress from '@material-ui/core/CircularProgress'
import GlobalCss from '../../../asset/globalCss'

const RecipeCard = (props: any) =>  {
  const global = GlobalCss()
  const [url, setUrl] = useState('')
  
  useEffect(()=>{
    localdb.getAttachment(props.recipe._id, 'file').then(blob => setUrl(URL.createObjectURL(blob)))
  },[props.recipe._id])                   

  return (
    <Link to={{pathname: '/recipe/' + props.recipe._id, state:{recipe: props.recipe}}} >
      <Card className={global.card}>
        <CardContent className={global.cardContent}>

          <Typography variant='h3'className={global.contentRecipe}>
            {props.recipe.label}
          </Typography>

          {url?
            <CardMedia
              image={url}
              component='img'
              />
            : <CircularProgress color="primary" />
          }

        </CardContent>
      </Card>
    </Link>
  )
}

export default RecipeCard