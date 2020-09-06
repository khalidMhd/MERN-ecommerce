const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const userModel = require('../models/user')
const productModel = require('../models/product')
const { json } = require('express')
const requireLogin = require('../middleware/requireLogin')
const product = productModel.find({})

router.get('/product',(req,res,next)=>{
    productModel.find({}).then(data=>{
        // console.log(data);
        if(data){
            res.status(200).json(data)
        } else{
            res.status(422).json({error:"Data Not Found"})
        }
    })
})

router.get('/product/:id', (req, res) => {
      productModel.findOne({ _id: req.params.id }).then(data=>{
        if (data) {
            res.status(200).send(data);
          } else {
            res.status(404).send({ message: 'Product Not Found.' });
          }
    })
   
  });


router.post('/product',requireLogin, (req,res)=>{
    const {name, price, detail,countInStock,url} = req.body
    if(!name || !price || !detail) {
        res.status(422).json({error:"All fields must be fill"})
    } else {
        const productDetails = new productModel({
            name:name,
            price:price,
            detail:detail,
            countInStock: countInStock,
            photo:url,

        })

        productDetails.save()
        .then(result=>{
            res.status(200).json(result)
        }).catch(err=>{
            console.log(err);
        })
    }
})

router.put('/update-product/:id', async (req, res) => {
    console.log('update product');
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (product) {
        // product._id = req.body.id;
      product.name = req.body.name;
      product.price = req.body.price;
    //   product.photo = req.body.image;
      product.countInStock = req.body.countInStock;
      product.detail = req.body.detail;

      
      const updatedProduct =  product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedProduct });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

router.delete('/product-delete/:id', (req,res)=>{
    productModel.findByIdAndDelete({_id:req.params.id}).then(data=>{
        if(data) {
            res.json(data)
        }
        else {
            res.json('data not found')
        }
    })
})


module.exports = router