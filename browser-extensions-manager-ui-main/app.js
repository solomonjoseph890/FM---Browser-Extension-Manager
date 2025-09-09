

var data;

const toggleall = document.querySelector('#all-toggle');
const toggleactive = document.querySelector('#active-toggle');
const toggleinactive = document.querySelector('#inactive-toggle');


const tglLightBtn = document.querySelector('.to-light-mode')
const tglDarkBtn = document.querySelector('.to-dark-mode')




var theme = "dark";



tglDarkBtn.style.display = 'none';

var activestate;


document.addEventListener("DOMContentLoaded", async(event) => {

   const response = await fetch('data.json');
    data = await response.json();

  console.log("DOM fully loaded and parsed");

   start();
});

function start() {
    console.log(data)
    createExtCards(data)
}

function createExtCards(data) {



    console.log("createAtive state")
    console.log(data)
    const container = document.querySelector('.container');
    if(container){
        while(container.firstChild){
        container.firstChild.remove();
        }
    }

    for (let index = 0; index < data.length; index++) {

        const ext = data[index];
        // console.log(ext)
        const activestate =  ext.isActive;
        // console.log(activestate)

        

        const ext_div = document.createElement('div')
        ext_div.classList.add('extension-div')
        ext_div.id = `extDiv${index}`
        container.append(ext_div)


        const ext_logo = document.createElement('img')
        ext_logo.classList.add('card-logo')
        ext_logo.src = ext.logo
        ext_div.appendChild(ext_logo)





        const ext_card_heading = document.createElement('div')
        ext_card_heading.classList.add('card-heading')

        ext_div.append(ext_card_heading)


        const ext_name = document.createElement('h3')
        ext_name.classList.add('name-heading')
        ext_name.innerText = ext.name
        ext_div.appendChild(ext_name)

        const ext_description = document.createElement('p')
        ext_description.classList.add('card-description')
        ext_description.innerText = ext.description
        ext_description.id = `ext_description${index}`;
        ext_div.appendChild(ext_description)
       ext_description.addEventListener('click', (e) =>{
            testDescription(e, index, "Joesph"+index)
        })

        ext_card_heading.append(ext_name)
        ext_card_heading.append(ext_description)





        const ext_card_button = document.createElement('div')
        ext_card_button.classList.add('card-buttons')
        ext_div.appendChild(ext_card_button)



        const ext_remove = document.createElement('button')
        ext_remove.classList.add('remove-btn')
        ext_remove.id = `remove_btn${index}`;
        ext_remove.innerText = 'Remove';
        ext_div.appendChild(ext_remove)
        ext_remove.addEventListener('click', (e) =>{
            deleteList(e, index, "Joesph"+index)
        })



        const checkbox_container = document.createElement('div')
        checkbox_container.classList.add('checkbox-container')


        const ext_slider = document.createElement('input')
        ext_slider.classList.add('card-checkbox')
        ext_slider.type = 'checkbox';
        ext_slider.id = 'mycheckbox' + index;
        if(activestate){
            ext_slider.checked = true;
        }
        

        ext_slider.addEventListener('change', (e)=> {
            switchActive(e, index)
        })



        const ext_label = document.createElement('label')
        ext_label.classList.add('ext-label')
        ext_label.htmlFor = ext_slider.id
        ext_label.textContent = ''
        ext_div.append(ext_label)




        ext_div.appendChild(ext_slider)

    
        ext_card_button.append(ext_remove)
        ext_card_button.append(ext_slider)

        ext_div.append(checkbox_container)
        ext_card_button.append(checkbox_container)


        checkbox_container.append(ext_slider)
        checkbox_container.append(ext_label)


        theme == "dark" ? onDarkBtnClick() : onLightBtnClick(); 
        // onDarkBtnClick();
        // onLightBtnClick();
        
  

    }
}



toggleall.addEventListener("click", ()=>{
    console.log("clicked active state")

    createExtCards(data)
})

// function testDescription(e, position){
//  const div = document.querySelector(`#ext_description${position}`)
//  div.innerText = "TACHER SAJSFDKLGSFDJGSKLFD GKLJ SDJKLG SDFKLGSLD"
//     // div.style.display = "none";
// }

function deleteList(e, position, name){
    console.log(e)
    console.log(position)
    console.log("Hi im "+name)

    // const div = document.querySelector(`#extDiv${position}`)
    // div.style.display = "none";
    const newData = []
    for (let i = 0; i < data.length; i++) {
        const ext = data[i];
        
          if (i != position) {
            newData.push(ext)
        }
    }
    
        data = newData
    createExtCards(newData)
}

