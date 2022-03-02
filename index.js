const main = document.getElementById("main");
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");
    const searchText = (input.value.toLowerCase());
    if (searchText === "") { //check empty string 
        error.innerText = "please give a value";
        input.value = "";
        main.innerHTML = "";
    }
    else {
        main.innerHTML = "";
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(res => res.json())
            .then(data => {
                if (data.data.length != 0) {
                    phonesDisplay(data)
                }
                else {
                    error.innerText = "Data not found";
                }
            })
        input.value = "";
        error.innerHTML = ""
    }
}

const phonesDisplay = (phoneData) => {

    phoneData = phoneData.data.slice(0, 20);//showing first 20 result of search data
    //console.log(phoneData);

    for (const datas of phoneData) {
        const div = document.createElement("div");
        div.classList.add("col-lg-4")
        div.classList.add("mb-5")
        div.innerHTML = `
        <div class="d-flex justify-content-centerd-flex justify-content-center">
            <div class="phones  text-light" style="width: 18rem;">
                 <img src="${datas.image}" class="phones-img-top w-50 radius" alt="...">
                 <div class="phones-body">
                 <h5 class="phones-title">${datas.phone_name}</h5>
                <p class="phones-text">${datas.brand}</p>
                <button onclick="phoneDetails('${datas.slug}')" class="btn_style">See Details</button>
             </div>
            </div>
         </div>    `
        main.appendChild(div)
    }
}
const phoneDetails = id => {
    console.log(id);

    fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => {
            const productDetails = data.data;
            const singleDetails = document.getElementById('phone-details')
            console.log(productDetails);
            const div = document.createElement("div");
            div.classList.add('card')
            //main.innerHTML = "";
            div.innerHTML = `
        
            <div class="row  ">
            <div class = 'col-lg-6'>
            <img src="${productDetails.image}" class="card-img-top w-75 radius img-fluid " alt="...">
            <h5 id ="phone-text" class="card-title text-light">${productDetails.name}</h5>
            <p class="card-text text-light">${productDetails.brand}</p> 
            </div>
            <div class = "col-lg-6">       
                    <div class="card-body text-light">                        
                        <p class="card-text"> <span class="text-title">Chipset:</span> ${productDetails?.releaseDate || 'Release Date Not Decicded'}</p> 
                        <p class="card-text">${productDetails.mainFeatures?.displaySize || 'Not found'}</p>
                        <p class="card-text">${productDetails.mainFeatures?.chipSet || 'Not found'}</p>
                        <p class="card-text">${productDetails.mainFeatures?.sensors || 'Not found'}</p>
                        
                    </div>
                </div>
            </div>  
            `;
            for (const prop in productDetails.others) {
                console.log(prop);
            }
            singleDetails.appendChild(div);


        })


};

