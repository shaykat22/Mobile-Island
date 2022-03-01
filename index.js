
const main = document.getElementById("main");
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");


    const searchText = (input.value);
    if (searchText == "") { //check empty string 
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

    phoneData = phoneData.data;
    console.log(phoneData);
    let count = 0;

    for (const datas of phoneData) {
        count = count + 1;
        if (count <= 20) {
            // console.log(datas);
            const div = document.createElement("div");
            div.classList.add("col-lg-4")
            div.classList.add("mb-5")
            div.innerHTML = `
            <div class="phones" style="width: 18rem;">
                 <img src="${datas.image}" class="phones-img-top" alt="...">
                 <div class="phones-body">
                 <h5 class="phones-title">${datas.phone_name}</h5>
                <p class="phones-text">${datas.brand}</p>
                <button onclick="phoneDetails('${datas.slug}')" class="btn btn-primary">See Details</button>
             </div>
            </div>
             `
            main.appendChild(div)
        }

    }
}

const phoneDetails = id => {
    console.log(id);

    fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => {
            const productDetails = data.data;
            console.log(productDetails);
            const div = document.createElement("div");
            main.innerHTML = "";
            div.innerHTML = `
        
            <div class="card flex " style="width: 18rem;">
                    <img src="${productDetails.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${productDetails.name}</h5>
                        <p class="card-text">${productDetails.brand}</p>
                        <p class="card-text">${productDetails.releaseDate}</p>
                        <p class="card-text">${productDetails.mainFeatures.storage}</p>
                        <p class="card-text">${productDetails.mainFeatures.sensors}</p>
                        <p class="card-text">${productDetails.slug}</p>
                    </div>
                </div>
                
            `
            main.appendChild(div)

        })

}
