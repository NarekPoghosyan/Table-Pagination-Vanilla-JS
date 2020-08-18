const jsonUsers = [
    {
        name: "Armen",
        username: "Stepanyan",
        tel: "+(374) 95 147565",
        city: "Deli",
    },
    {
        name: "Aram",
        username: "Sargsyan",
        tel: "+(374) 77 245560",
        city: "San-Francisko",
    },
    {
        name: "Elena",
        username: "Poghosyan",
        tel: "+(374) 55 213594",
        city: "Tokyo",
    },
    {
        name: "Ekaterina",
        username: "Xachatryan",
        tel: "+(374) 11 027061",
        city: "London",
    },
    {
        name: "Karen",
        username: "Rubinyan",
        tel: "+(374) 33 344533",
        city: "Moscow",
    },
    {
        name: "Karolina",
        username: "Avanyan",
        tel: "+(374) 41 667662",
        city: "Paris",
    },
    {
        name: "Vazgen",
        username: "Qaryan",
        tel: "+(374) 99 287885",
        city: "Pekin",
    },
    {
        name: "Vardan",
        username: "Serobyan",
        tel: "+(374) 98 047517",
        city: "Kair",
    },
    {
        name: "Lena",
        username: "Qocharyan",
        tel: "+(374) 43 111585",
        city: "Bangkok",
    },
    {
        name: "Larisa",
        username: "Karapetyan",
        tel: "+(374) 55 997980",
        city: "Sidney",
    },
    {
        name: "Serob",
        username: "Petrosyan",
        tel: "+(374) 95 137361",
        city: "Jakarta",
    },
    {
        name: "Sargis",
        username: "Xandilyan",
        tel: "+(374) 11 227261",
        city: "Yerevan",
    },
    {
        name: "Suren",
        username: "Muradov",
        tel: "+(374) 95 877565",
        city: "Bangalor",
    },
    {
        name: "Sashik",
        username: "Pilosyan",
        tel: "+(374) 95 147060",
        city: "Rio",
    },
    {
        name: "Tamara",
        username: "Manasyan",
        tel: "+(374) 91 099665",
        city: "Athenk",
    },
    {
        name: "Taron",
        username: "Pashinyan",
        tel: "+(374) 77 077047",
        city: "Riga",
    },
    {
        name: "Robert",
        username: "Levonyan",
        tel: "+(374) 43 147040",
        city: "Baku",
    },
    {
        name: "Ruben",
        username: "Gasparyan",
        tel: "+(374) 41 143774",
        city: "Tbilisi",
    },
    {
        name: "Zaven",
        username: "Hayrapetyan",
        tel: "+(374) 11 347335",
        city: "Tehran",
    },
    {
        name: "Onik",
        username: "Asoyan",
        tel: "+(374) 98 747677",
        city: "Madrid",
    },
    {
        name: "Lernik",
        username: "Ashotyan",
        tel: "+(374) 95 147565",
        city: "Athenk",
    },
    {
        name: "Karlen",
        username: "Shmavonyan",
        tel: "+(374) 77 246548",
        city: "Riga",
    },
    {
        name: "Gurgen",
        username: "Aharonyan",
        tel: "+(374) 95 747549",
        city: "Baku",
    },
    {
        name: "Levon",
        username: "Isahakyan",
        tel: "+(374) 91 227525",
        city: "Tbilisi",
    },
    {
        name: "Vardan",
        username: "Avetisyan",
        tel: "+(374) 77 665675",
        city: "Tehran",
    },
    {
        name: "Shahen",
        username: "Xechoyan",
        tel: "+(374) 95 552425",
        city: "Madrid",
    },
        {
        name: "Levon",
        username: "Isahakyan",
        tel: "+(374) 91 227525",
        city: "Tbilisi",
    },
    {
        name: "Shahen",
        username: "Xechoyan",
        tel: "+(374) 95 552425",
        city: "Madrid",
    },
]    

let pageItemCount = 5;
let currentPage = 1;
let rightOptValue;
let pageArr = [];

const prevBut = document.getElementById('previous');
const nextBut = document.getElementById('next');
const input = document.getElementById('search');
const seasel = document.getElementById('seasel');
const showing = document.getElementById('quotes');

