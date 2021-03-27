import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ShoppingCartOutlined,CategoryOutlined, HomeOutlined, Phonelink, SettingsOutlined, PowerSettingsNewOutlined } from "@material-ui/icons";
import HomeFragment from '../Fragments/HomeFragment'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5"  noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
           
              <ListItem button>
                <ListItemIcon>
                    <HomeOutlined />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                    <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <Phonelink/>
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                    <ShoppingCartOutlined/>
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                    <SettingsOutlined/>
                </ListItemIcon>
                <ListItemText primary="Setting" />
              </ListItem>

              <Divider/>

              <ListItem button>
                <ListItemIcon>
                    <PowerSettingsNewOutlined/>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>

          </List>
       
          
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
       <HomeFragment />
      </main>
    </div>
  );
}
