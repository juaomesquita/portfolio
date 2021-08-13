console.log('a');
window.addEventListener('DOMContentLoaded', e => {
    const factParagraph = document.getElementById('facts');
    if(localStorage.getItem('dimension') === null){
        localStorage.setItem('dimension', '1080');
    } else{
        localStorage.setItem('dimension', parseInt(localStorage.getItem('dimension')) + 1);
    }

    if(parseInt(localStorage.getItem('dimension') > 1090)){
        localStorage.setItem('dimension', '1080');
    }

    let dimension = localStorage.getItem('dimension');

    fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => {
            factParagraph.innerText = data['fact'];
        })
        .catch(err => console.log(err));

    fetch(`http://placekitten.com/1920/${dimension}`)
        .then(response => response)
        .then(data => {
            document.body.style.backgroundImage = `url(${data['url']})`;
            // console.log(data['url']);
        })
        .catch(err => console.log(err));
}, false);