window.addEventListener('pageshow', function (){

    const questnDivs = document.querySelectorAll('.question-wrapper'),
    radioBtns = document.querySelectorAll('.radiobtn'),
    submitBtn = document.querySelectorAll('.btn')[0],
    nextBtn = document.querySelectorAll('.btn')[1],
    endH = document.querySelector('.end-header');
    let passed = 0;

    radioBtns.forEach((e) => {
        e.checked = false;
        e.addEventListener('click', () => {
            nextBtn.removeAttribute('disabled');
        });
    });

    nextBtn.addEventListener('click', () => {
        nextBtn.setAttribute('disabled', 'true');
        if (passed == 19) {
            console.log('end');
            console.log(nextBtn);
            questnDivs[passed].classList.add('hidden');
            nextBtn.classList.add('hidden');
            endH.classList.remove('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            questnDivs[passed].classList.add('hidden');
            questnDivs[passed+1].classList.remove('hidden');
            passed++;
        }
    });

    submitBtn.addEventListener('click', () => {
        window.close();
    })

});
