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
    let sprite = infoPoke.sprites.versions["generation-iii"]["firered-leafgreen"].front_default;
    let tipo1 = infoPoke.types[0].type.name;
    let indexpoke = infoPoke.id;

    return {nombre,descripcion,sprite, tipo1,indexpoke};
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

//Funcion que genera la pokedex y crea los 151 pokemon
const crearPokedex = function(num){
    const lista = document.getElementById("listaUL");   //El ul donde estan todos los pokemon

    //for para crear los pokemon que reciba el parametro num
    for (let index = 1; index <= num; index++) {

        //Se crea un li para agregar a la lista
        const nuevoLi = document.createElement("li");
        nuevoLi.className = "card [ is-collapsed ]";
        lista.appendChild(nuevoLi);

        //Se crea un ancla que abrira la informacion completa del pokemon
        const nuevaAncla =  document.createElement("a");
        nuevaAncla.className = "normal card__inner [ js-expander ]";
        nuevoLi.appendChild(nuevaAncla);

        //figura svg del fondo del pokemon
        const nuevoSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        nuevoSVG.setAttribute("viewBox","0 0 80 76");
        nuevoSVG.setAttribute("x","0px");
        nuevoSVG.setAttribute("y","0px");
        nuevaAncla.appendChild(nuevoSVG);

        //Sprite del pokemon
        const nuevaImg = document.createElement("img");
        nuevaImg.className = "Sprites";
        nuevaImg.id = "Sprite"+index;
        
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

        const nuevoDivInfoPlus = document.createElement("div");
        nuevoDivInfoPlus.className = "card__expander";
        nuevoDivInfoPlus.innerText = "Expander";
        nuevoLi.appendChild(nuevoDivInfoPlus);

        const nuevoIconCerrar = document.createElement("i");
        nuevoIconCerrar.className = "fa fa-close [ js-collapser ]";
        nuevoDivInfoPlus.appendChild(nuevoIconCerrar);

        Pokemon(index).then(function(pokemon){

            let idpoke = document.getElementById("N_pok"+index);
            let nombre = document.getElementById("Poke"+index);
            let descripcion = document.getElementById("Desc"+index);
            let imagen = document.getElementById("Sprite"+index);
        
            idpoke.innerText = "#"+pokemon.indexpoke;
            nombre.innerText = pokemon.nombre;
            descripcion.innerText = pokemon.descripcion;
            imagen.src = pokemon.sprite;
            nuevaAncla.style.backgroundColor = asignarColor(pokemon.tipo1);
        })
    }
}
crearPokedex(14);
/****************************************/
