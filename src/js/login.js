export default () => {

    const form = document.querySelector('#form'),
        email = document.querySelector('#email'),
        password = document.querySelector('#password'),
        loginBox = document.querySelector('.login'),
        appBox = document.querySelector('#app');

    form.addEventListener('submit', () => {
        event.preventDefault();

        const xhr = new XMLHttpRequest;

        xhr.open('POST', 'https://reqres.in/api/register');

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(
            JSON.stringify({
                email: email.value,
                password: password.value,
            })
        );

        xhr.onload = function () {
            const statusType = +String(this.status)[0];

            if (statusType == 2) {
                console.log(loginBox);
                console.log(appBox);
                loginBox.classList.remove('open');
                appBox.classList.add('open');
            }
        };
    });


}




// [{
//     name: 'TASD110.1AC1÷TASD405.2AC1'
//     type: B
// }]