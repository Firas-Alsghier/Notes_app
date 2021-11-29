'use strict';

const addBtn = document.getElementById('add-btn');
const clear = document.getElementById('clear');
const bulletsList = document.getElementById('bullets-list');
const row = document.querySelector('.row');
const li = document.querySelectorAll('li');
const Week = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const search = document.getElementById('search');

clear.addEventListener('click', () => {

    row.innerHTML = '';

    localStorage.clear();

})

addBtn.addEventListener('click', () => {

    addBtn.style.animation = 'btn 2s ease-in-out';

    bulletsList.style.display = 'block';

})

bulletsList.addEventListener('click', (e) => {

    if (e.target.nodeName === 'LI') {

        const date = new Date();
        const dayOfWeek = Week[date.getDay()];
        const day = date.getDate();
        const year = date.getFullYear();

        const bulletColor = getComputedStyle(e.target).backgroundColor;

        const card = `
                   <div class="col-lg-4">
                        <div class="main__card" style="background: ${bulletColor};" contenteditable="true">
                            <div class="main__custom"></div>
                            <h2 class="main__card-title">
                                Title
                            </h2>
                            <hr>
                            <p class="main__info">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
                                mollitia tempore alias molestias minima cumque iure repudiandae dolorum nihil
                                doloremque?</p>
                                <div class="main__time">
                                <span contenteditable="false">${dayOfWeek} ${day}, ${year}</span>
                            </div>

                            <div class="main__check-edit-icons">
                                <div class="main__edit-icon">
                                    <i class="ph-pencil"></i>
                                </div>

                                <div class="main__check-icon">
                                    <i class="ph-check"></i>
                                </div>

                                <div class="main__remove">
                                    <i class="ph-trash"></i>
                                </div>

                            </div>
                        </div>
                    </div>
                    `

        row.insertAdjacentHTML('beforeend', card);

        localStorage.setItem('cards', row.innerHTML);

    }

})


row.addEventListener('click', (e) => {


    if (e.target.className === 'ph-check') {

        e.path[3].removeAttribute('contenteditable');

        e.path[1].style.visibility = 'hidden';

        e.path[2].querySelector('.main__edit-icon').removeEventListener('click', penEdit);

        e.path[2].querySelector('.main__remove').style.animation = '';

        localStorage.setItem('cards', row.innerHTML);

    } else if (e.target.className === 'ph-pencil') {

        const removeIcon = e.path[2].querySelector('.main__remove');

        removeIcon.style.animation = 'tr 0.9s ease-in-out forwards'

        const pencil = e.path[2].querySelector('.main__edit-icon');

        pencil.addEventListener('click', penEdit);

    } else if (e.target.className === 'ph-trash') {

        e.path[4].remove();

    }

})


function penEdit(e) {

    e.path[3].setAttribute('contenteditable', 'true');

    e.path[3].querySelector('.main__check-icon').style.visibility = 'visible';

}

if (localStorage.getItem('cards')) {

    row.innerHTML = localStorage.getItem('cards');

}


search.addEventListener('input', () => {

    const searchValue = search.value.toLowerCase();

    console.log(searchValue);

    const allCardsTitles = document.querySelectorAll('.col-lg-4');

    allCardsTitles.forEach(card => {

        let text = card.querySelector('.main__card-title').textContent;

        if (text.toLowerCase().includes(searchValue.toLowerCase())) {

            card.style.display = ''
        } else {
            card.style.display = 'none';
        }

    })

})