# Curso Backend - Coderhouse

## Sobre este proyecto

Elaboración de una API para ecommerce basada en NodeJs y Express. La misma consta de gestión de usuarios, productos, carrito de compras y notificaciones de ordenes de compra. Dicho proyecto se divide en capas (Server, Routes, Controllers, Services, Persistances).
Para el entorno de Desarrollo se realiza la persistencia en MongoDB Local.
Para el entorno de Producción se realiza la persistencia en MongoDB Atlas (Cloud).

### Generar esqueleto de archivos .env

Generar el esqueleto de archivos .env a partir del ejemplo.
Desde la consola, posicionarse en la carpeta y escribir:


```js
cp env.example .env
cp development.env.example development.env
cp production.env.example production.env
```

### Instalar dependencias

Desde la consola, situarse en la carpeta del proyecto y ejecutar:

```js
npm i
```

### Modos de Ejecución

* Entorno de Producción
```js
npm run prod-start
```

* Entorno de Desarrollo
```js
npm run dev-start
```

A su vez, desde el archivo .env en la constante EXECUTION_MODE, se puede fijar:
* "fork"     -> Ejecuta el proyecto en un solo núcleo
* "cluster"  -> Ejecuta el proyecto en multi-núcleo

## Dependencias

* bcrypt
* connect-mongo
* cookie-parser
* cors
* dotenv
* express
* express-fileupload
* express-handlebars
* express-session
* express-validator
* minimist
* moment
* mongoose
* nodemailer
* passport
* passport-local
* twilio
* winston

## Dependencias Globales

* nodemon


## METODOS

| Metodos | Routes                                          | Descripción                                                              			|
| :---    |     :---                                        | :---                                                                			|
| GET     | /api/productos                                  | Devuelve todos los productos                                       			|
| GET     | /api/productos/:id 		                    | Devuelve un producto según su id                            	 			|
| POST    | /api/productos                                  | Recibe y agrega un producto, y lo devuelve con su id asignado	 			|
| PUT     | /api/productos/:id       		            | Recibe y actualiza un producto según su id		         			|
| DELETE  | /api/productos/:id 		                    | Elimina un producto según su id		                         			|
| POST    | /api/carrito/		    		    | Crea un carrito y devuelve su id					 			|
| DELETE  | /api/carrito/:id		                    | Vacía un carrito y lo elimina	                                 			|
| GET     | /api/carrito/:id/productos    		    | Permite listar todos los productos guardados en el carrito por su id  	 		|
| POST    | /api/carrito/:idCart/productos/:idProd   		    | Para incorporar productos a un carrito idCart = id carrito, idProd = id producto 		|
| DELETE  | /api/carrito/:idCart/productos/:idProd	    | Eliminar un producto del carrito por su id (idCart) de carrito y de producto (idProd) 	|
| POST	  | /login					    | Para iniciar sesión con un usuario registrado					 	|
| POST	  | /signup				    | Para registrar un usuario nuevo							 	|
| GET	  | /login/error				    | Se obtiene al ingresar credenciales no válidas en el POST de loggin		 	|
| GET	  | /signup/error				    | Se obtiene al no poder concretar el registro de un nuevo usuario			 	|
| GET	  | /					    | Se obtiene al realizar un login exitoso	|
| GET	  | /logout					    | Permite cerrar una sesion activa						 		|
| POST	  | /order				    | Continua el proceso de confirmar la compra del carrito de la sesion activa		|

<br>

## REQUESTS/RESPONSES

<details>
<summary>GET <b>/api/productos</b></summary> 

```js
GET http://localhost:8080/api/productos
```
### Ejemplo respuesta

```json
[
	{
        "id": 1,
        "title": "Monitor 24 ips",
        "price": 55000,
        "description": "Monitor Gamer Samsung LF24T350FHLCZB 24",
        "code": "60123",
        "thumbnail": "https://images.fravega.com/f1000/32397e21c5240c13f2d32ad3842cd3e8.jpg",
        "stock": 12
    },
    {
        "id": 2,
        "title": "Graphic Card GeForce",
        "price": 100000,
        "description": "Graphic Card GeForce",
        "code": "31193",
        "thumbnail": "https://www.soscomputacion.com.ar/22872-thickbox_default/placa-de-video-nvidia-rtx-2060-6gb-asus-rog-strix-evo-v2-gaming-gddr6.jpg",
        "stock": 12
    }
]
```
</details>
<br>

<details>
<summary>GET <b>/api/productos/:id</b></summary> 

```js
GET http://localhost:8080/api/productos/1
```
### Ejemplo respuesta

