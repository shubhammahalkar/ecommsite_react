import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { 
  Avatar, 
  Container,
  Backdrop,
  CircularProgress, 
  Fab,
  Dialog,
  Toolbar,
  Slide,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,  
  TextField,
  FormControlLabel,
  Checkbox,
  Snackbar
} 
from '@material-ui/core';
import BannerSlider from "../Components/BannerSlider";
import ProductView from "../Components/ProductView"
import HorizontalScroller from '../Components/HorizontalScroller';
import StripAdView from '../Components/StripAdView';
import GridView from '../Components/GridView';
import { loadCategories } from '../Components/Actions/categoryActions';
import { connect } from 'react-redux';
import { HomeOutlined, Add,Close,Delete,FormatColorFill, Search} from '@material-ui/icons';
import { loadCategoryPage } from '../Components/Actions/categoryPageAction';
import { Switch } from 'react-router';
import { firestore} from '../firebase';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class HomeFragment extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            loading :true,
            value : 0,
            page:"HOME",
            addDialog:false,
            images : [],
            colors : [],
            selectedProducts: [],
            positionError:"",
            layout_titleError:"",
            snackbar:"",
            layout_bg:"#ffffff",
            view_type: 0,
        }
    }

     handleChange = (event, newValue) => {
        this.setState({
            value:newValue,
        })
      };

      loadLatestProducts = () => {
        firestore
        .collection("PRODUCTS")
        .orderBy("added_on", "desc")
        .limit(8)
        .get()
        .then((querySnapshot) => { 
            let productlist = [];
          if (!querySnapshot.empty){
             
            querySnapshot.forEach((doc) => {
            let data = {
              id:doc.id,
              image :doc.data().product_image_1,
              title:doc.data().product_title,
              price:doc.data().product_price,
            }
                productlist.push(data);
            }) ;
        
          }
          this.setState({
            productlist,
          })

        })
        .catch((error) => {
            console.log(error);
            
        });
      }
       searchProducts = () => {
         if(!this.state.search){
           this.loadLatestProducts();
           return;
         }

         this.setState({
           searching:true
         })

         let keywords = this.state.search.split(" "); 

        firestore
        .collection("PRODUCTS")
        .where('tags', 'array-contains-any',keywords)
        .get()
        .then((querySnapshot) => {

          console.log("working");
            let productlist = [];
          if (!querySnapshot.empty){
             
            querySnapshot.forEach((doc) => {
            let data = {
              id:doc.id,
              image :doc.data().product_image_1,
              title:doc.data().product_title,
              price:doc.data().product_price,
            }
                productlist.push(data);
            }) ;
        
          }
          this.setState({
            productlist,
            searching:false
          })

        })
        .catch((error) => {
            console.log(error);
            this.setState({
              
              searching:false
            })
            
        });
      }

      
     

      componentDidMount(){

        if(this.props.categories === null){
          this.props.loadCategories(()=>{

             
             this.props.loadPage("HOME",()=>{
                this.setState({ loading: false});
             },
             ()=>{
              this.setState({ loading: false});
///error
             })

          },
          ()=>{
            this.setState({ loading: false});
           //error 
          });
        }
      }

      onFieldChange= e =>{
        this.setState({
          [e.target.name] :e.target.value, 

        })
      }

      removeImage = index =>{
        let images = this.state.images
        let colors = this.state.colors

        images.splice(index,1);
        colors.splice(index,1);

        this.setState({
          images,
          colors,
        })

        
      }

      save = () => {
        this.setState({
          positionError:"",
          layout_titleError:"",

        })
        if (!this.state.position){
          this.setState({
            positionError:"Required!",
          })
          return
        }
        switch(this.state.view_type){
           case 0:
              if (this.state.images.length < 3) {
                this.setState({
                  snackbar: "Minimum 3 images Required!",
                })
              }
             break;
           case 1:
            if (this.state.images.length < 1) {
              this.setState({
                snackbar: "image is Required!",
              })
            }
             break;
           case 2:
             if(!this.state.layout_title){
               this.setState({
                 layout_titleError:"Required!",
               })
               return;
             }
             if(this.state.selectedProducts.length < 1){
                this.setState({
                  snackbar: "Please select at least 1 product!",
                })
                return;
             }
             break;
           case 3:
            if(!this.state.layout_title) {
              this.setState({
                layout_titleError:"Required!",
              })
              return;
            }
            if(this.state.selectedProducts.length < 4){
               this.setState({
                 snackbar: "Please select at least 4 product!"
               })
               return;
            }
             break;
           default:
        }
      }

    render() { 
        return (
          <div>
            <Container maxWidth="md" fixed>
            
              <AppBar position="static" color="white">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  
                  {this.props.categories
                    ? this.props.categories.map((category) => (
                        <Tab
                          icon={
                            <CategoryTab
                              icon={category.icon}
                              title={category.categoryName}
                            />
                          }
                          onClick={(e) => {
                            if (
                              this.props.categoryPages[
                                category.categoryName.toUpperCase()
                                ]
                                ){
                              this.setState({ 
                                page:category.categoryName.toUpperCase(),
                              });
                            } else {
                              this.setState({ loading: true});   
                              this.props.loadPage(
                                category.categoryName.toUpperCase(),
                                () => {
                                  
                                this.setState({ 
                                  loading: false,
                                  page: category.categoryName.toUpperCase(),
                                 }); 
                                },
                                ()=>{    
            
                                 this.setState({ loading: false});
                              ///error
                                });
                            }
                             
                          }}
                          />
                  ))
                  : null }
               
                </Tabs>
              </AppBar>
              
              {this.props.categoryPages
                ? this.props.categoryPages[this.state.page].map((item,index) => {
                    switch(item.view_type) {
                      case 0:
                        let banners = [];
                  for (
                    let index = 1;
                    index < item.no_of_banners+1;
                    index++
                    ) {
                    const banner = item["banner_"+index];
                    const background = item["banner_"+index+"_background"];
                    banners.push({banner,background});
                  }
                 return <BannerSlider Images={banners} />;

                    case 1: 
                      return ( 
                        <StripAdView 
                          image={item.strip_ad_banner}
                          background={item.background} 
                       />
                      )
                    case 2:
                        let productsData = [];


                        if (!item.loaded) {
                        
                        item.products.forEach((id,index) => {

                            firestore
                              .collection("PRODUCTS")
                              .doc(id)
                              .get()
                              .then((document) => {

                              if (document.exists) {
                                let productData = {
                                  id: id,
                                  title: document.data()['product_title'],
                                  subtitle: "",
                                  image: document.data()['product_image_1'],
                                  price: document.data()['product_price'],
                                };
                                productsData.push(productData);
                                if (index === item.products.length - 1) {
                                    item.products = productsData;
                                    item['loaded'] = true;
                                  this.setState({});

                                }
                              }
                            })
                            .catch((err) => {
                              //err
                            });
                          
                        });
                        } 
                        /* let products =[]
                        for (
                          let index = 1;
                          index < item.no_of_products + 1;
                          index++
                          ) {
                         let data = {};
                         data['title'] = item['product_title_'+index]
                         data['subtitle'] = item['product_subtitle_'+index]
                         data["price"] = item["product_price"+index]
                         data['image'] = item['product_image_'+index] 
                         products.push(data)
                             } */
                      return (
                        <HorizontalScroller 
                            products={item.products} 
                            title={item.layout_title} 
                            background={item.layout_background} 

                         />
                      );
                    case 3:

                      let gridData = [];


                      if (!item.loaded) {

                      item.products.forEach((id,index) => {
                           if (index < 4){         
                          firestore
                            .collection("PRODUCTS")
                            .doc(id)
                            .get()
                            .then((document) => {

                            if (document.exists) {
                              let productData = {
                                id: id,
                                title: document.data()['product_title'],
                                subtitle: "",
                                image: document.data()['product_image_1'],
                                price: document.data()['product_price'],
                              };
                              gridData.push(productData);
                              if (index === 3) {
                                  item.products = gridData;
                                  item['loaded'] = true;
                                this.setState({});

                              }
                            }
                          })
                          .catch((err) => {
                            //err
                          });
                           }
                      });
                      } 

                     
                        
                        return (
                          <GridView  
                            products={item.products}
                            title={item.layout_title}
                            background={item.layout_background}
                          />
                        ) 
                    default: 
                    break;
                    }   
                })
              :null}

                <Fab 
                  color="primary" 
                  aria-label="add"
                  onClick={(e) => this.setState({addDialog: true }) } 
                  style={{position:"fixed",bottom:"50px",right:"50px"}}
                >
                  <Add/>
                </Fab>

              </Container>
              <Dialog 
              fullScreen 
              open={this.state.addDialog} 
              onClose={(e) => 
                  this.setState({ 
                addDialog: false,
              })} 
              TransitionComponent={Transition}
              >
        <AppBar >
          <Toolbar>
            <IconButton 
            edge="start" 
            color="inherit" 
            onClick={(e) => this.setState({
              addDialog: false,
            })} 
            aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" >
              Add Section
            </Typography>
            <Button  
              autoFocus 
              color="inherit" 
              style={{position:"absolute",right:0}}
              onClick={(e) => 
                  this.save()
                }
            >
              save
            </Button>
          </Toolbar>
        </AppBar> 
            

          <Toolbar/>
          <Box padding="16px">
          <FormControl>
          <InputLabel id="demo-simple-select-label">View Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e)=>{
              this.onFieldChange(e);
              this.setState({
                colors:[],
                images:[],
                selectedProducts:[]
              })
              }}
            name="view_type"
            defaultValue={0}            
          >
            <MenuItem value={0}>BANNER SLIDER</MenuItem>
            <MenuItem value={1}>STRIP AD</MenuItem>
            <MenuItem value={2}>HORIZONTAL SCROLLER</MenuItem>
            <MenuItem value={3}>GRID VIEW</MenuItem>
          </Select>
          <br/>
          <TextField
          label="Position"
          id="outlined-size-small"
          variant="outlined"
          type="number"
          name="position"
          size="small"
          error={this.state.positionError !== ""}
          helperText={this.state.positionError}
          onChange={this.onFieldChange}
          margin="dense"
          />
          </FormControl>
          <br/>

            <Box display="flex" flexWrap="true">

              {
                this.state.images.map((item,index) => (
                  <Box margin="12px">
                    <img 
                      src={URL.createObjectURL(item)} 
                      style={{
                        height:"90px",
                        width: this.state.view_type===0? "160px":this.state.view_type===1? "210px":0, 
                        objectFit:"scale-down",
                        backgroundColor:this.state.colors[index],
                      }}
                      />
                      <br/>
                      <input 
                        id={"contained-button-"+index} 
                        type="color"
                        hidden
                        onChange={(e)=>{
                          let colors = this.state.colors
                          colors[index] = e.target.value
                          this.setState({
                            colors,
                          })
                        }}
                        defaultValue="#000000"
                      /> 

                        <IconButton 
                          aria-label="delete" 
                          onClick={(e)=>this.removeImage(index)}
                          >
                          <Delete />
                        </IconButton>

                        <label htmlFor={"contained-button-"+index}>
                          <IconButton 
                          color="primary" 
                          aria-label="upload picture" 
                          component="span"
                          >
                          <FormatColorFill />
                        </IconButton>
                        </label>
                    </Box>
                  
                  ))}
             </Box>

         <input
          accept="image/*"
          id="contained-button-file"
          onChange={(e) => {

            if (e.target.files && e.target.files[0]){
              let images = this.state.images;
 
              images.push(e.target.files[0]);
              this.state.colors.push("#ffffff");
              this.setState({
                images,
              });
            }
          }}
          hidden
          name="images"
          type="file"
        />
        <br/>
        {this.state.view_type===0 &&  this.state.images.length < 8 ?(
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Add Image
            </Button>
          </label>
        ) : null}
        {this.state.view_type=== 1 &&  this.state.images.length < 1 ?(
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Add Image
            </Button>
          </label>
        ) : null}
        <br/>
        {(this.state.view_type === 2 || this.state.view_type ===3) &&
          
          <div>
            <Box style={{background:this.state.layout_bg}}>
              <TextField 
                id="filled-basic" 
                label="Title" 
                style={{width:"100%"}}
                onChange={this.onFieldChange}
                error={this.state.layout_titleError !== ""}
                helperText={this.state.layout_titleError}
                variant="standard" 
              />
            </Box>
            <input 
                id={"contained-button-title"} 
                type="color"
                hidden
                onChange={this.onFieldChange}
                name="layout_bg"
                defaultValue="#ffffff"
              /> 
            <label htmlFor={"contained-button-title"}>
              <Button
                color="primary" 
                aria-label="upload picture" 
                component="span"
              >
                Layout Background
              </Button>
            </label>
            
            <h4>Select product: {this.state.selectedProducts.length}</h4>
            <Box display="flex">
              <TextField 
                name="search"
                style={{flexGrow:1}}
                onChange={this.onFieldChange}  
                label="Search" 
                variant="outlined" 
              />
              <Button variant="contained" color="primary" onClick={(e) => this.searchProducts() }>
              Search
              </Button>
            
              
            </Box>
            <br/>
            {this.state.searching ? (
              <Box 
                display="flex" 
                justifyContent="center" 
                bgcolor="#00000010"
              >
                <CircularProgress />
              </Box>
            ):(
            <Box display="flex" flexWrap="true" bgcolor="#00000010" >
              {this.state.productlist === undefined
              ? this.loadLatestProducts()
              : this.state.productlist.map((item,index)=>(
              
                <FormControlLabel
                control= {
                <Checkbox
                  onChange={(e) => {
                  if(e.target.checked){
                    this.state.selectedProducts.push(item.id)
                  }else{
                      let posi =this.state.selectedProducts.indexOf(item.id)
                      this.state.selectedProducts.splice(posi,1)
                  }
                  this.setState({});
                }}
                  />
                }
                label={<ProductView item={item}/>}
                labelPlacement="bottom"
              />
              ))}
            </Box>
            )}
          </div>
      }  
        </Box>
      </Dialog>
      
                
                  
                  <Backdrop 
                      style={{zIndex: 1500}}
                      open={this.state.loading} 
                    >
                      <CircularProgress color="primary" />
                  </Backdrop>
                  <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                     horizontal: 'left',
                   }}
                    open={this.state.snackbar !== ""}
                    autoHideDuration={6000}
                    onClose={(e)=>
                      this.setState({
                      snackbar: "",
                      })
                    }
                    message={this.state.snackbar}
        
                  />     
              </div>
          );
    }
}

export const CategoryTab = ({icon,title}) =>{
    return(
    <Box textAlign="center">
    {icon !== "null" ? (
        <img src={icon} style={{height: "30px" , width: "30px"}} />
      ) : (

      <HomeOutlined/>
      )}
      <Typography variant="body2" textAlign="center">
        {title}
      </Typography>
    </Box>
      )
    }
 
const mapStateToProps = (state) => {
  return{
    categories :state.categories,
    categoryPages:state.categoryPages
  }
}

const mapDispatchToProps = (dispatch) => {
  return  { 
    loadCategories: (onSuccess,onError) => dispatch(loadCategories(onSuccess,onError)),
    loadPage:(category,onSuccess,onError)=>dispatch(loadCategoryPage(category,onSuccess,onError))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeFragment);

 

  

 