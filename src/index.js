import './styles/style.scss';
import navigation from './js/navigation';
import calculate from './js/calculate';
import selectFamily from './js/selected';
import login from './js/login';

navigation();
calculate();
selectFamily();
login();


// window.onhashchange = function (ev) {
//     ev.preventDefault();
//     console.log("#changed", window.location.hash);
// };

window.onload = function (ev) {
  ev.preventDefault();
};

// window.addEventListener("hashchange", ev => {
//     ev.preventDefault();
//     console.log(ev.newURL)
// });
//handleUrl(window.location.href);
document.body.addEventListener('click', (ev) => {
  if (!ev.target.matches('a')) {
    return;
  }
  ev.preventDefault();
  let url = ev.target.getAttribute('href');
  window.location.hash = url;
});

////https://www.youtube.com/watch?v=0jPwrj5f8no