import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography  } from '@material-ui/core'
import { useSelector, useDispatch } from  'react-redux'
import { RootReducer } from '../shared/models/rootReducer'
import Search from './search'
import clsx from 'clsx'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      textAlign:'center',
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }),
)

const Header = (props:any) =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const editMode = useSelector((state:RootReducer) => state.displayData.editMode ? state.displayData.editMode : false)

    return(
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: editMode,
            })}
            >
            <Toolbar>
                <Search/>

                <Typography className={classes.title} variant="h2" >
                    {props.title}
                </Typography>

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={()=>dispatch({type: 'UPDATE_EDIT_MODE', data: !editMode})}
                    className={clsx(editMode && classes.hide)}
                    >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
export default Header