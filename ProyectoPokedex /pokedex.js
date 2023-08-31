//Con esta funcion se busca el pokemon por su numero en la pokedex, la funcion devuelve una promesa
const BuscarPokemon = function(N_pokedex){
    return new Promise(function(resolve,reject){
        const url = "https://pokeapi.co/api/v2/pokemon-species/"+N_pokedex+"/";
        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(datos){
            resolve(datos);
        })
        .catch(function(err){
            reject(err);
        });
    });
}

//Con esta funcion se busca la informacion del pokemon por medio de su nombre, devuelve una promesa
const BuscarInfoPokemon = function(pokemon){
    return new Promise(function(resolve,reject){
        const url = "https://pokeapi.co/api/v2/pokemon/"+pokemon;
        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(datos){
            resolve(datos);
        })
        .catch(function(err){
            reject(err);
        });
    });
}

//Este es el constructor principal de los pokemon, la cual es una funcion asincrona, aqui se hace el llamado
//de las funciones para buscarPokemon y BuscarInfoPokemon, la funcion devuelve los datos del pokemon
const Pokemon = async function(num){
    const Poke = await BuscarPokemon(num);
    let nombre = Poke.name.toUpperCase();
    const infoPoke = await BuscarInfoPokemon(nombre.toLowerCase());
    let descripcion = Poke.flavor_text_entries[2].flavor_text.replace(/\n/g, ' ').replace(/<br>/g, ' ');
    let sprite = infoPoke.sprites.other["official-artwork"].front_default;
    let tipo1 = infoPoke.types[0].type.name;
    let tipo2 = "";
    try {
        tipo2 = infoPoke.types[1].type.name;
    } catch (error) { }
    let indexpoke = infoPoke.id;
    let especie = infoPoke.species.name;
    let altura = infoPoke.height;
    let peso = infoPoke.weight;
    let habilidades = infoPoke.abilities.map(ability => ability.ability.name);
    let movimientos = infoPoke.moves.map(move => move.move.name); // Obtener los nombres de los movimientos
    let evolucion = await BuscarInfoPokemon(indexpoke); // Obtener la información de evolución

    return {
        nombre,
        descripcion,
        sprite,
        tipo1,
        tipo2,
        indexpoke,
        especie,
        altura,
        peso,
        habilidades,
        movimientos,
        evolucion
    };
}


//Funcion para colorear el fondo del pokemon dependiendo de su tipo principal
const asignarColor = function(tipo){
    switch (tipo) {
        case "grass":
            return "#78C850";

        case "fire":
            return "#F05030";

        case "water":
            return "#3899F8";

        case "steel":
            return "#A8A8C0";
        
        case "bug":
            return "#A8B820";
        
        case "dragon":
            return "#7860E0";
        
        case "electric":
            return "#F8D030";
        
        case "ghost":
            return "#6060B0";
        
        case "ice":
            return "#58C8E0";
        
        case "fighting":
            return "#A05038";
        
        case "normal":
            return "#A8A090";
        
        case "psychic":
            return "#F870A0";
        
        case "rock":
            return "#B8A058";
        
        case "dark":
            return "#7A5848";
        
        case "fairy":
            return "#E79FE7";
        
        case "ground":
            return "#E9D6A4";
        
        case "poison":
            return "#B058A0";
        
        case "flying":
            return "#98A8F0";
    
        default:
            return "#FFFFFF";
    }
}

let ListaPokemon = [];