```json
{
        "id": 1,
        "title": "Monitor 24 ips",
        "price": 55000,
        "description": "Monitor Gamer Samsung LF24T350FHLCZB 24",
        "code": "60123",
        "thumbnail": "https://images.fravega.com/f1000/32397e21c5240c13f2d32ad3842cd3e8.jpg",
        "stock": 12
}
```
</details>
<br>

<details>
<summary>POST <b>/api/productos/</b></summary> 

```js
POST http://localhost:8080/api/productos/
```
### Ejemplo solicitud

```json
{
	"title": "Mouse MSI",
	"description": "Mouse MSI Intercepto DS300",
	"code": 42723,
	"thumbnail": "https://asset.msi.com/resize/image/global/product/product_9_20180328133817_5abb2a490ec83.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png",
	"price": 20000,
	"stock": 20
}
```

### Ejemplo respuesta

```json
{
	"id": 6,
	"title": "Mouse MSI",
	"price": 20000,
	"description": "Mouse MSI Intercepto DS300",
	"code": "42723",
	"thumbnail": "https://asset.msi.com/resize/image/global/product/product_9_20180328133817_5abb2a490ec83.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png",
	"stock": 20
}
```
</details>
<br>


<details>
<summary>PUT <b>/api/productos/:id</b></summary> 

```js
PUT http://localhost:8080/api/productos/1
```
### Ejemplo solicitud

```json
{
    "title": "Monitor 24 ips",
    "price": 55000,
    "description": "Monitor Gamer Samsung LF24T350FHLCZB 24",
    "code": "60123",
    "thumbnail": "https://images.fravega.com/f1000/32397e21c5240c13f2d32ad3842cd3e8.jpg",
    "stock": 5
}
```

### Ejemplo respuesta

```json
{
	"id": 1,
	"title": "Monitor 24 ips",
	"price": 55000,
	"description": "Monitor Gamer Samsung LF24T350FHLCZB 24",
	"code": "60123",
	"thumbnail": "https://images.fravega.com/f1000/32397e21c5240c13f2d32ad3842cd3e8.jpg",
	"stock": 5
}
```
</details>
<br>


<details>
<summary>DELETE <b>/api/productos/:id</b></summary> 

```js
DELETE http://localhost:8080/api/productos/6
```

### Ejemplo respuesta

```json
{
    "error": 0,
    "message": "The product with id: 6 has been deleted"
}
```
</details>
<br>

<details>
<summary>GET <b>/api/carrito/:id/productos</b></summary> 

```js
GET http://localhost:8080/api/carrito/9/productos
```

### Ejemplo respuesta

```json
[
    {
        "id": 9,
        "products": [
            {
                "id": 4,
                "title": "Mouse MSI",
                "description": "Mouse MSI Interceptor DS200",
                "code": "42722",
                "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_933513-MLA25851197355_082017-O.webp",
                "price": 20000,
                "stock": 20,
                "qty": 1,
                "total_price": 20000,
                "_id": "644bd60d0f72e35a95aff950"
            },
            {
                "id": 5,
                "title": "Notebook MSI",
                "description": "NOTEBOOK MSI GF65 THIN I7-9750H 2.6GHZ-8GB-512GB SSD RTX2060 6GB 15.6 144HZ",
                "code": "52799",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMh6lGzOWbBeiiXzf4efJnHXgjz90HgmvFpchrrkVg1tOPN35S_SEtm8HAewjEY2RwBhk&usqp=CAU",
                "price": 300000,
                "stock": 10,
                "qty": 1,
                "total_price": 300000,
                "_id": "644bd6100f72e35a95aff956"
            },
            {
                "id": 1,
                "title": "Monitor 24 ips",
                "description": "Monitor Gamer Samsung LF24T350FHLCZB 24",
                "code": "60123",
                "thumbnail": "https://images.fravega.com/f1000/32397e21c5240c13f2d32ad3842cd3e8.jpg",
                "price": 55000,
                "stock": 12,
                "qty": 1,
                "total_price": 55000,
                "_id": "644bd6130f72e35a95aff95c"
            }
        ]
    }
]
```
</details>
<br>


<details>
<summary>POST <b>/api/carrito/</b></summary> 

```js
POST http://localhost:8080/api/carrito/
```

### Ejemplo respuesta

```json
[
    {
        "id": 20,
        "products": []
    }
]
```
</details>
<br>

<details>
<summary>DELETE <b>/api/carrito/:id</b></summary> 

```js
DELETE http://localhost:8080/api/carrito/20
```

### Ejemplo respuesta