function switchActive(e, position) {
    console.log(e)
    console.log(position)

    // ---1
    // let clickActive = !data[position].isActive;
    // console.log(clickActive)

    // data[position].isActive = clickActive

    // createExtCards(data)


    // ----2

    // const checked = e.target.checked;
    // data[position].isActive =checked;
    // createExtCards(data)
    // console.log(checked)

    // --- 3
    // const newData = []

    // for (let i = 0; i < data.length; i++) {
    //      const ext = data[i];
        
    //       if (i == position) {
    //         let clickActive = !ext.isActive;
    //         ext.isActive = clickActive
    //     }

    //     newData.push(ext)

    // }

    // data = newData;
    // createExtCards(data)

    // ---- 4 
    // const selectedCheckbox = document.getElementById('mycheckbox' + position).checked;
    // data[position].isActive = selectedCheckbox;
    // createExtCards(data)
}


toggleactive.addEventListener("click", ()=>{
    console.log("clicked active state")
    let activedata = [];
    for (let i = 0; i < data.length; i++) {
        const extension = data[i];
        console.log("looing" +extension)

        if(extension.isActive){
            activedata.push(extension)
        }
        
    }
    console.log(activedata)
    createExtCards(activedata)
})

toggleinactive.addEventListener('click', ()=> {
  console.log("clicked active state")
    let activedata = [];
    for (let i = 0; i < data.length; i++) {
        const extension = data[i];
        console.log("looing" +extension)

        if(!extension.isActive){
            activedata.push(extension)
        }
        
    }
    console.log(activedata)
    createExtCards(activedata)
})



tglDarkBtn.addEventListener('click', () => {
    theme = "dark"
    onDarkBtnClick();
})

tglLightBtn.addEventListener('click', () => {
    theme  = "light";
    onLightBtnClick();
})



function onLightBtnClick(){
    tglDarkBtn.style.display = 'block';
    tglLightBtn.style.display = 'none';
    bodyied.style.background = 'linear-gradient(80deg, #EBF2FC 0%, #EEF8F9 100%)';


    const card = document.querySelectorAll('.extension-div').forEach((element => {
        element.classList.add('bg-light');    
    }))

    const cardTtitle = document.querySelectorAll('.name-heading').forEach((element => {
        element.classList.add('title-light')
    }))


    const cardDesc = document.querySelectorAll('.card-description').forEach((element => {
        element.classList.add('description-light')
    }))

    const removebtn = document.querySelectorAll('.remove-btn').forEach((element => {
        element.classList.add('remove-light')
    }))


    const cardCheckbox = document.querySelectorAll('.ext-label').forEach((element => {
        element.classList.add('label-light')
    }))


    const extensiontitle = document.querySelectorAll('.extension-title').forEach((element => {
        element.classList.add('title-light')
    }))


    const header = document.querySelectorAll('.header').forEach((element => {
        element.classList.add('header-light')
    }))

    const  svgbg = document.querySelectorAll('.light-dark-toggle').forEach((element => {
        element.classList.add('light-mode')
    }))


    const controler = document.querySelectorAll('.toggle-buttons').forEach((element => {
        element.classList.add('toggle-button-light');
    }))




};


function onDarkBtnClick(){
    tglDarkBtn.style.display = 'none';
    tglLightBtn.style.display = 'block';
    bodyied.style.background = 'linear-gradient(180deg,  #040918 100%, #091540 100%)';



    const card = document.querySelectorAll('.extension-div').forEach((element => {
        element.classList.remove('bg-light');
    }))
    
    const cardTtitle = document.querySelectorAll('.name-heading').forEach((element => {
        element.classList.remove('title-light')
    }))


    const cardDesc = document.querySelectorAll('.card-description').forEach((element => {
        element.classList.remove('description-light')
    }))


    const removebtn = document.querySelectorAll('.remove-btn').forEach((element => {
        element.classList.remove('remove-light')
    }))

    
    const extensiontitle = document.querySelectorAll('.extension-title').forEach((element => {
        element.classList.remove('title-light')
    }))

    const header = document.querySelectorAll('.header').forEach((element => {
        element.classList.remove('header-light')
    }))


    const  svgbg = document.querySelectorAll('.light-dark-toggle').forEach((element => {
        element.classList.remove('light-mode')
    }))



    const controler = document.querySelectorAll('.toggle-buttons').forEach((element => {
        element.classList.remove('toggle-button-light');
    }))
};




const bodyied  = document.body



