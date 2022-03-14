import * as React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import { Typography, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ProductCard from './ProductCard';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import productContext from '../contexts/productContext/productContext';
import Price from './Price';

const drawerWidth = 240;

function AllProducts(props) {
    const context = useContext(productContext);
    const {pro,setproducts,getProducts,max_price} = context;
    const [actual_product, setactual_product] = useState([]);
    
    
    useEffect(async ()=>{
        if(pro===null || pro===[])
        {
            await getProducts();
        }
    },[])
     
    const { windows } = props;
    
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [page, setPage] = React.useState(1);

    
    const [page_product, setpage_product] = useState((pro!==null && pro!==false) ? [...pro.filter(
        (prod, ind) => (ind >= ((page - 1) * 12) && ind < page * 12)
    )]:[]);

    
    
    const count=(pro!==null && pro!==false) ? Math.ceil(pro.length / 12) : 0;

    const [price, setPrice] = React.useState( [0,1]);

    // useEffect(()=>{
    //     if(max_price!==0 && pro!==false && pro!==null)
    //     {
    //         console.log("Ere")
    //         setPrice([0,max_price])
    //     }
    // },[max_price])

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        (pro!==null && pro!==false) && setpage_product([...pro.filter(
            (prod, ind) => (ind >= ((page - 1) * 12) && ind < page * 12)
        )])
    }, [page, pro])

    const [fabricvalue, setfabricValue] = useState('')
    const fabrichandleChange = (event) => {
        setfabricValue(event.target.value);
    };

    
   
    

    const handlePriceChange = (event, newPriceValue) => {
        setPrice(newPriceValue);
    };
    const [colorvalue, setcolorValue] = useState('')
    const colorhandleChange = (event) => {
        setcolorValue(event.target.value);
    };
    const sortNames = { 1: "name", 2: "name", 3: "price", 4: "price", 5: "date", 6: "date" }


    const [sort, setSort] = useState('');

    const sortHandle = (event) => {
        setSort(event.target.value);
    };
    function sortProducts(unsorted, key, reverse) {
        let temp_prod = {};
        unsorted.map(
            (item) => {
                if (temp_prod[item[key]] === undefined)
                    temp_prod[item[key]] = [];
                temp_prod[item[key]].push(item);
            })
        let sorted = [];
        Object.values(Object.fromEntries(Object.entries(temp_prod).sort())).forEach(
            (items_arr) => sorted.push(...items_arr)
        );
        if (reverse) sorted.reverse();
        setproducts(sorted);
        setpage_product(
            [...sorted.filter(
                (prod, ind) => (ind >= ((page - 1) * 12) && ind < page * 12)
            )])
    }
    useEffect(() => {
        if (sort !== '' && pro!==null && pro!==false ) sortProducts(pro, sortNames[sort], sort % 2 === 0);

    }, [sort])
    useEffect(() => {
        let temp_prod = [];
        if (fabricvalue  !== '' && colorvalue  !== '') {
            setactual_product(pro);
            temp_prod = Object.values(pro).filter(
                (item) => ((item.fabric === fabricvalue && item.color === colorvalue) && item.price <= price[1] && item.price >= price[0]))
           
            setproducts(temp_prod);
            if (sort !== '') sortProducts(temp_prod, sortNames[sort], sort % 2 === 0);
            setPage(1);
        }
        else if (fabricvalue  !== '' && colorvalue === '') {
            setactual_product(pro);
            temp_prod = (pro!==null && pro!==false) && Object.values(pro).filter(
                (item) => ((item.fabric === fabricvalue) && item.price <= price[1] && item.price >= price[0]))
            
            setproducts(temp_prod);
            if (sort !== '') sortProducts(temp_prod, sortNames[sort], sort % 2 === 0);
            setPage(1);
        }
        else if (fabricvalue === '' && colorvalue  !== '') {
            setactual_product(pro);
            temp_prod = (pro!==null && pro!==false) &&  Object.values(pro).filter(
                (item) => ((item.color === colorvalue) && item.price <= price[1] && item.price >= price[0]))
  
            setproducts(temp_prod);
            if (sort !== '') sortProducts(temp_prod, sortNames[sort], sort % 2 === 0);
            setPage(1);
        }
        else {
            setactual_product(actual_product);
            temp_prod = Object.values(actual_product).filter(
                (item) => (item.price <= price[1] && item.price >= price[0]))
            
            setproducts(temp_prod);
            if (sort !== '') sortProducts(temp_prod, sortNames[sort], sort % 2 === 0);
            setPage(1);
        }

    }, [fabricvalue, colorvalue, price])

    const container = windows !== undefined ? () => windows().document.body : undefined;

    const drawer = (
        <div>
            {/* <Toolbar /> */}
            <div style={{ display: "flex", justifyContent: "right" }}>
                <IconButton sx={{ display: { xs: 'block', sm: 'none' } }}
                    onClick={handleDrawerToggle}
                >
                    <CloseIcon sx={{ color: "#9a78b3" }} />
                </IconButton>
            </div>
            <Divider />
            <Typography sx={{ p: 2 }}>
                Selecting filters will apply them
            </Typography>
            <Divider />
            <div style={{ marginLeft: "7px" }}>
                <Button variant="outlined" color="secondary" onClick={() => { setPrice([0,10]); setcolorValue(''); setfabricValue('');  setproducts(Object.values(actual_product));  if (sort !== '' && actual_product!==[]) sortProducts(Object.values(actual_product), sortNames[sort], sort % 2 === 0); setPage(1); }} sx={{ margin: "9px 0px", display: "block" }}>Clear All</Button>

                {fabricvalue  !== '' ? <Typography color="error" size="small"><IconButton onClick={() => setfabricValue('')}><CloseIcon sx={{ color: "#9a78b3" }} /></IconButton>{fabricvalue}</Typography> : false}
                {colorvalue  !== '' ? <Typography color="error"><IconButton onClick={() => setcolorValue('')}><CloseIcon sx={{ color: "#9a78b3" }} /></IconButton>{colorvalue}</Typography> : false}
                <Divider />
                <br />
                <FormControl fullWidth color="secondary">
                        <InputLabel id="demo-simple-select">Filter By Fabric</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={fabricvalue}
                            label="Filter By Fabric"
                            onChange={fabrichandleChange}
                        >
                            { (pro!==null && pro!==false) && [... new Set(Object.values(pro).map(item => item.fabric))].filter((item)=>item !== undefined).map((elem) => 
                                <MenuItem value={elem}>{elem}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <br /><br />
                
                
                


                {
                    (pro!==null && pro!==false && max_price!==0) && <Price price={price} max_price={max_price} setPrice={setPrice}/>
                    
                    }
                
                <br />
                {/* <Typography sx={{ marginTop: "12px" }}>Color</Typography>
                <RadioGroup row
                    aria-label="color"
                    name="controlled-radio-buttons-group"
                    value={colorvalue}
                    onChange={colorhandleChange}
                >
                    {[... new Set(Object.values(props.data).map(item => item.color))].map((elem) => {
                        return <FormControlLabel key={elem} value={elem} sx={{ color: "#9a78b3" }} control={<Radio size="small" color="secondary" />} label={elem} />
                    })}

                </RadioGroup> */}
                <FormControl fullWidth color="secondary">
                        <InputLabel id="demo-simple-select">Filter By Color</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={colorvalue}
                            label="Filter By Color"
                            onChange={colorhandleChange}
                        >
                            { (pro!==null && pro!==false) && [... new Set(Object.values(pro).map(item => item.color))].map((elem) => 
                                <MenuItem value={elem}>{elem}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
            </div>

        </div>
    );
    return (
        <Box sx={{ display: 'flex', mt: 10 }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders">

                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    // onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: "unset" },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, marginLeft: "9px", clear: "both", width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <div style={{ display:"flex", justifyContent:"center"}}>
                    <Pagination count={count} page={page} color="secondary" onChange={handleChange} sx={{ my:4 }} />
                </div>

                {/* <Toolbar /> */}
                <IconButton

                    aria-label="open drawer"
                    //   edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ display: { sm: 'none' }, border: "2px solid #9a78b3", borderRadius: "4%", color: "#9a78b3", height: "56px", padding: "12px", width: "30%" }}
                >
                    <Typography> Filter</Typography>

                    <FilterAltOutlinedIcon />
                </IconButton>
                <div style={{ float: "right", clear: "both", width: "30%", marginRight: "20px" }}>
                    <FormControl fullWidth color="secondary">
                        <InputLabel id="demo-simple-select">Sort By</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            label="Sort By"
                            onChange={sortHandle}
                        >
                            <MenuItem value={1}>Alphabetically, A-Z</MenuItem>
                            <MenuItem value={2}>Alphabetically, Z-A</MenuItem>
                            <MenuItem value={3}>Price, Low to High</MenuItem>
                            <MenuItem value={4}>Price, High to Low</MenuItem>
                            <MenuItem value={5}>Date, Old to New</MenuItem>
                            <MenuItem value={6}>Date, New to Old</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        clear: "both",
                        justifyContent: 'space-evenly'
                    }}
                >
                    {(pro!==null && pro!==false) && page_product.map((item) => {
                        return <ProductCard key={item._id} item={item} />
                    })}
                    {
                        (pro!==null && pro!==false && page_product.length ==0) && 
                        // <Typography variant="subtitle3" color="secondary" component="div"
                        //         sx={{ textAlign: "center", mt: 2, }} >
                        //         No Products To Show
                        //     </Typography>
                        console.log(pro)
                    }
                </Box>
                <div style={{ display:"flex", justifyContent:"center"}}>
                    <Pagination count={count} page={page} color="secondary" onChange={handleChange} sx={{ my:4 }} />
                </div>

            </Box>
        </Box>
    );
}

AllProducts.propTypes = {
    windows: PropTypes.func,
};

export default AllProducts;
