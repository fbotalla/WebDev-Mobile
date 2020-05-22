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
        // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
     
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
        // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
        const childrenArray = Array.from(this.parentElement.children);
        childrenArray.forEach(child => {
          child.addEventListener('touchend', e => {
            // why currentTarget instead of target?
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