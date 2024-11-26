import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import iconResolve from '../img/bi-check2-circle.png';
// import iconReject from '../img/bi-x-octagon.png';


iziToast.settings({
  position: 'topRight',
});

const form = document.querySelector('.form');

form.classList.add('container');

const labelDelay = form.firstElementChild;

labelDelay.classList.add('delay-label');

const handleFormSubmit = e => {
  e.preventDefault();

  const delayInput = e.target.elements.delay;
  const selectedRadioButon = document.querySelector(
    'input[name="state"]:checked'
  );
  let valueRadioButton = '';

  if (selectedRadioButon) {
    valueRadioButton = selectedRadioButon.value;
  }

  const makePromise = ({ delay, shouldResolve }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve === 'fulfilled') {
          resolve(`Fulfilled promise in ${delay} ms`);
        } else {
          reject(`Rejected promise in ${delay} ms`);
        }
      }, delay);
    });
  };

  makePromise({ delay: delayInput.value, shouldResolve: valueRadioButton })
    .then(value =>
      iziToast.success({
        // iconUrl: iconResolve,
        iconColor: '#fff',
        imageWidth: 24,
        messageColor: '#fff',
        title: 'OK',
        titleColor: '#fff',
        message: value,
      })
    )
    .catch(error =>
      iziToast.error({
        // iconUrl: iconReject,
        iconColor: '#fff',
        imageWidth: 24,
        messageColor: '#fff',
        title: 'Error',
        titleColor: '#fff',
        message: error,
      })
    );
};

form.addEventListener('submit', handleFormSubmit);