import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
export default function ProductCard({item}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    height:"90%",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 1,
    overflowY: "auto"
  };
  return (
    <>
    <Modal
      
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} >
        <Box sx={style} >
          <img 
          src={`http://localhost:5000/files/${item.url}`}
          // src = {require('../images/1.png')}
          style={{height:"99%",width:"100%"}} alt="..." />
        </Box>
      </Fade>
    </Modal>

    <Card sx={{ maxWidth: 240, margin:"10px 18px" }}>
      <CardActionArea>
        <CardMedia onClick={handleOpen}
          component="img"
          height="260"
          image={`http://localhost:5000/files/${item.url}`}
          // image={require('../images/1.png')}
          alt={item.product_name}
        />
        <CardContent onClick={()=>navigate(`/product/${item._id}`)}>
          <Typography gutterBottom variant="h6" component="div">
            {item.product_name}
          </Typography>
          <Typography variant="body2" color="secondary" sx={{fontWeight:"bold", fontSize:16}}>
            Price: Rs. {item.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  )
}
