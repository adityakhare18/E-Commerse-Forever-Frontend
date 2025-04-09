import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/product.model.js';


//function to add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        const image1 = req.files.image1?.[0];
        const image2 = req.files.image2?.[0];
        const image3 = req.files.image3?.[0];
        const image4 = req.files.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true",
            date: Date.now()
        };

        console.log(productData);
        

        const product = await productModel.create(productData);

        res.status(201).json({ success: true, message: "Product added successfully", product });

    } catch (error) {
        console.log("file nhi gyi", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


//function to list products
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});

        res.json({success:true,message:products})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

//fucntion to remove product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id);

        res.json({success:true,message:"Product removed successfully"});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

//single product details
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addProduct, listProducts, removeProduct, singleProduct };