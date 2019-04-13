const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = document.querySelector('input').value;

    fetch(`http://localhost:3000/weather?address=${search}`)
        .then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        })
        .catch((e) => {
            console.log(e);
        });
});

