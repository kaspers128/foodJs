import {showModal, hideModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    //Forms
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы свяжемся с вами!',
        failure: 'Что-то пошло не так!',
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            //const request = new XMLHttpRequest();
            //request.open('POST', 'server.php');

            //request.setRequestHeader('Content-type', 'application/json');

            //метод XMLHttpRequest считается устаревшим и вместо него используют Fetch
            //при передаче данных на сервер можно использовать напрямую экземпляр FormData или же
            //перевести этот объект в json. Все зависит от backend.
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                
                statusMessage.remove();
            })
            .catch(()=>{
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            //request.send(json);
            /*request.addEventListener('load', () => {
                if (request.status === 200){
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            });*/

        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        showModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            hideModal('.modal');
        }, 4000);        
    }
}

export default forms;