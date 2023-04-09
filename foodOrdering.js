const mockData = [
  {
    name: "Subway(MCF)",
    id: 20423,
    location: "udyog vihar",
    rating: 4.2,
    eta: 25,
    tags: ["American", "Fast Food"],
    img: "./images/1.png"
  },
  {
    name: "Prince Ki Rasoi",
    id: 27213,
    location: "Ramada Hotel, Huda City",
    rating: 3.8,
    eta: 30,
    tags: ["North Indian", "Chinese", "Mughlai", "Fast Food"],
    img: "./images/2.jpg"
  },
  {
    name: "Aggarwal Sweets & Restaurant",
    id: 52778,
    location: "Near Jain Dharamshala, Huda City",
    rating: 3.4,
    eta: 25,
    tags: ["North Indian", "Chinese", "Sweets"],
    img: "./images/3.jpg"
  },
  {
    name: "Rasoi",
    id: 13018,
    location: "Near Hanuman Mandir, Sector-14",
    rating: 3.9,
    eta: 50,
    tags: ["Indian", "Chinese", "North Indian"],
    img: "./images/4.jpg"
  },
  {
    name: "Fork with Sticks",
    id: 1015,
    location: "DLF Phase 4, New DLF Phase 4",
    rating: 4.0,
    eta: 44,
    tags: ["Chinese", "Fast Food"],
    img: "./images/5.jpg"
  },
  {
    name: "South Store",
    id: 23893,
    location: "sector 14 Market, Sector-14",
    rating: 4.1,
    eta: 53,
    tags: ["American", "South Indian"],
    img: "./images/6.jpg"
  },
  {
    name: "Chinese Corner",
    id: 30361,
    location: "Sushant Lok, DLF Phase 4",
    rating: 4.1,
    eta: 47,
    tags: ["Chinese", "Thai"],
    img: "./images/7.jpg"
  },
  {
    name: "Sandburg Shakes",
    id: 63660,
    location: "Sushant Lok, New DLF Phase 4",
    rating: 4.4,
    eta: 51,
    tags: ["Cafe", "Italian", "Healthy Food"],
    img: "./images/8.jpg"
  },
  {
    name: "Royal Spice",
    id: 29123,
    location: "Near Unitech Cyber Park, sohna road",
    rating: 4.1,
    eta: 31,
    tags: ["Indian", "Chinese", "Continental", "Snacks"],
    img: "./images/9.jpg"
  },
  {
    name: "Madurai Meenakshi Bhawan",
    id: 26761,
    location: "Sector 14 Market, Sector-14",
    rating: 4.2,
    eta: 25,
    tags: ["American", "South Indian"],
    img: "./images/10.jpg"
  },
  {
    name: "Koolchas",
    id: 68159,
    location: "Dlf Phase 1, DLF Phase 4",
    rating: 4.3,
    eta: 53,
    tags: ["North Indian", "Fast Food"],
    img: "./images/11.jpg"
  },
  {
    name: "Punjabi Chaap Corner",
    id: 49213,
    location: "Sector 14, Sector-14",
    rating: 3.8,
    eta: 52,
    tags: ["North Indian", "Fast Food"],
    img: "./images/12.jpg"
  },
  {
    name: "Burger BC",
    id: 21340,
    location: "Near Gold Souk Mall, DLF Phase 4",
    rating: 4.1,
    eta: 57,
    tags: ["Fast Food", "Continental"],
    img: "./images/13.jpg"
  },
  {
    name: "Mucchad's SamosaZz & More",
    id: 17281,
    location: "Maruti Vihar, DLF Phase 4",
    rating: 4.1,
    eta: 43,
    tags: ["Mughlai", "North Indian", "Street Food", "Fast Food"],
    img: "./images/14.jpg"
  },
  {
    name: "The Burger Homes",
    id: 63913,
    location: "Huda City, Huda City",
    rating: 3.9,
    eta: 45,
    tags: ["North Indian", "Fast Food"],
    img: "./images/15.jpg"
  },
  {
    name: "STANLEY KA DIBBA",
    id: 51766,
    location: "Chakkarpur, DLF Phase 4",
    rating: 3.7,
    eta: 41,
    tags: ["American", "Thalis", "Indian", "Fast Food"],
    img: "./images/16.jpg"
  }
];

