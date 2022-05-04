import React, { useEffect } from 'react'
import Divider from '@mui/material/Divider';
import { Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

function Price(props) {
  const {max_price,onMount}=props;
  const [price, setPrice] = React.useState([0, 1]);

  const handlePriceChange = (event, newPriceValue) => {
    setPrice(newPriceValue);
    onMount([price, setPrice]);
};

useEffect(()=>{
  
  if(price[1]===max_price)
  {
    return false;
  }
    setPrice([0,max_price]);
    return false;
},[max_price])

useEffect(() => {
  if(price[1]===1)
  {
    return false;
  }
    onMount([price, setPrice]);
    return true;
}, [onMount, price]);
  return (
    <>
      <Divider />
      <Typography sx={{ marginTop: "12px" }}>Price-range</Typography>

      <TextField
        color="secondary"
        label="Min. Price (Rs.)"
        type="number"
        variant="standard"
        value={price[0]}
        onChange={(e) => setPrice((prev) => [e.target.value, prev[1]])}
      /><br />
      <Slider
        getAriaLabel={() => 'Price Range'}
        value={price}
        min={0}
        step={1}
        max={max_price}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        sx={{ width: "80%", ml: 2 }}
        color="secondary"
      /><br />
      <TextField
        color="secondary"
        label="Max. Price (Rs.)"
        type="number"
        variant="standard"
        value={price[1]}
        onChange={(e) => setPrice((prev) => [prev[0], e.target.value])}
      />
      <br /><br />
      <Divider />
    </>
  )
}

export default React.memo(Price)