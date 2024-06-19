//CONTENEDORES PARA LAS PRODUCT CARDS
const divContenedorNike = document.getElementById("productCardContainerNike")
const divContenedorAdidas = document.getElementById("productCardContainerAdidas")
const divContenedorPuma = document.getElementById("productCardContainerPuma")
const contenedores = [divContenedorNike,divContenedorAdidas,divContenedorPuma]
// Elementos para interactuar
const btnCarrito = document.getElementById("cart-button")
const contadorCarrito = document.getElementById("cart-counter")
const inputSearch = document.getElementById("input-search")
const botonBuscar = document.getElementById("searchButton")
const botonFiltrar = document.getElementById("filterButton")
const dropdown = document.querySelector(".dropdown-menu")
const selectElement = document.getElementById("select")
//Carrito inicializado vacío
const carrito = []

function eliminarElemento(array, id) {
    const index = array.findIndex((elemento) => elemento.id === id)
    if (index > -1) {
        array.splice(index, 1)
    }
}
//Renderizado de productos
function retornarProductCard({ imagen, nombre, precio, id }) {
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
function modificarCardEnCarrito(producto) {
    let productoDuplicado = producto.id
    const elementoHTMLDuplicado = document.getElementById(productoDuplicado)
    elementoHTMLDuplicado.textContent = "Eliminar del Carrito"
}
function cargarProductos(productos, ...divContenedores) {
    if (productos.length > 0) {
        divContenedores.forEach((divContenedor) => {
            let productosFiltrados = productos.filter((producto) =>divContenedor.id.includes(producto.marca))
            divContenedor.innerHTML = ""
            productosFiltrados.forEach((productoFiltrado) => {
                divContenedor.innerHTML += retornarProductCard(productoFiltrado)
                if (carrito.some((producto) => producto.id === productoFiltrado.id)) {
                    modificarCardEnCarrito(productoFiltrado)
                }
            })
        })
    } else {
        alert("La lista de productos está vacía")
    }
}
// Carrito
function activarEventosCompra(botones, carrito, contadorCarrito) {
    botones.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            let btnClickeado = event.target
            let productoSeleccionado = productos.find((producto) => producto.id === parseInt(btnClickeado.id))
            if (! carrito.some((producto) => producto.id === productoSeleccionado.id)) {
                carrito.push(productoSeleccionado)
                let card = btnClickeado.closest(".product-card")
                card.classList.toggle("selected")
                contadorCarrito.classList.add("d-flex")
            } else {
                eliminarElemento(carrito, productoSeleccionado.id)
                btnClickeado.textContent = "Agregar al Carrito"
            }
            contadorCarrito.textContent = carrito.length
            localStorage.setItem("carrito", JSON.stringify(carrito))
        })
    })
}
function ActivarClickBtnCarrito(btnCarrito) {
    btnCarrito.addEventListener("click", () => {
        localStorage.setItem("carrito", JSON.stringify(carrito))
        carrito.length > 0 ? (location.href = "checkout.html") : alert("Primero debe cargar al menos un producto en su carrito")
    })
}
//Búsqueda
function manejarBusqueda(productos, botonesCompra, inputSearch, contenedores) {
    let resultado = productos.filter((producto) => producto.nombre.toLowerCase().includes(inputSearch.value.toLowerCase()))
    if (resultado.length > 0) {
        cargarProductos(resultado, ...contenedores)
        botonesCompra = document.querySelectorAll(".add-to-cart")
        activarEventosCompra(botonesCompra, carrito, contadorCarrito)
        localStorage.setItem("ultimaBusqueda", inputSearch.value)
    }
}

function buscarPorInput(productos, botonesCompra, inputSearch, contenedores) {
    inputSearch.addEventListener("keyup", (e) => {
        e.key === "Enter" &&
            manejarBusqueda(productos, botonesCompra, inputSearch, contenedores)
    })
}

function buscarPorBoton(productos,botonesCompra,inputSearch,botonBuscar,contenedores) {
    botonBuscar.addEventListener("click", (e) => {
        e.preventDefault()
        manejarBusqueda(productos, botonesCompra, inputSearch, contenedores)
    })
}
function ordenar(lista, criterio, asc = true) {
    try {
        for (let i = 0; i < lista.length; i++) {
            for (let j = i + 1; j < lista.length; j++) {
                let criterio_i = lista[i][criterio]
                let criterio_j = lista[j][criterio]
                
                if (!isNaN(criterio_i) && !isNaN(criterio_j)){
                    criterio_i = parseFloat(criterio_i)
                    criterio_j = parseFloat(criterio_j)
                }
                if (criterio_i > criterio_j) {
                    let auxiliar = lista[i];
                    lista[i] = lista[j];
                    lista[j] = auxiliar;
                }
            }
        }
        if (!asc) {
            lista.reverse()
        }
    } catch (error) {
        console.error("Ha ocurrido un error:", error)
        alert("Ha ocurrido un error, revisa el criterio y la lista")
    }
}
function filtrar (botonFiltrar,dropdown,selectElement,contenedores,productos){
    botonFiltrar.addEventListener("click", () => {
        dropdown.classList.toggle("active")
    })
    selectElement.addEventListener("change", () => {
        let resultado = false
        let productosFiltrados = productos 
        const selectedValue = selectElement.value
        switch (selectedValue) {
            case "todas":
                cargarProductos(productos,...contenedores)
                break
            case "nike":
                resultado = "Nike"
                break
            case "adidas":
                resultado = "Adidas"
                break
            case "puma":
                resultado = "Puma"
                break
            case "a-z":
                ordenar(productosFiltrados, "nombre", true)
                cargarProductos(productosFiltrados,...contenedores)
                break
            case "z-a":
                ordenar(productosFiltrados, "nombre", false)
                cargarProductos(productosFiltrados,...contenedores)
                break
            case "true":
                ordenar(productosFiltrados, "precio", true)
                cargarProductos(productosFiltrados,...contenedores)
                break
            case "false":
                ordenar(productosFiltrados, "precio", false)
                cargarProductos(productosFiltrados,...contenedores)
                break
        }
        if (resultado){
            productosFiltrados = productos.filter((producto) => producto.marca === resultado)
            cargarProductos(productosFiltrados,...contenedores)
        }
        const botonesCompra = document.querySelectorAll(".add-to-cart")
        activarEventosCompra(botonesCompra, carrito, contadorCarrito)
    })
}
//Botones
productos.length > 0 ? cargarProductos(productos, ...contenedores) : alert("Hubo un error")
const botonesCompra = document.querySelectorAll(".add-to-cart")
activarEventosCompra(botonesCompra, carrito, contadorCarrito)
ActivarClickBtnCarrito(btnCarrito)
//Búsqueda y fitrado
buscarPorInput(productos, botonesCompra, inputSearch, contenedores)
buscarPorBoton(productos,botonesCompra,inputSearch,botonBuscar,contenedores)
filtrar(botonFiltrar,dropdown,selectElement,contenedores,productos)