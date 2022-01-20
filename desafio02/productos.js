const fs = require("fs");

class ProductosManager{
  constructor(){
    this.filePath="./productos.txt";
  }

  async save(product){
    let products = await this._loadFile();
    product.id = this._obtainNewId(products);
    products = [...products, product];
    await this._saveFile(products);
    return product.id;
  }

  async getById(id){
    try {
      const products = await this._loadFile();
      const prod = products.find(p=>p.id===id);
      if(prod!==undefined){
        return prod;
      }
      return null;
    } catch (error) {
      throw error;
    }
    
  }

  async getAll(){
    try {
      return await this._loadFile();
    } catch (error) {
      console.log("ERROR: ",error);
    }
  }

  async deleteById(id){
    let products = await this._loadFile();
    if(products.length===0) {
      console.log("The file is empty. Nothing to delete");
      return;
    }

    const prodToDel = products.find(prod=>prod.id===id);
    if(prodToDel!==undefined){
      const newProds = products.filter(prod=>prod.id!==id);
      await this._saveFile(newProds);
      console.log("Product deleted successfully")
      return prodToDel;
    }
    console.log("Product not found. Nothing to delete");
  }

  async deleteAll(){
    await this._saveFile([]);
    console.log("All products deleted")
  }

  _obtainNewId(products){
    if(products.length===0) return 1;
    else{
      let maxId=-1;
      for(const prod of products){
        if(prod.id>=maxId){
          maxId = prod.id;
        }
      }
      return maxId+1;
    }
  }

  async _loadFile(){
    try {
      const data = await fs.promises.readFile(this.filePath);
      return JSON.parse(data);
    } catch (error) {
      console.log("File not found, creating a new one");
      return [];
    }
  }

  async _saveFile(content){
    try {
      const data = await fs.promises.writeFile(this.filePath, JSON.stringify(content));
      return true;
    } catch (error) {
      console.log("Error saving file, please check write access to the containing folder");
    }
  }

}

const main = async ()=>{
  const pm = new ProductosManager();

  const prod1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
  };

  const prod2 = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
  }

  const prod3 = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
  }

  
  const prod1Id = await pm.save(prod1);
  console.log("ADDED "+prod1Id);
  console.log("=============================================================================================");

  const prod2Id = await pm.save(prod2);
  console.log("ADDED "+prod2Id);
  console.log("=============================================================================================");

  const prod3Id = await pm.save(prod3);
  console.log("ADDED "+prod3Id);
  console.log("=============================================================================================");


  console.log("GET "+prod1Id);
  const prodFound = await pm.getById(prod1Id);
  console.log("OBTAINED: "+JSON.stringify(prodFound,null,2));
  console.log("=============================================================================================");

  console.log("GET ALL");
  const prods = await pm.getAll();
  console.log("OBTAINED: "+JSON.stringify(prods,null,2));
  console.log("=============================================================================================");

  console.log("DELETE ID 4");
  const prodToDel4 = await pm.deleteById(4)
  if(prodToDel4!==undefined) console.log("OBTAINED: "+JSON.stringify(prodToDel4,null,2));
  console.log("=============================================================================================");

  console.log("DELETE ID 1");
  const prodToDel1 = await pm.deleteById(prod1Id);
  if(prodToDel1!==undefined) console.log("OBTAINED: "+JSON.stringify(prodToDel1,null,2));
  console.log("=============================================================================================");

  console.log("GET ALL TO CHECK DELETION");
  const prods2 = await pm.getAll();
  console.log("OBTAINED: "+JSON.stringify(prods2,null,2));
  console.log("=============================================================================================");

  console.log("DELETE ALL");
  await pm.deleteAll();
  console.log("=============================================================================================");

  console.log("GET ALL TO CHECK FULL DELETION");
  const prods3 = await pm.getAll();
  console.log("OBTAINED: "+JSON.stringify(prods3,null,2));
  console.log("=============================================================================================");
}

main();
