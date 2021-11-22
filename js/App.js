'use strict';

const addBtn = document.getElementById('add-btn');
const bulletsList = document.getElementById('bullets-list');
const row = document.querySelector('.row');
const checkEditIcons = document.getElementById('check-edit-icons');
const li = document.querySelectorAll('li');
// const removeIcon = document.querySelector('.main__remove');

addBtn.addEventListener('click', () => {

    addBtn.style.animation = 'btn 2s ease-in-out';

    bulletsList.style.display = 'block';

})


bulletsList.addEventListener('click', (e) => {

    if (e.target.nodeName === 'LI') {

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
                            <div class="main__fav">
                                <i class="ph-star"></i>
                            </div>

                            <div class="main__check-edit-icons" id="check-edit-icons">
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

    }

})


row.addEventListener('click', (e) => {


    if (e.target.className === 'ph-check') {

        e.path[3].removeAttribute('contenteditable');

        e.path[1].style.visibility = 'hidden';

    } else if (e.target.className === 'ph-pencil') {

        const removeIcon = e.path[3].querySelector('.main__remove');

        removeIcon.style.animation = 'tr 0.9s ease-in-out forwards'

        const pencil = document.querySelector('.main__edit-icon');

        pencil.addEventListener('click', penEdit);

    } else if (e.target.className === 'ph-trash') {

        e.path[4].remove();
    }


})


function penEdit(e) {

    e.path[3].setAttribute('contenteditable', 'true');

    row.children[1].style.visibility = 'visible';

}