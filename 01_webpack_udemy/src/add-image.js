import School from './school.jpg';

function addImage() {
    const img = document.createElement('img');
    img.alt = 'School';
    img.width = 300;
    img.src = School;
    const body = document.querySelector('body');
    body.appendChild(img);
}

export default addImage;