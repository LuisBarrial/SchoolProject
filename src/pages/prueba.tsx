
const a = 1
const b = 2
const c = a + b

let cadena = 'hola'

cadena.toLowerCase();

let obj: any = {x: 0};

obj.foo();

obj();

obj.bar=100

obj = 'hello'

 const n : number = obj;

 function saludar(name: string){
    console.log(`hola ${name}`)
 }

 //saludar(2)
 saludar('qwqwq');

 
 function hello(persona: {name: string,edad : number}): string
 {
    const {name, edad} = persona;
    console.log(`hola ${name} tienes ${edad}`)

    return name;
 }

 function hello2({name, edad}:{name: string , edad: number} ): string
 {
    console.log(`hola ${name} tienes ${edad}`)

    return name;
 }


 const sayHiFromFunction = (fn) =>{

 }

 type Gameboard = readonly [
    [Valueboard,Valueboard,Valueboard]]

type Valueboard = "X" | "O"

 

 const gameboard : Gameboard = [
['X','O','O']
 ]