const restaurantsElem = document.querySelector('.restaurants');
const inputBox = document.getElementById('search');
const errorMessage = document.querySelector('.errorNotify');

let hotelLists = mockData;

const getHotelCard = hotel => {
    let a = JSON.parse(localStorage.getItem('favourites'));
    let favIconClass;
    if (a !== null) {
        favIconClass = (a.find(fav => fav.id == hotel.id)) ? "fav-id-red" : "fav-id";
    } else {
        favIconClass = "fav-id"
    }
    return `
        <div class='hotel-card'>
            <button onclick="markAsFavourite(this, ${hotel.id})" id=${favIconClass} class="favourite"></button>
            <div class='hotel-image'>
                <img src= ${hotel.img} />
            </div>
            <div class="hotel-description">
                <div class="hotel-name">${hotel.name}</div>
                <div class="hotel-tags">${hotel.tags}</div>
                <div style="padding: 0 10px;">
                    <span class="hotel-location fa fa-star checked">${hotel.rating}</span>
                    <span class="hotel-eta">${hotel.eta} Mins</span>
                </div>
            </div>
        </div>
    `
}

const generateRestaurantList = data => {
  return Object.values(data).map(hotel => getHotelCard(hotel));
}

// display hotels

const displayAllHotels = () => {
  
    restaurantsElem.innerHTML = generateRestaurantList(mockData);
    // getData()
    // .then(resp => {
    //     hotelLists = resp;
    //     restaurantsElem.innerHTML = generateRestaurantList(resp).join('');
    // })
    // .catch(error => errorMessage.innerHTML = 'Something bad happened!! We are working on it');
};

displayAllHotels();

const searchResult = () => {
  console.log("in input box",inputBox.value)
    let filteredList = hotelLists.filter(hotel => {
        return hotel.tags.toString().toLowerCase().indexOf(inputBox.value.toLowerCase()) > -1 || hotel.name.toString().toLowerCase().indexOf(inputBox.value.toLowerCase()) > -1;
    });
    restaurantsElem.innerHTML = (filteredList.length == 0)? "No Results Found !!" : generateRestaurantList(filteredList).join('');
}

// debouncing
let debounce = (fn, delay) => {
    let timeout;
    console.log("timeout", timeout, delay)
    return function () {
       clearTimeout(timeout);
       //console.log("before", timeout)
       timeout = setTimeout(()=> fn(), delay)
       //setTimeout(()=> fn(), delay)
       //console.log("after",timeout)
    }
}
let search = debounce(searchResult, 4000);

document.addEventListener('input', search);

const markAsFavourite = (ref, id) => {
    if(!localStorage.getItem('favourites')){
        let a = [];
        localStorage.setItem('favourites', JSON.stringify(a));
    }

    let a= [];
    a = JSON.parse(localStorage.getItem('favourites'));
    let filteredList = hotelLists.filter(hotel => hotel.id == id);
    if(!a.find(hotel => hotel.id == id)){
        a.push(...filteredList);
        ref.setAttribute('style', 'background: red;');
    } else {
        let index = a.indexOf(a.find(hotel => hotel.id == id));
        a.splice(index,1);
        ref.setAttribute('style','background: white;');
    }
    localStorage.setItem('favourites', JSON.stringify(a));
}

const sortby = e =>{
    if(e.target.value == 'rating'){
        let sortByRatingList = hotelLists.sort((a,b) => b.rating - a.rating);
        restaurantsElem.innerHTML = generateRestaurantList(sortByRatingList).join('');
    }else if(e.target.value == 'eta'){
        let sortByETAList = hotelLists.sort((a,b) => a.eta - b.eta);
        restaurantsElem.innerHTML = generateRestaurantList(sortByETAList).join('');
    }
}

document.querySelector('.show-fav').addEventListener('click', ()=>{
    let showFavourites = JSON.parse(localStorage.getItem('favourites'));
    restaurantsElem.innerHTML = (showFavourites.length == 0)? "No Favourite Selected Yet!!" : generateRestaurantList(showFavourites).join('');
})