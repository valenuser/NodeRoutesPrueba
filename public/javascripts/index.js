const buttonSee = document.getElementById('seeDB')
const data = document.querySelector('#data')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const updateTask = document.querySelector('#updateTask')


const card = (dataLoad)=>{
    const div = document.createElement('div')
    div.innerHTML = `
        <div>
            <h1>${dataLoad.title}</h1>
            <p>${dataLoad.description}</p>
            <button data-id=${dataLoad._id} id="update" class="buttonUpdateJS">Update</button>
            <button data-id=${dataLoad._id} id="delete">Delete</button>
        </div>
    `

    const Delete = div.querySelector('#delete')
    const Update = div.querySelector('#update')


    Update.addEventListener('click',()=>{
        axios.get('/api/'+Update.dataset.id)
            .then((response)=>{
                console.log(response);
                title.value = response.data.title
                description.value = response.data.description
                updateTask.dataset.id = response.data._id
            })


        updateTask.style.display='flex'
        Update.style.display='none'
    })



    Delete.addEventListener('click',()=>{
        axios.delete('/api/'+Delete.dataset.id)
            .then((response) =>{
                console.log(response);
            })
            .catch((error)=>{
                console.log(error);
            })
    })

    return div
}



axios.get('/api')
    .then(function (response) {
    // handle success
        const dataLoad = response.data
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

updateTask.addEventListener('click',()=>{
    axios.put('/api/'+updateTask.dataset.id,{
        title:title.value,
        description:description.value
    })

        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })


    updateTask.style.display='none'

    axios.get('/api')
        .then((response)=>{
            data.innerHTML = ''
            const dataLoad = response.data
            dataLoad.forEach((dataLoad)=>{
                data.append(card(dataLoad))
            })
        })
        .catch((error)=>{
            console.log(error);
        })


    
})