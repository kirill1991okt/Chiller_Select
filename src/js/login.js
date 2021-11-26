const form = document.querySelector('#submitBtn');

form.addEventListener('submit', () => {
    const xhr = new XMLHttpRequest;

    xhr.open('POST', 'ссылку напиши нормальную');

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(
        JSON.stringify({
            email: email.value,
            password: password.value,
        })
    );

    xhr.onload = function (){
        const statusType = +String(this.status)[0];

        if(statusType == 2){
            //должны перейти на страницу подбора
        }
    }
})