//Funcion que genera la pokedex y crea los 151 pokemon
const crearPokedex = async function(num){
    const promises = [];
    const lista = document.getElementById("listaUL");   //El ul donde estan todos los pokemon

    //for para crear los pokemon que reciba el parametro num
    for (let index = 1; index <= num; index++) {

        //Se crea un li para agregar a la lista
        const nuevoLi = document.createElement("li");
        nuevoLi.id = "NP"+index;
        nuevoLi.className="itemPok ";
        lista.appendChild(nuevoLi);

        //Se crea un ancla que abrira la informacion completa del pokemon
        const nuevaAncla =  document.createElement("a");
        nuevaAncla.className = "normal";
        nuevoLi.appendChild(nuevaAncla);

        //figura sremoveClass("card_inactive");vg del fondo del pokemon
        const nuevoSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        nuevoSVG.setAttribute("viewBox","0 0 80 76");
        nuevoSVG.setAttribute("x","0px");
        nuevoSVG.setAttribute("y","0px");
        nuevaAncla.appendChild(nuevoSVG);

        

        //Sprite del pokemon
        const nuevaImg = document.createElement("img");
        nuevaImg.className = "Sprites";
        nuevaImg.id = "Sprite"+index ;

        
        
        nuevaAncla.appendChild(nuevaImg);
        
        const nuevoDivInfo = document.createElement("div");
        nuevoDivInfo.className = "info";
        nuevoLi.appendChild(nuevoDivInfo);

        const nuevoh2 = document.createElement("h2");
        nuevoh2.id = "N_pok"+index;
        nuevoDivInfo.appendChild(nuevoh2);

        const nuevoh3 = document.createElement("h3");
        nuevoh3.id = "Poke"+index;
        nuevoDivInfo.appendChild(nuevoh3);

        const nuevoP = document.createElement("p");
        nuevoP.id = "Desc"+index;
        nuevoDivInfo.appendChild(nuevoP);

        const promise = Pokemon(index).then(function(pokemon){
            let idpoke = document.getElementById("N_pok"+index);
            let nombre = document.getElementById("Poke"+index);
            let descripcion = document.getElementById("Desc"+index);
            let imagen = document.getElementById("Sprite"+index);

            ///
            let especie = document.createElement("p"); // Agregamos un párrafo para la especie
            let altura = document.createElement("p"); // Agregamos un párrafo para la altura
            let peso = document.createElement("p");   // Agregamos un párrafo para el peso
            let habilidades = document.createElement("p"); // Agregamos un párrafo para las habilidades
            let movimientos = document.createElement("p"); // Agregamos un párrafo para los movimientos
            //let evolucion = document.createElement("p"); // Agregamos un párrafo para la evolución
            ///
        
            idpoke.innerText = "#"+pokemon.indexpoke;
            nombre.innerText = pokemon.nombre;
            descripcion.innerText = pokemon.descripcion;
            imagen.src = pokemon.sprite;
            /////
            especie.innerText = "Especie: " + pokemon.especie; // Mostrar especie
            altura.innerText = "Altura: " + pokemon.altura;    // Mostrar altura
            peso.innerText = "Peso: " + pokemon.peso;          // Mostrar peso
            habilidades.innerText = "Habilidades: " + pokemon.habilidades.join(", "); // Mostrar habilidades
            movimientos.innerText = "Movimientos: " + pokemon.movimientos.join(", "); // Mostrar habilidades
            //evolucion.innerText = "Evolucion: " + pokemon.evolucion;          // Mostrar evolucion
            /////
            nuevaAncla.style.backgroundColor = asignarColor(pokemon.tipo1);

            return pokemon;
        });
        promises.push(promise);
    }

    const results = await Promise.all(promises);
    ListaPokemon = results;
};

let CantPoke = 150;
crearPokedex(CantPoke);

const getStats = (pokemon) => {
    let stats =pokemon.stats.map((stat) =>{
        return {
            value : stat.base_stat,
            name : (stat.stat.name).replaceAll("-", " ")
        }
    })

    let fra = "";
    stats.forEach((stat) => {
        fra += `
        <div class="stat flex">
            <span>${stat.name}</span>
            <span class="flex">
                <span class="value">${stat.value}</span>
                <div class="bar">
                    <div class="progress" style="width: ${(stat.value)*(100/180)}%"></div>
                </div>
            </div>
        </div>
    `;
    });
    return fra;
};

