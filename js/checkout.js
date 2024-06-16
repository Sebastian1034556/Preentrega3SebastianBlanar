const carrito = JSON.parse(localStorage.getItem("carrito")) || []

// const tableBody = document.querySelector("table tbody")
const contenedor = document.getElementById("productCardContainerAdidas")

const importeTotalCarrito = document.querySelector("td#importeTotalCarrito")
const btnComprar = document.querySelector("button#btnComprar")


function retornarProductCard({imagen,nombre,precio,id}){
    return `
            <div class="product-card">
                <img src="${imagen}" alt="Nike Dunk Low">
                <div class="product-info">
                    <h3>${nombre}</h3>
                    <p class="price">$${precio}</p>
                    <button class="add-to-cart" id="${id}">Eliminar del Carrito</button>
                </div>
            </div> 
            `
}



function calcularTotalCarrito() {
    if (carrito.length > 0) {
        let montoTotalCarrito = carrito.reduce((acc, prod)=> acc + prod.precio, 0)
        importeTotalCarrito.textContent = `$ ${montoTotalCarrito.toLocaleString("es-AR")}`
    }
}



function cargarProductosDelCarrito() {
    contenedor.innerHTML = ""
    if (carrito.length > 0) {
        carrito.forEach((producto)=>  contenedor.innerHTML += retornarProductCard(producto))
        calcularTotalCarrito()
    }
}

cargarProductosDelCarrito() //Función principal

btnComprar.addEventListener("click", ()=> {
    const mensajeComprar = document.querySelector("div#mensajeComprar")
    mensajeComprar.classList.add("mostrar-mensaje")
    tableBody.innerHTML = ""
    importeTotalCarrito.textContent = "$ 0.00"
    localStorage.removeItem("carritoCompras")
    carrito.length = 0 // redireccionar al usuario a HOME.
})