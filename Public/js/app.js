const element_one=document.getElementById('para-1')
const element_two=document.getElementById('para-2')
const btn=document.getElementById("btn")


btn.addEventListener('click',()=>{
const val= document.getElementById("myText").value;
    console.log('clk')
    console.log(val)
    fetch(`http://localhost:3000/weather?address=${val}`).then((response)=>{
        response.json().then((data)=>{
            element_one.innerText=data.location
            element_two.innerText=data.forecast
        })
    })
})

