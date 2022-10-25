"use strict";


/**

Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
x - Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore,
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
*Non è necessario creare date casuali*
*Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)*
x - Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
x - Milestone 3- Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
BONUS
x 1. Formattare le date in formato italiano (gg/mm/aaaa)
x 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
x 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

 */



const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

//funzione per formattare la data
const creatorData = function (value) {
    let newArray = value.split('-').reverse().join("-");
    return newArray;
}

const myContainer = document.getElementById('container');
const postLiked = [];

//funzione che se non trova l'immagine dell'autore la sostituisce con le iniziali
function getProfile (profile){
    if(profile.image){
       return `<img class="profile-pic" src="${profile.image}" alt="${profile.name}">`  
    }
    else {
        let initial = onlyCapitalLetters(profile.name)
        return `
         <div class="profile-pic-default">
         <span>${initial}</span>
         </div>
        `
    }
}

const drawPost = function () {
    posts.forEach((value, index) => {
        const post = document.createElement('div');
        post.classList.add('post');
            post.innerHTML = `
            <div class="post__header">
                  <div class="post-meta">                    
                      <div class="post-meta__icon">
                          ${getProfile(value.author)}                 
                      </div>
                      <div class="post-meta__data">
                          <div class="post-meta__author">${value.author.name}</div>
                          <div class="post-meta__time">${creatorData(value.created)}</div>
                      </div>                    
                  </div>
              </div>
              <div class="post__text">${value.content}</div>
              <div class="post__image">
                  <img src="${value.media}" alt="media">
              </div>
              <div class="post__footer">
                  <div class="likes js-likes">
                      <div class="likes__cta">
                          <a class="like-button  js-like-button" href="#" data-postid="${value.id}">
                              <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                              <span class="like-button__label">Mi Piace</span>
                          </a>
                      </div>
                      <div class="likes__counter">
                          Piace a <b id="like-counter-${value.id}" class="js-likes-counter">${value.likes}</b> persone
                      </div>
                  </div> 
              </div>
            `
        myContainer.append(post);
    })
}



drawPost();




const btnLikes = Array.from(document.querySelectorAll('.like-button'));
    
    
btnLikes.forEach((value, index) => {
    value.addEventListener('click', function(e){
        // console.log(e);
        //evito che venga lanciato l'evento di default (href="#") del bottone
        e.preventDefault(); 

        //aggiungo/rimuovo la classe sul bottone like al click 
        value.classList.toggle('like-button--liked');

        //prendo l'id del post dal data set
        const postId = parseInt(value.dataset.postid)

        //prendo l'elemento contenitore del numero di likes 
        const likes = document.getElementById('like-counter-'+postId);

        //recupero dall'array dei post l'indice del post corrente
        const postIndex = posts.findIndex((value)=>{
            return value.id === postId;
        })

        if(postIndex === -1) return;
        

        //recupero dall'array dei post che mi piaciono l'indice se c'è
        const likeIndex = postLiked.indexOf(postId)


        //controllo se l'indice trovato è o meno -1
        if(likeIndex !== -1){
            //ho trovato l'indice quindi decremento i like
            posts[postIndex].likes -= 1;
            postLiked.splice(likeIndex, 1);
        }
        else{
            //il valore di ritorno era -1 quindi l'id non era presente nell'array dei like 
            //incremento i like e lo pusho nell'array
            posts[postIndex].likes += 1;
            postLiked.push(postId);
            
        }
        // stampo il nuovo valore del numero dei like nell'html
        likes.innerHTML = posts[postIndex].likes;
    })
})


 