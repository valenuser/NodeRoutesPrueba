const buttonSee = document.getElementById('seeDB')
const data = document.querySelector('#data')
const title = document.querySelector('#title')
const description = document.querySelector('#description')


const card = (dataLoad)=>{
    console.log(dataLoad._id);
    const div = document.createElement('div')
    div.innerHTML = `
        <div>
            <h1>${dataLoad.title}</h1>
            <p>${dataLoad.description}</p>
            <button data-id=${dataLoad._id} id="delete">Delete</button>
        </div>
    `

    const Delete = div.querySelector('#delete')

    Delete.addEventListener('click',()=>{
        console.log(Delete.dataset.id);
        // axios.delete('')
    })

    return div
}



axios.get('/api')
    .then(function (response) {
    // handle success
        const dataLoad = response.data
        console.log(dataLoad);
        dataLoad.forEach((dataLoad)=>{
            data.append(card(dataLoad))
        })

})



buttonSee.addEventListener('click',(e)=>{

    axios.post('/api',{
        title:title.value,
        description:description.value
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
})