input.addEventListener('keyup',function () {
    drawTable();
});

drawTable();

function drawTable() {
    clearTable();

    const inputValue = input.value.toLowerCase();
    pageArr = inputValue ? jsonUsers.filter(search) : jsonUsers;

    let startIndex = pageItemCount * (currentPage - 1);
    let endIndex = pageItemCount * currentPage - 1;
    
    for(let i = 0; i < pageArr.length; i++) {
        if(startIndex <= i && i <= endIndex) {
            createElement(pageArr[i]);
        }
    }

    createButton();
    showing.innerHTML = `Showing ${pageArr.length? startIndex + 1: 0} to ${endIndex >= pageArr.length? pageArr.length: endIndex + 1} of ${pageArr.length} entries`;
}

function createButton() {
    const buttonsCount = Math.ceil(pageArr.length / pageItemCount);
    const pages = document.getElementById('page-numbers');
    pages.innerHTML = "";

    for(let i = 0; i < buttonsCount; i++) {
        let buttonNumber = i + 1;
        const button = document.createElement('button');
        if(currentPage == buttonNumber) {
            button.setAttribute('class', 'active-page');
        } 
        button.innerHTML = buttonNumber;
        button.addEventListener('click', function(event) {
            changePage(Number(event.target.innerHTML));
        });
        button.setAttribute('id', `button_${buttonNumber}`);
        pages.appendChild(button);
    }   

    checkPrevNext();
}    

function checkPrevNext() {
    if(!pageArr.length) {
        prevBut.setAttribute('disabled', true);
        nextBut.setAttribute('disabled', true);
        return;
    }
    if(currentPage == 1) {
        prevBut.setAttribute('disabled', true);
    } else {
        prevBut.removeAttribute('disabled');
    }
    const buttonsCount = Math.ceil(pageArr.length / pageItemCount);

    if(currentPage == buttonsCount) {
        nextBut.setAttribute('disabled', true);
    } else {
        nextBut.removeAttribute('disabled');
    }
}

function changePage(nextPageNumber) {
    document.getElementById(`button_${currentPage}`).classList.remove('active-page');
    document.getElementById(`button_${nextPageNumber}`).classList.add('active-page');
    currentPage = nextPageNumber;
    drawTable();
}

function topNames() {
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let th1 = document.createElement('td');
    let th2 = document.createElement('td');
    let th3 = document.createElement('td');
    let th4 = document.createElement('td');
    th1.innerHTML = "Firstname";
    th2.innerHTML = "Lastname";
    th3.innerHTML = "Telephone";
    th4.innerHTML = "City";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    Array.from(tr.children).forEach(elem => {
        elem.setAttribute('class', "boys")
        elem.style.color = 'rgb(27, 27, 27)';
    });
}

function createElement(item) {
    let tr = document.createElement('tr');
    tr.setAttribute('class','styleNewhr')

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    
    td1.innerHTML = item.name;
    td2.innerHTML = item.username;
    td3.innerHTML = item.tel;
    td4.innerHTML = item.city;
    
    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
}

function clearTable() {
    table.innerHTML = "";
    topNames();
}

prevBut.addEventListener('click', function() {
    changePage(currentPage - 1);
})

nextBut.addEventListener('click',function() {
    changePage(currentPage + 1);
})

const select = document.querySelector('#sel')

select.addEventListener('change',changePageItemCount);

function changePageItemCount(event) {
    pageItemCount = Number(event.target.value);
    currentPage = 1;
    drawTable();
}

function takeRight(event) {
    rightOptValue = event.target.value.toLowerCase();
}

function search(elem) {
    const inputValue = input.value.toLowerCase();
    if(rightOptValue == 'lastname') {
        let fullUserName = elem.username.toLowerCase();
        return fullUserName.includes(inputValue);
    } else if (rightOptValue == 'telephone') {
        let fullTel = elem.tel;
        return fullTel.includes(inputValue);
    } else if(rightOptValue == 'city') {
        let fullCity = elem.city.toLowerCase();
        return fullCity.includes(inputValue);
    } else {
        let fullName = elem.name.toLowerCase();
        return fullName.includes(inputValue);
    }
}