document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= CantPoke; i++) {
        document.getElementById("NP"+i).onclick = function(){
            let tarjeta = document.getElementById("contenedor_tarjeta");
            let nuevoTituloTarjeta = document.getElementById("tarjeta_title");
            let imgPoke = document.getElementById("tarjeta_img");
            let infoTarjeta = document.getElementById("tarjeta_info"); 
            let mueves = document.getElementById("moviendo"); 
            //let evo = document.getElementById("evolu"); 
            let estadisticas = document.getElementById("estadisticas");

            if(tarjeta.className.includes("tarjeta_inactive")){
                
                tarjeta.className = tarjeta.className.replace("tarjeta_inactive","");
                nuevoTituloTarjeta.textContent = ListaPokemon[i-1].nombre;
                imgPoke.src = ListaPokemon[i-1].sprite;

                ///////////////
                  infoTarjeta.innerHTML = `
                  <p>Especie: ${ListaPokemon[i-1].especie}</p>
                  <p>Altura: ${ListaPokemon[i-1].altura/10} metros</p>
                  <p>Peso: ${ListaPokemon[i-1].peso/10} Kilogramos</p>
                  <p>Habilidades: ${ListaPokemon[i-1].habilidades.join(", ")}</p>
              `;
            
                ///////////////////
                mueves.innerHTML = `
                <p>Movimientos: <ul><li>${ListaPokemon[i-1].movimientos.join("</li><li>")}</ul></p>
            `;
            estadisticas.innerHTML= getStats(ListaPokemon[i-1].evolucion);
            }
            else{
                tarjeta.className += "tarjeta_inactive";
            }
            }; 

    }
    
    
});
  
// Agrega  la línea que maneja el evento de clic en los botones
const botonesHeader = document.querySelectorAll(".btn-header");

botonesHeader.forEach(boton => boton.addEventListener("click", async (event) => {
    const botonId = event.currentTarget.id;

    const listaPokemon = document.getElementsByClassName("itemPok");
    //listaPokemon.innerHTML = ""; // Limpia la lista antes de mostrar nuevos Pokémon

    for (let i = 0; i < ListaPokemon.length; i++) {
        const pokemon = ListaPokemon[i];

        if(listaPokemon[i].className.includes("tarjeta_inactive")){
            listaPokemon[i].className = listaPokemon[i].className.replace("tarjeta_inactive"," ");
        }

        if(botonId === "ver-todos" || pokemon.tipo1 === botonId || pokemon.tipo2 === botonId){
            listaPokemon[i].className = listaPokemon[i].className.replace("tarjeta_inactive"," ");
        }
        else{
            listaPokemon[i].className += " tarjeta_inactive";
        }
        
        /*
        // Verifica si el botón "Ver todos" está presionado o si el tipo del Pokémon coincide con el botón presionado
        if (botonId === "ver-todos" || pokemon.tipo1 === botonId || pokemon.tipo2 === botonId) {
            // Crea los elementos necesarios para mostrar el Pokémon y agrega los datos
            const nuevoLi = document.createElement("li");
            const nuevaAncla = document.createElement("a");
            const nuevoImg = document.createElement("img");
            const nuevoDivInfo = document.createElement("div");
            const idpoke = document.createElement("h2");
            const nombre = document.createElement("h3");
            const descripcion = document.createElement("p");
            
            nuevoLi.id = "NP" + (i + 1);
            nuevoLi.className = "itemPok";
            listaPokemon.appendChild(nuevoLi);

            nuevaAncla.className = "normal";
            nuevoLi.appendChild(nuevaAncla);

            nuevoImg.className = "Sprites";
            nuevoImg.src = pokemon.sprite;
            nuevaAncla.appendChild(nuevoImg);

            nuevoDivInfo.className = "info";
            nuevoLi.appendChild(nuevoDivInfo);

            idpoke.innerText = "#" + pokemon.indexpoke;
            nombre.innerText = pokemon.nombre;
            descripcion.innerText = pokemon.descripcion;

            nuevoDivInfo.appendChild(idpoke);
            nuevoDivInfo.appendChild(nombre);
            nuevoDivInfo.appendChild(descripcion);

            // Cambia el color de fondo del ancla según el tipo del Pokémon
            nuevaAncla.style.backgroundColor = asignarColor(pokemon.tipo1);
        }*/
    }
    console.log(listaPokemon);
}));