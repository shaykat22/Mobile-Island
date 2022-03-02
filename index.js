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
                    document.getElementById('display-img').innerHTML = '';
                }
                else {
                    error.innerText = "Data not found";
                }
            })
        input.value = "";
        error.innerHTML = ""
        document.getElementById('phone-details').innerHTML = '';

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
        <div class="d-flex  justify-content-center">
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
            singleDetails.innerHTML = "";
            div.innerHTML = `
        
            <div class="row d-flex p-2 ">
                <div class = 'col-lg-6'>
                    <img src="${productDetails.image}" class=" w-75  img-fluid " alt="...">
                    <h5 id ="phone-text" class="card-title ">${productDetails.name}</h5>
                <p class="card-text ">${productDetails.brand}</p> 
                </div>
                 <div class = "col-lg-6">       
                    <div class="card-body ">                        
                        <p class="card-text"> <span class="text-title">Release: </span>${productDetails?.releaseDate || 'Release Date Not Decicded'}</p> 
                        <p class="card-text">Display: </span>${productDetails.mainFeatures?.displaySize || 'Not found'}</p>
                        <p class="card-text">Chipset:</span>${productDetails.mainFeatures?.chipSet || 'Not found'}</p>
                        <p class="card-text"><span class="text-title">Sensor: </span>${productDetails.mainFeatures?.sensors || 'Not found'}</p>
                        
                    </div>
                </div>
            </div>  
            `;
            singleDetails.appendChild(div);

            const othersDetails = document.createElement('p');
            if (productDetails.others !== undefined) {
                phoneDetails.innerHTML = `
                 <div class ="row";
                 </div>`

                for (const properties in productDetails.others) {
                    const othersP = document.createElement('p');
                    othersP.className = "row"
                    othersP.innerHTML = `
                <p class="card-text"><span class='text-title'>Others: </span>${productDetails?.others[properties]}</p>
                `;
                    phoneDetails.appendChild(p);
                };

            }

        })


};

