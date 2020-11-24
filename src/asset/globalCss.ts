import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
//import { Autocomplete } from '@material-ui/lab'

const GlobalCss = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            color: 'white',
            textAlign:'center',
            margin:'auto'
        },
        recipeTitle:{
            color: theme.palette.primary.main,
            textAlign:'center',
            paddingTop: 25,
        },
        subTitle: {
            justifyContent:'center',
            margin:'auto'
        },
        button: {
            marginLeft:'5px',
            float: 'right',
            marginTop: 0,
            color:'white',
            [theme.breakpoints.down('xs')]: {
                zIndex:'1',
                width:'100%',
                margin:0,
                marginBottom:'10px'
            }
        },
        secondAction: {
            color:  theme.palette.primary.main,
            background : '#FAFAFA'
        },
        buttons: {
            marginTop: '40px',
           [theme.breakpoints.down('xs')]: {
             marginTop: '30px',
             width:'100%',
             marginBottom:'10px'
           }
       },
       icons: {
           color: "#DFE6ED",
           zIndex:1,
           backgroundColor: theme.palette.secondary.main,
           //fontSize:"small"
       },
       root: {
           width: '100%',
           marginTop:'5px',
           marginBottom:'5px',
           lineHeight: '0.5',
       },
       avatar: {
           backgroundColor: theme.palette.primary.main,
       },
       iconColor: {
           color:theme.palette.secondary.main 
       },
       layout: {
           width: 'auto',
           marginLeft: theme.spacing(2),
           marginRight: theme.spacing(2),
           [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
             width: '90%',
             marginLeft: 'auto',
             marginRight: 'auto',
           },
       },
       formLayout: {
           width: '100%',
           [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
               width: '50%',
               marginLeft: 'auto',
               marginRight: 'auto',
           },
       },
       paper: {
           width: '100%',
           marginTop: theme.spacing(3),
           marginBottom: theme.spacing(3),
           padding: theme.spacing(2),
           [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
               marginTop: theme.spacing(6),
               marginBottom: theme.spacing(6),
               padding: theme.spacing(3),
           }
       },
       card: {
        padding:0,
        width:'auto',
        maxHeight:500,
        boxShadow: 'none',
        position: 'relative',
        height:'100%',  
            '&:after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                bottom: 0,
                padding:0,
            },
        },
        cardContent:{
            padding:0,
        },
        media:{
            minHeight:'60vh',
            ojectFit:'contain',
            padding:0,
    
        }, 
        content:{
            zIndex:1,
            width: '100%',
            color : 'black',
            position: 'absolute',
            top: '30%',
            textAlign:'center',
            // border:'1px  0 solid black',
            // borderBottom:'1px solid black',
            backgroundColor:'white',
            opacity: '0.5',
            padding:'20px 0'
        },
        contentRecipe:{
            zIndex:1,
            width: '100%',
            color : 'black',
            position: 'absolute',
            top: 0,
            textAlign:'center',
            backgroundColor:theme.palette.primary.main,
            opacity: '0.5',
            padding:'20px 0'
        },
        tips:{
            color:'white',
            backgroundColor: theme.palette.primary.main,
            opacity:0.5
        },
        hover:{
            cursor:'pointer'
        }
    })
)
export default GlobalCss