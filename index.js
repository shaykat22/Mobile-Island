console.log('hello');
const main = document.getElementById("main");
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");


    const searchText = (input.value);
    if (searchText == "") { //check  string 
        error.innerText = "please give a string";
        input.value = "";
        main.innerHTML = "";
    }

    else {
        main.innerHTML = "";
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(res => res.json())
            .then(data => phonesDisplay(data.data))

        input.value = "";
        error.innerHTML = ""
    }
}

const phonesDisplay = (data) => {
    console.log(data);
    for (const datas of data) {
        console.log(datas);
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

const phoneDetails = (slug) => {
    console.log("clicked");
    fetch(`https://openapi.programming-hero.com/api/phones?search=${slug}`)
        .then(res => res.json())
        .then(data => console.log(data.data[0]));

}