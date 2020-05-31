function showModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflowY = 'hidden';

    if (modalTimerId){
        clearInterval(modalTimerId);
    }
    
}

function hideModal(modalSelector){
    const modal = document.querySelector(modalSelector)
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflowY = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
     //Modal
     const modal = document.querySelector(modalSelector),
     btnsModal = document.querySelectorAll(triggerSelector);
    //Show Modal
    btnsModal.forEach(btn => {
        btn.addEventListener('click', () => showModal(modalSelector, modalTimerId) );
    });

    //Close Modal

    modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == ''){
        hideModal(modalSelector);
    }
    });

    document.addEventListener('keydown', (event) => {
    if(event.code === 'Escape' && modal.classList.contains('show')){
        hideModal(modalSelector);
    }
    });

    function showModalByScroll(){
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        showModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {showModal};
export {hideModal};