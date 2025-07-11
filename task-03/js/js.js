const content = $('#content');

const imgs = [
    {id: 1,src: 'bb.png',alt: 'black bishop',title: 'Figure of a black bishop'},
    {id: 2,src: 'bk.png',alt: 'black king',title: 'Figure of a black king'},
    {id: 3,src: 'bn.png',alt: 'black knight',title: 'Figure of a black knight'},
    {id: 4,src: 'bp.png',alt: 'black pawn',title: 'Figure of a black pawn'},
    {id: 5,src: 'br.png',alt: 'black rook',title: 'Figure of a black rook'},
    {id: 6,src: 'wb.png',alt: 'white bishop',title: 'Figure of a white bishop'},
    {id: 7,src: 'wk.png',alt: 'white king',title: 'Figure of a white king'},
    {id: 8,src: 'wn.png',alt: 'white knight',title: 'Figure of a white knight'},
    {id: 9,src: 'wp.png',alt: 'white pawn',title: 'Figure of a white pawn'},
    {id: 10,src: 'wr.png',alt: 'white rook',title: 'Figure of a white rook'}
]

imgs.forEach(task => {
    let newImg = $(`
        <div class="img" style="background-image: url(img/${task.src})"></div>
    `);
    $('#content').append(newImg);
});
$('.img').on('click', function () {
    let img = $(this);
    let src = img.css('background-image').replace(/(^url\(["']?|["']?\)$)/g, '');
    let id = imgs.find(i => i.src === src.split('/').pop()).id - 1;
    let title = imgs[id].title;
    let alt = imgs[id].alt;
    let modal = $(`
        <div class="modal">
            <div class="modal-content">
                <span class="title">${title}</span>
                <img src="${src}" alt="${imgs[id].alt}" title="${imgs[id].title}">
                <span class="alt">${alt}</span>

                <div class="arrow-l arrow"></div>
                <div class="arrow-r arrow"></div>


                <div class="close">X</div>
            </div>
        </div>
    `);


    $('body').append(modal);

    $('.arrow-l').on('click', function () {

        
        let currentImg = $('.modal img');
        let currentSrc = currentImg.attr('src');
        let currentId = imgs.findIndex(i => i.src === currentSrc.split('/').pop());
        if (currentId > 0) {
            currentId--;
            let newSrc = `img/${imgs[currentId].src}`;
            currentImg.attr('src', newSrc);
            $('.title').text(imgs[currentId].title);
            $('.alt').text(imgs[currentId].alt);
        }else{
            let newSrc = `img/${imgs[imgs.length - 1].src}`;
            currentImg.attr('src', newSrc);
            $('.title').text(imgs[imgs.length - 1].title);
            $('.alt').text(imgs[imgs.length - 1].alt);
        }
    })
    $('.arrow-r').on('click', function () {

        
        let currentImg = $('.modal img');
        let currentSrc = currentImg.attr('src');
        let currentId = imgs.findIndex(i => i.src === currentSrc.split('/').pop());
        if (currentId < imgs.length - 1) {
            currentId++;
            let newSrc = `img/${imgs[currentId].src}`;
            currentImg.attr('src', newSrc);
            $('.title').text(imgs[currentId].title);
            $('.alt').text(imgs[currentId].alt);
        }else{
            let newSrc = `img/${imgs[0].src}`;
            currentImg.attr('src', newSrc);
            $('.title').text(imgs[0].title);
            $('.alt').text(imgs[0].alt);
        }
    })
    $('.modal-content').on('click', function(event) {
        event.stopPropagation(); 
    });

    $('.modal').on('click', function () {
        $(this).remove();
    });
    $('.close').on('click', function () {
        $('.modal').remove();
    });
    $(document).on('keydown.modalNav', function(e) {
        if (!$('.modal').length) return; 

        let currentImg = $('.modal img');
        let currentSrc = currentImg.attr('src');
        let currentId = imgs.findIndex(i => i.src === currentSrc.split('/').pop());

        if (e.key === 'ArrowLeft') {

            if (currentId > 0) currentId--;
            else currentId = imgs.length - 1;
        } else if (e.key === 'ArrowRight') {

            if (currentId < imgs.length - 1) currentId++;
            else currentId = 0;
        }else if (e.key === 'Escape') {
            $('.modal').remove();
            $('.modal').on('click', function () {
                $(document).off('keydown.modalNav');
                $(this).remove();
            });
            $('.close').on('click', function () {
                $(document).off('keydown.modalNav');
                $('.modal').remove();
            });
            return;

        }else {
            return; 
        }

        let newImg = imgs[currentId];
        currentImg.attr('src', `img/${newImg.src}`);
        $('.title').text(newImg.title);
        $('.alt').text(newImg.alt);
    });

    $('.modal').on('click', function () {
        $(document).off('keydown.modalNav');
        $(this).remove();
    });
    $('.close').on('click', function () {
        $(document).off('keydown.modalNav');
        $('.modal').remove();
    });
});

