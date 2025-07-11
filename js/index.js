$('#wrap').css({
    height: $(window).height()+'px',
})
window.addEventListener('resize', function() {
    $('#wrap').css({
        height: $(window).height()+'px',
    })
});
function getNewWork(){
    fetch('downloadWork.php?api=gemoroy')
        .then(res => res.json())
        .then(data => {
            // обработка ответа, например:
            $('.work').remove();
            if(data){
                console.log(data);
                data.forEach(item => {
                    $('#works').append(`
                        <div class="work">
                            <h2>`+item+`</h2>
                            <a href="`+item+`/" target="_blank">
                                <div class="work__button">   
                                    Открыть
                                </div>
                            </a>
                        </div>
                    `);
                });
            }else{
                console.log('Нет данных');
            }
        });
}
getNewWork()
    