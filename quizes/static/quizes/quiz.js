console.log("Hello world quiz")
const url = window.location.href
console.log(url)
console.log(document)
const quizBox = document.getElementById('quiz-box')
const scoreBox = document.getElementById('score-box')
const resultBox = document.getElementById('result-box')



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
            const results = response.results
            console.log(results)
            quizForm.classList.add("d-none")

            scoreBox.innerHTML = `${response.passed ? 'Congratulations ! ': 'OOps...:('} Your Score is ${response.score} %`
            results.forEach(res=>{
                const resDiv = document.createElement("div")
                for (const [question,resp] of Object.entries(res)){
                    resDiv.innerHTML += question
                    const cls = ['container', 'p-2','h6']
                    resDiv.classList.add(...cls)

                    if(resp=="not answered"){
                        resDiv.innerHTML +='-not answered'
                        resDiv.classList.add('bg-danger')
                    }else{
                        const answer = resp['answered']
                        const correct = resp['correct_answer']
                        if (answer == correct) {
                            resDiv.classList.add('bg-success')
                            resDiv.innerHTML += ` | answered: ${answer}`
                        }else{
                            resDiv.classList.add('bg-danger')
                            resDiv.innerHTML += ` | correct-answer: ${correct}`
                            resDiv.innerHTML += ` | answered: ${answer} `
                        }
                        
                    }
                }
                
                resultBox.append(resDiv)
            })
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
