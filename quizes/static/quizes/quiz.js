console.log("Hello world quiz")
const url = window.location.href
console.log(url)
console.log(document)
const quizBox = document.getElementById('quiz-box')



$.ajax({
    type: 'GET',
    url: `${url}data`,
    success: function(response){
        console.log(response)
        const data = response.data
        data.forEach(ele=>{
            for(const [question,answers] of Object.entries(ele)){
                quizBox.innerHTML += `
                <hr>
                <div class = "mb-2">
                <b>${question}</b>
               
                </div>
                `
                answers.forEach(answer=>{
                    quizBox.innerHTML += `
                    <div>
                        <input type="radio" class="ans" id="${question}-${answer}" name="${question}"value="${answer}" >
                        <label for="${question}">${answer}</label>
                    </div>`
                })
            }
        })
    },
    error: function(response){
        console.log(error)
    }
})


const quizForm = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')


const sendData = ()=>{
    const elements = document.getElementsByClassName('ans')
    const data={}
    data['csrfmiddlewaretoken'] = csrf[0].value
    Array.from(elements).forEach(ele=>{
        if(ele.checked){
            data[ele.name] = ele.value
        }else{
            if(!data[ele.name]){
                data[ele.name] = null
            }
        }
    })

    $.ajax({
        type: 'POST',
        url: `${url}save/`,
        data: data,
        success: function(response){
            console.log(response)
        },
        error: function(response){
            console.log('error')
        }

    })
}

quizForm.addEventListener('submit',e=>{
    e.preventDefault()

    sendData()
})