```json
{
    "error": 0,
    "message": "The cart with id: 20 has been deleted"
}
```
</details>
<br>

<details>
<summary>POST <b>/api/carrito/:idCart/productos/:idProd </b></summary> 

```js
POST http://localhost:8080/api/carrito/9/productos/1
```

### Ejemplo respuesta

```json
[
    {
        "id": 9,
        "products": [
            {
                "id": 4,
                "title": "Mouse MSI",
                "description": "Mouse MSI Interceptor DS200",
                "code": "42722",
                "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_933513-MLA25851197355_082017-O.webp",
                "price": 20000,
                "stock": 20,
                "qty": 1,
                "total_price": 20000,
                "_id": "644bd60d0f72e35a95aff950"
            },
            {
                "id": 5,
                "title": "Notebook MSI",
                "description": "NOTEBOOK MSI GF65 THIN I7-9750H 2.6GHZ-8GB-512GB SSD RTX2060 6GB 15.6 144HZ",
                "code": "52799",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMh6lGzOWbBeiiXzf4efJnHXgjz90HgmvFpchrrkVg1tOPN35S_SEtm8HAewjEY2RwBhk&usqp=CAU",
                "price": 300000,
                "stock": 10,
                "qty": 1,
                "total_price": 300000,
                "_id": "644bd6100f72e35a95aff956"
            },
            {
                "id": 1,
                "title": "Monitor 24 ips",
                "description": "Monitor Gamer Samsung LF24T350FHLCZB 24",
                "code": "60123",
                "thumbnail": "https://images.fravega.com/f1000/32397e21c5240c13f2d32ad3842cd3e8.jpg",
                "price": 55000,
                "stock": 12,
                "qty": 1,
                "total_price": 55000,
                "_id": "644bd6130f72e35a95aff95c"
            }
        ]
    }
]
```
</details>
<br>

<details>
<summary>DELETE <b>/api/carrito/:idCart/productos/:idProd </b></summary> 

```js
DELETE http://localhost:8080/api/carrito/9/productos/1
```

### Ejemplo respuesta

```json
{
    "ok": "Product id: 1 has been removed from cart."
}
```
</details>
<br>


<details>
<summary>POST <b>/api/login </b></summary> 

```js
POST http://localhost:8080/api/login
```
### Ejemplo solicitud

```json
{
    "username": "rober__17@hotmail.com",
    "password": "rober"
}
```
	
### Ejemplo respuesta

Se muestra el html de la página principal

</details>
<br>


<details>
<summary>POST <b>/api/register </b></summary> 

```js
POST http://localhost:8080/api/register
```
### Ejemplo solicitud

```json
{
    "username": "carlos3@carlos.com",
    "password": "carlos-pass",
    "name": "Carlos3",
    "address": "av. Las Heras 7771",
    "telephone": "2215890023",
    "age": 37,
    "avatar": "https://pics.filmaffinity.com/avatar_the_way_of_water-722646748-mmed.jpg"
}
```
	
### Ejemplo respuesta

Se muestra el html de la página principal

</details>
<br>

<details>
<summary>GET <b>/api/login/error </b></summary> 

```js
POST http://localhost:8080/api/login
```
### Ejemplo solicitud

```json
{	
	"username": "wrong@username.com",
	"password": "wrong-password"
}
```
	
### Ejemplo respuesta

Se muestra el html de la página error
</details>
<br>

<details>
<summary>GET <b>/api/signup/error </b></summary> 

```js
POST http://localhost:8080/api/register
```
### Ejemplo solicitud

```json
{
    "username": "carlos3@carlos.com",
    "password": "carlos-pass",
    "name": "Carlos3",
    "address": "av. Las Heras 7771",
    "telephone": "2215890023",
    "age": 37,
    "avatar": "https://pics.filmaffinity.com/avatar_the_way_of_water-722646748-mmed.jpg"
}
```
	
### Ejemplo respuesta

Se muestra el html de la página error
</details>
<br>

<details>
<summary>GET <b>/ </b></summary> 

```js
GET http://localhost:8080/
```
	
### Ejemplo respuesta

Se muestra el html de la página principal
</details>
<br>

<details>
<summary>GET <b>/api/logout </b></summary> 

```js
GET http://localhost:8080/api/logout
```
	
### Ejemplo respuesta

Se muestra el html de la página de login
</details>
<br>

<details>
<summary>POST <b>/api/order </b></summary> 

```js
POST http://localhost:8080/api/order
```
	
### Ejemplo respuesta

```json
{
    "error": 0,
    "message": "Order Created and notifications sended"
}
```
</details>