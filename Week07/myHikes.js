const hikes = [
    {
        title: 'Bechler Falls',
        image : './image.png',
        distance: '3 miles',
        difficulty: 'easy'
    },

    {
        title: 'Teton Canyon',
        image : './image.png',
        distance: '3 miles',
        difficulty: 'easy'
    },

    {
        title: 'Denanda Falls',
        image : './image.png',
        distance: '7 miles',
        difficulty: 'moderate'
    },
]

export default class Hikes{


    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
      }

    getHikes(){
        return hikes;
    }


    showHikeList() {
        this.parentElement.innerHTML = '';
        renderHikeList(this.parentElement, this.getHikes());
        this.addHikeListener();
        
      }

    addHikeListener() {
        const childrenArray = Array.from(this.parentElement.children);
        childrenArray.forEach(child => {
          child.addEventListener('touchend', e => {          
         this.showOneHike(e.currentTarget.dataset.name);
          });
        });
      }
    
}

function renderHikeList(parent, hikes) {
    hikes.forEach(hike => {
      parent.appendChild(displayHike(hike));
    });
  }

  function  displayHike(hike){
    const item = document.createElement('li');
    item.innerHTML = `
    <h3>${hike.title}</h3> 
    <div class = 'container'>
    <div class ='image'><image src="${hike.image}" alt ='imageHike'></div>
    <div class= 'text'>
        <p>Distance: ${hike.distance}
        <p>Difficulty: ${hike.difficulty}
    </div>
    </div>
    `
    return item
}