import School from './school.jpg';
import './school-image.scss';

class SchoolImage {
    render() {
        const img = document.createElement('img');
        img.src = School;
        img.alt = 'School';
        img.classList.add('school-image');

        const bodyDomElement = document.querySelector('body');
        bodyDomElement.appendChild(img);
    }
}

export default SchoolImage;