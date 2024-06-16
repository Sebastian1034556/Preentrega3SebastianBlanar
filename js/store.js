//CONTENEDORES PARA LAS PRODUCT CARDS
const divContenedorNike = document.getElementById("productCardContainerNike")
const divContenedorAdidas = document.getElementById("productCardContainerAdidas")
const divContenedorPuma = document.getElementById("productCardContainerPuma")
const contenedores = [divContenedorNike,divContenedorAdidas,divContenedorPuma]

// Elementos para interactuar
const productCards = document.querySelectorAll(".product-card")
const btnCarrito = document.getElementById("cart-button")
let contadorCarrito = document.getElementById("cart-counter")
const inputSearch = document.getElementById("input-search")
const botonBuscar = document.getElementById("searchButton")

//Carrito inicializado vacío
const carrito = []

function eliminarElemento(array, id) {
    const index = array.findIndex(elemento => elemento.id === id);
    if (index > -1) {
        array.splice(index, 1);
    }
}

//Renderizado de productos
function retornarProductCard({imagen,nombre,precio,id}){
    return `
            <div class="product-card">
                <img src="${imagen}" alt="Nike Dunk Low">
                <div class="product-info">
                    <h3>${nombre}</h3>
                    <p class="price">$${precio}</p>
                    <button class="add-to-cart" id="${id}">Agregar al Carrito</button>
                </div>
            </div> 
            `
}

function modificarCardEnCarrito(producto){
    let productoDuplicado = producto.id
    const elementoHTMLDuplicado = document.getElementById(productoDuplicado)
    elementoHTMLDuplicado.textContent = "Eliminar del Carrito"
}

function añadirAlCarrito(producto) {

}

function eliminarDelCarrito(producto){
    
}

function cargarProductos(productos,...divContenedores) {
    if (productos.length > 0) {
        divContenedores.forEach(divContenedor =>{
                let productosFiltrados = productos.filter((producto) => divContenedor.id.includes(producto.marca))
                divContenedor.innerHTML = ""
                productosFiltrados.forEach((productoFiltrado)=>{
                    divContenedor.innerHTML += retornarProductCard(productoFiltrado)
                    if (carrito.some((producto)=>producto.id === productoFiltrado.id)){
                        modificarCardEnCarrito(productoFiltrado)
                    }
                })
                
                }) 
    } else {
        alert("La lista de productos está vacía")
    }  
}

// Carrito
function activarEventosCompra(botones,carrito,contadorCarrito){
    botones.forEach((btn)=>{ btn.addEventListener('click', (event)=> {
        let btnClickeado = event.target
        let productoSeleccionado = productos.find((producto)=>producto.id === parseInt(btnClickeado.id)) 
        
        if (! carrito.some((producto)=>producto.id === productoSeleccionado.id)){
            carrito.push(productoSeleccionado)
            let card = btnClickeado.closest(".product-card")
            card.classList.toggle("selected")
        } else {
            eliminarElemento(carrito,productoSeleccionado.id)
            btnClickeado.textContent = "Agregar al Carrito"
        } 
        contadorCarrito.textContent = carrito.length 
        localStorage.setItem("carrito",JSON.stringify(carrito))
        })
    })    
}
function ActivarClickBtnCarrito(btnCarrito){
    btnCarrito.addEventListener("click", ()=> {
        localStorage.setItem("carrito",JSON.stringify(carrito))
        carrito.length > 0 ? location.href = "checkout.html" : alert("Primero debe cargar al menos un producto en su carrito") 
    })
}

//Busqueda
function manejarBusqueda (productos,botonesCompra,inputSearch,contenedores){
    inputSearch.addEventListener("keyup", (e)=> {
        if (e.key === "Enter"){
            let resultado = productos.filter((producto)=>producto.nombre.toLowerCase().includes(inputSearch.value.toLowerCase()))
            if (resultado.length > 0) {
                cargarProductos(resultado,...contenedores)
                botonesCompra = document.querySelectorAll(".add-to-cart")
                activarEventosCompra(botonesCompra,carrito,contadorCarrito)
                localStorage.setItem("ultimaBusqueda",inputSearch.value)
            }
        }
    })
}

function buscarPorInput(productos,botonesCompra,inputSearch,contenedores) {
    inputSearch.addEventListener("keyup", (e)=> {
        e.key === "Enter" && manejarBusqueda(productos,botonesCompra,inputSearch,contenedores)
    }
)}

function buscarPorBoton(productos,botonesCompra,inputSearch,botonBuscar,contenedores){
    botonBuscar.addEventListener("click",()=>{
        e.preventDefault()
        manejarBusqueda(productos,botonesCompra,inputSearch,contenedores)
    })
}


//todo LLAMADAS A LAS FUNCIONES
productos.length > 0 ? cargarProductos(productos, ...contenedores ) : alert("Hubo un error")
const botonesCompra = document.querySelectorAll(".add-to-cart")
activarEventosCompra(botonesCompra,carrito,contadorCarrito)
ActivarClickBtnCarrito(btnCarrito)
manejarBusqueda(productos,botonesCompra,inputSearch, contenedores)

//todo ERROR EN CHECKOUT
