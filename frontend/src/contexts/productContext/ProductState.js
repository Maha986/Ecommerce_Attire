import ProductContext from './productContext';
import {useState} from "react";

function ProductState(props)
{
    const host = "http://localhost:5000"
    const [pro, setproducts] = useState(null);
    const [max_price, setMax_price] = useState(0);
    
    

    const getProducts = async ()=>{
        try
        {
            const response = await fetch(`${host}/api/product/getProducts`,{
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })

            
            const result = await response.json();
            setproducts(result);
            const max_price = await result.reduce((max, item) => max.price > item.price ? max : item, result[0]);
            setMax_price(max_price.price);
        }
        catch(error)
        {
            console.log(error);
        }
        

    }

    const addProduct = async(product_name, fabric, price, stock, category, color, date, description) =>{
        var bodyData;
        if(fabric==='-')
        {
            bodyData=JSON.stringify({product_name, price, stock, category, color, date, description})
        }
        else
        {
            bodyData=JSON.stringify({product_name, fabric, price, stock, category, color, date, description})
        }
        const response = await fetch(`${host}/api/product/addProduct`,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'           
            },
            body: bodyData
        });

        return await response.json();
    }

    return (
        <ProductContext.Provider value={{getProducts, pro, addProduct, setproducts, max_price}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;