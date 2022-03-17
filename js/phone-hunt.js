// use keyboard enter for search :
const searchField = document.getElementById('button');
const searchInput = document.getElementById('search-input');
searchInput.addEventListener("keypress", function (event) {
    console.log('keypress trigerred', event.key)
    if (event.key === 'Enter'){
        searchField.click();
    }      
});



/* 1: 🕸 Function for getting TAGs */
const getElement = id => {
    const element = document.getElementById(id);
    return element;
};
/* 2: 🕸 Function for getting TAG's Values */
const getSearchText = () => {
    const searchInput = getElement('search-input').value.toLowerCase();
    return searchInput;
};
/* 3: 🕸 Function for getting Api Data & ERROR handleing & Empty input field*/
const loadPhoneData = () => {
    getElement('spinner').style.display = 'block';
    const inputFieldText = getSearchText();
    const inputField = getElement('search-input');
    if (inputField.value === '') {
        getElement('error').innerText = "Please type the name of any Phone YOU want to BUY!";
        getElement('phone').innerHTML = '';
        getElement('show-button').style.display ='none';
        return;
    };
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        searchPhoneData(data.data);
    });
    getElement('phone').innerHTML = '';
    getElement('single-phone').innerHTML = '';
    getElement('error').innerText = '';
};

/* 4: 🕸 Display loaded data from server & calling Function from an ARROW Function */
const showPhone = () => {
    const inputFieldText = getSearchText();
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayPhoneData(data.data);
    });
    getElement('show-button').style.display = 'none';
    getElement('search-input').value = '';
}
/* 5: 🕸 ARROW function for showing Server Data & Error handeling */
const searchPhoneData = phones => {
    if (phones.length === 0) {
        getElement('error').innerText = 'Nothing Found! Please input a valid phone Name and Search again';
        getElement('show-button').style.display = 'none';
    };
    if (phones.length > 20) {
        phones = phones.slice(0, 18);
        getElement('show-button').style.display = 'block'
    } 
    else {
        getElement('search-input').value = '';
    }
    displayPhoneData(phones);
}
/* 6: 🕸 Creating LOOP to find usable data to show on own website */
const displayPhoneData = phones => {
    getElement('spinner').style.display='none';
    for (const phone of phones) {
        const phoneContiner = document.getElementById('phone');
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('col');
        phoneCard.innerHTML = `
        <div class="card h-100 p-2">
            <img src="${phone.image}" class="card-img-top img-card" alt="...">
            <div class="card-body">
                <h5>${phone.phone_name}</h5>
                <hp class="card-title"><b>Brand:</b> ${phone.brand}</p>
                <button onclick="loadSinglePhone('${phone.slug}')" class="btn btn-dark w-100">Explore</button>
            </div>
        </div> `;
        phoneContiner.appendChild(phoneCard);
    };
};
/* 7: 🕸 Loading Patched single Data to Display */
const loadSinglePhone = (phone) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phone}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySinglePhone(data.data));
    getElement('single-phone').innerHTML = '';
};
/* 8: 🕸 Displaying loded DATA to a Dynamic div & use of Back Tic */
const displaySinglePhone = phone => {
    window.scroll(0, 0);
    const container = getElement('single-phone');
    const singlePhone = document.createElement('div');
    container.classList.add('container');
    const sensor = phone.mainFeatures.sensors.map(sensor => sensor);
    singlePhone.innerHTML = `
            <div class="card h-100 p-2 my-3">
                <img src="${phone.image}" class="card-img-top phone-image" alt="...">
                <div class="card-body">
                <h5>${phone.name}</h5>
                <p><b>${phone.releaseDate ? phone.releaseDate : 'Not Found!'}</b></p>
                <p><b>Sensor:</b> ${sensor}</P>
                <p><b>WLAN:</b> ${phone.others?.WLAN ? phone.others?.WLAN : 'Not Found!'}</p>
                <p><b>Bluetooth:</b> ${phone.others?.Bluetooth ? phone.others?.Bluetooth : 'Not Found!'}</p>
                <p><b>GPS:</b> ${phone.others?.GPS ? phone.others?.GPS : 'Not Found!'}</p>
                <p><b>Radio:</b> ${phone.others?.Radio ? phone.others?.GPS : 'Not Found!'}</p>
                <p><b>USB:</b> ${phone.others?.USB ? phone.others?.USB : 'Not Found!'}</p>
            </div> `;
    container.appendChild(singlePhone);
};
                                                            /* THANK YOU */
