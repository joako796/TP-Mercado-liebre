const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
		const product = products.find(product => product.id == id);
		res.render("detail",{title:product.name,product,toThousand});
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;
		const product = products.find(product => product.id == id);
		res.render("product-edit-form",{product,toThousand})
	},
	// Update - Method to update
	update: (req, res) => {
			const {id} = req.params;
			const {name,price,discount,category,description,image} = req.body;
			const arrayUpd = products.map(product => {
				if(product.id == id){
					return{
					id,
					name:name.trim(),
					price,
					discount,
					category,
					description:description.trim(),
					image: image ? image : product.image
					}
				}
				return product
			})
			const json = JSON.stringify(arrayUpd);
			fs.writeFileSync(productsFilePath,json,"utf-8");
			res.redirect(`/products/detail/${id}`);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productId = req.params.id;
		// Filtrar los productos para excluir el producto con el ID correspondiente
		const updatedProducts = products.filter(product => product.id !== +productId);
	
		// Escribir los productos actualizados en el archivo JSON
		fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts), 'utf-8');
	
		// Redirigir a la página de productos con un mensaje de éxito
		res.redirect('/products');
	}
};

module.exports = controller;