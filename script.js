let personeName = document.getElementById('persone-name');
const postList = document.querySelector('.posts-list');
const messageText = document.getElementById('messageText');
const messageSend = document.getElementById('messageSending');
const likedFilter = document.getElementById('likedPosts');
const searchPosts = document.getElementById('searchPosts');
personeName.textContent = 'Гость';

let messageNum = 0;

// getPos();

messageText.addEventListener('input', () => {
    if(messageText.value != '' && messageText.value == messageText.value.trim()){
        messageSend.disabled = false;
        messageSend.classList.remove('opacity-half');
    }else{
        messageSend.disabled = true;
        messageSend.classList.add('opacity-half');
    }
});

messageSend.addEventListener('click', (e) => {
    e.preventDefault();
    messageSending();
});

messageText.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        e.preventDefault();
        if(messageText.value != '' && messageText.value == messageText.value.trim()){
            messageText.value.trim();
            messageSending();
            messageSend.classList.add('opacity-half');
        }
    }
});

likedFilter.addEventListener('change', () => {
    let postElements = document.querySelectorAll('.post');
    postElements.forEach(el => {
        if(likedFilter.checked){
            if(!el.classList.contains('liked')){
                el.style.display = 'none';
            }
        }else{
            el.style.display = 'flex';
        }
    });
});

searchPosts.addEventListener('input', () => {
    let postElements = document.querySelectorAll('.post');
    postElements.forEach(el => {
        if(searchPosts.value != ''){
            if(!el.children[0].textContent.includes(searchPosts.value)){
                console.log(el);
                el.style.display = 'none';
            }else{
                el.style.display = 'flex';
            }
        }else{
            el.style.display = 'flex';
        }        
    });
});

function messageSending(){
    messageNum ++;
    createMessage();
    console.log(postList.children.length);
    messageText.value = '';
    messageSend.disabled = true;
    return postList;
}

function createMessage(){
    let postObj = {
        id: 0,
        text: '',
        liked: false,
        date: '',
        time: ''
    };

    let postElement = document.createElement('li');
    postElement.classList.add('post');
    postElement.id = messageNum;
    postObj.id = messageNum;

    let postText = document.createElement('span');
    postText.classList.add('message-value');
    postText.textContent = messageText.value;
    postObj.text = messageText.value;
    postElement.appendChild(postText);

    let divButtons = document.createElement('div');
    divButtons.classList.add('buttons-on-message');
    postElement.appendChild(divButtons);

    let del = document.createElement('button');
    del.type = 'button';
    del.classList.add('delete-message');
    let delImg = document.createElement('img');
    delImg.src = './img/icons_del.svg';
    delImg.width = 24;
    delImg.height = 24;
    del.appendChild(delImg);
    divButtons.appendChild(del);
    del.addEventListener('click', () => {
        postElement.remove();
        postObj = null;
    });
    
    let like = document.createElement('button');
    like.type = 'button';
    like.classList.add('like-message');
    let likeImg = document.createElement('img');
    likeImg.src = './img/icons_heart.svg';
    likeImg.width = 24;
    likeImg.height = 24;
    like.appendChild(likeImg);
    divButtons.appendChild(like);
    like.addEventListener('click', () => {
        postElement.classList.toggle('liked');
        postObj.liked = !postObj.liked;
    });

    let divTime = document.createElement('div');
    divTime.classList.add('div-time');
    let datePost = document.createElement('span');
    let date = new Date();
    let dateText = date.getDate();
    if(dateText < 10){
        dateText = '0' + dateText;
    }
    let monthText = (date.getMonth() + 1);
    if(monthText < 10){
        monthText = '0' + monthText;
    }
    let datePosting = dateText + '.' + monthText + '.' + date.getFullYear();
    postObj.date = datePosting;
    datePost.textContent = datePosting;
    datePost.classList.add('date-time');
    divTime.appendChild(datePost);
    let timePost = document.createElement('span');
    let hourText = date.getHours();
    if(hourText < 10){
        hourText = '0' + hourText;
    }
    let timeText = date.getMinutes();
    if(timeText < 10){
        timeText = '0' + timeText;
    }
    let timePosting = hourText + ':' + timeText;
    postObj.time = timePosting;
    timePost.textContent = timePosting;
    timePost.classList.add('date-time');
    divTime.appendChild(timePost);
    divButtons.appendChild(divTime);
    
    postList.appendChild(postElement);
}