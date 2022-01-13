class Usuario{
  constructor(nombre,apellido,libros,mascotas){
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName(){
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota){
    if(this.mascotas.constructor !== Array){
      this.mascotas = [];
    }
    this.mascotas.push(mascota);
  }

  countMascotas(){
    if(this.mascotas.constructor !== Array ){
      return 0;
    }
    return this.mascotas.length;
  }

  addBook(nombre,autor){
    if(this.libros.constructor !== Array ){
      this.libros = [];
    }
    this.libros.push({nombre,autor});
  }

  getBookNames(){
    let nombres = []
    if(this.libros.constructor === Array ){
      for(const libro of this.libros){
        nombres.push(libro.nombre)
      }
    }
    return nombres;
  }
}

const user = new Usuario("John","Doe",[{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}],["Gato","Perro","Loro"] );

console.log(`Usuario: ${user.getFullName()}`);
console.log(`Libros: ${user.getBookNames()}`);
console.log(`Cantidad de mascotas: ${user.countMascotas()}`);

user.addBook("El señor de los anillos","Tolkien")
user.addMascota("Pez")

console.log("\n");

console.log(`Usuario: ${user.getFullName()}`);
console.log(`Libros: ${user.getBookNames()}`);
console.log(`Cantidad de mascotas: ${user.countMascotas()}`);
