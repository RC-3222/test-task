const body = document.body;

// --------------- Burger Stuff ---------------
const openMenu = () => body.classList.add('menu-opened');
const closeMenu = () => body.classList.remove('menu-opened');

document.querySelector('.backdrop').addEventListener('click', closeMenu);

document.querySelector('.burger-menu').addEventListener('click', function (event) {
    if (event.target.classList.contains('burger-menu__link')) {
        closeMenu();
    }
});

document.querySelector('.burger-btn').addEventListener('click', openMenu);

document.querySelector('.burger-menu__close-btn').addEventListener('click', closeMenu);


// --------------- Form Stuff ---------------
const form = document.querySelector('.section-contact__form');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.querySelector('.name-error');
const emailError = document.querySelector('.email-error');
const messageError = document.querySelector('.message-error');

const handleRequest = async (data) => {
    try {
        const response = await fetch('some-api-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // ...
    } catch (err) {
        throw err
    }
}

const validateInputs = () => {
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    const isNameValid = nameValue !== '';
    const isEmailValid = (
        emailValue !== ''
        && !!emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    );
    const isMessageValid = messageValue !== '';

    return { isNameValid, isEmailValid, isMessageValid };
}

const validateForm = () => {
    const { isNameValid, isEmailValid, isMessageValid } = validateInputs();

    // показ или скрытие ошибок
    if (isNameValid) nameError.classList.add('hidden');
    else nameError.classList.remove('hidden');

    if (isEmailValid) emailError.classList.add('hidden');
    else emailError.classList.remove('hidden');

    if (isMessageValid) messageError.classList.add('hidden');
    else messageError.classList.remove('hidden');

    return (isNameValid && isEmailValid && isMessageValid);
};


form.addEventListener('submit', function (event) {
    event.preventDefault(); // для предотвращения перезагрузки страницы по умолчанию

    const isFormValid = validateForm();

    if (!isFormValid) {
        //alert('Некорректные данные, запрос не отправлен');
        return;
    }

    // сброс введённых значений
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';

    // имитация запроса
    handleRequest({
        name: nameValue,
        email: emailValue,
        message: messageValue
    }).catch((err) => console.error(err));
})