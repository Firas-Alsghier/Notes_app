'use strict';

const addBtn = document.getElementById('add-btn');
const clear = document.getElementById('clear');
const bulletsList = document.getElementById('bullets-list');
const row = document.querySelector('.row');
const li = document.querySelectorAll('li');
const Week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const search = document.getElementById('search');

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
        <div class="col-lg-4 pb">
        <div class="main__custom">
            <div class="main__line-one">
                <div class="main__alignment">
                    <ul>
                        <li><i class="ph-text-align-left"></i></li>
                        <li><i class="ph-text-align-center"></i></li>
                        <li><i class="ph-text-align-right"></i></li>
                    </ul>
                </div>

                <div>
                    <select class="main__weight">
                        <option value="lighter">Lighter</option>
                        <option value="500">Medium</option>
                        <option value="bolder">Bold</option>
                    </select>
                </div>
            </div>
            <div class="main__line-two">
            <div class="main__font-color">
                <input type="color" id="main__label" class="main__font-color-input">
                <label class="main__label" for="main__label">Text</label>
            </div>


            <div class="main__bg-color">
            <label class="main__label" for="bg-id">Background color: </label>
            <input type="color" id="bg-id" class="main__bg-color-input">
            </div>
            </div>

        </div>
        <div class="main__card" style="background: ${bulletColor};" contenteditable="true">

            <h2 class="main__card-title">
                Title
            </h2>
            <div class="main__time">
                <span contenteditable="false">${dayOfWeek} ${day}, ${year}</span>
            </div>
            <hr>
            <p class="main__info">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
                mollitia tempore alias molestias minima cumque iure repudiandae dolorum nihil
                doloremque?</p>
            

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

        e.composedPath()[3].removeAttribute('contenteditable');

        e.composedPath()[1].style.visibility = 'hidden';

        e.composedPath()[2].querySelector('.main__edit-icon').removeEventListener('click', penEdit);

        e.composedPath()[2].querySelector('.main__remove').style.animation = '';

        e.composedPath()[4].querySelector('.main__custom').style.transform = 'translateY(0)';

        localStorage.setItem('cards', row.innerHTML);

    } else if (e.target.className === 'ph-pencil') {

        const removeIcon = e.composedPath()[2].querySelector('.main__remove');

        removeIcon.style.animation = 'tr 0.9s ease-in-out forwards'

        const pencil = e.composedPath()[2].querySelector('.main__edit-icon');

        pencil.addEventListener('click', penEdit);

    } else if (e.target.className === 'ph-trash') {

        e.composedPath()[4].remove();
        localStorage.setItem('cards', row.innerHTML);


    } else if (e.target.localName === 'p' || e.target.localName === 'h2') {

        const z = document.getElementsByClassName('align');

        for (const i of z) {

            i.classList.remove('align');

        }

        e.target.classList.add('align');

        e.composedPath()[3].querySelector('.ph-text-align-left').addEventListener('click', () => {

            document.querySelector('.align').style.textAlign = 'left';

        })

        e.composedPath()[3].querySelector('.ph-text-align-center').addEventListener('click', () => {

            document.querySelector('.align').style.textAlign = 'center';


        })

        e.composedPath()[3].querySelector('.ph-text-align-right').addEventListener('click', () => {

            document.querySelector('.align').style.textAlign = 'right';

        })

    } else if (e.target.className === 'main__weight') {

        e.composedPath()[4].addEventListener('input', (we) => {

            we.composedPath()[4].querySelector('.main__info').style.fontWeight = e.target.value;
            localStorage.setItem('cards', row.innerHTML);


        })


    } else if (e.target.className === 'main__font-color-input') {

        e.composedPath()[4].addEventListener('input', (ft) => {

            ft.composedPath()[4].querySelector('.main__info').style.color = e.target.value;
            localStorage.setItem('cards', row.innerHTML);

        })

    } else if (e.target.className === 'main__bg-color-input') {

        e.composedPath()[4].addEventListener('input', (bg) => {

            bg.composedPath()[4].querySelector('.main__card').style.backgroundColor = e.target.value;
            localStorage.setItem('cards', row.innerHTML);


        })

    }

})

function penEdit(e) {

    e.composedPath()[3].setAttribute('contenteditable', 'true');

    e.composedPath()[3].querySelector('.main__check-icon').style.visibility = 'visible';

    e.composedPath()[4].querySelector('.main__custom').style.transform = 'translateY(-8rem)';

    localStorage.setItem('cards', row.innerHTML);


}

if (localStorage.getItem('cards')) {

    row.innerHTML = localStorage.getItem('cards');

}


search.addEventListener('input', () => {

    const searchValue = search.value.toLowerCase();

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


clear.addEventListener('click', () => {

    row.innerHTML = '';

    localStorage.clear();

})