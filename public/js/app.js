console.log('Client Side Javascript Code is Loading');
const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=searchElement.value
    const dynamicUrl='/show-weather?address='+location

    messageOne.textContent='Loading..'
    messageTwo.textContent=''


    fetch(dynamicUrl).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
         // return  console.log(data.error)
        messageOne.textContent=data.error
        }else{
         // console.log(data.location)
        // console.log(data.forcast)
        messageOne.textContent=data.location
        messageTwo.textContent=data.forcast

        }

    })
})

})