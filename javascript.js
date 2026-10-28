var res = window.document.getElementById("notas")
var camtext = window.document.getElementById("itext")
var title = window.document.getElementById("ititulo")
var idtext = 1

camtext.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});

function criar() {
    
    const color = ["#fec870", "#fd9a71", "#e3ed8d", "#b591fb", "#00d3fe"]

    var random = Math.floor(Math.random() * color.length)

    if (camtext.value.trim() === "" || title.value.trim() === "") {
        alert("Escreve alguma coisa!");
        return;
    }

    var guardar = JSON.parse(localStorage.getItem("conteudo")) || []

    guardar.push({
        id: idtext,
        titulo: title.value,
        texto: camtext.value,
        cor: color[random]
    })

    localStorage.setItem("conteudo", JSON.stringify(guardar))

    var div = window.document.createElement("div")
    div.dataset.id = idtext
    div.className = "dclass"
    div.style.backgroundColor = color[random]

    var h1 = window.document.createElement('h1')
    h1.innerText = title.value
    h1.className = "titulo"

    var p = window.document.createElement("p")
    p.innerText = camtext.value

    var apagar = window.document.createElement("button")
    apagar.innerText = '🗑️'
    apagar.className = "apagar"

    var edit = document.createElement("button")
    edit.innerText = '✏️'
    edit.className = "editar"

    div.appendChild(h1)
    div.appendChild(p)
    div.appendChild(apagar)
    div.appendChild(edit)
    

    res.appendChild(div)

    title.value = ""

    apagar.addEventListener("click", function(event) {
        
        fclear(event)
    })

    edit.addEventListener('click', function(event){
        editar(event)
    })

    camtext.value = "";
    camtext.style.height = "auto";

    idtext++
    
}
function editar (event) {
    var botao = event.currentTarget
    botao.disabled = true

    var input = document.createElement("textarea")

    input.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });

    var send = document.createElement("button")
    send.innerText = "⌯⌲"
    send.className = "enviar"
    
    
    var div = botao.parentElement

    var id = Number(div.dataset.id)

    var p = div.querySelector("p")

    
    div.appendChild(input)
    div.appendChild(send)

    input.value = p.innerText
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    send.onclick = function(){

        var guardar = JSON.parse(localStorage.getItem("conteudo")) || []

        var posicao = guardar.findIndex(function(dado){
            return dado.id === id
        })

        if(posicao === -1) {
            return
        }
        guardar[posicao].texto = input.value

        localStorage.setItem('conteudo', JSON.stringify(guardar))

        p.innerText = input.value

        send.remove()
        input.remove()

       input.style.height = "auto";
       botao.disabled = false
    }  
    
}

function fclear(event) {

    var guardar = JSON.parse(localStorage.getItem("conteudo")) || []
    
    var btn_atual = event.currentTarget
    var elemento_pai = btn_atual.parentElement
    var id = Number(elemento_pai.dataset.id)
    
    var posicao = guardar.findIndex(function(dado){
        return dado.id === id
    })
    
    if (posicao !== -1) {
        guardar.splice(posicao, 1)
    }

    localStorage.setItem("conteudo", JSON.stringify(guardar))

    elemento_pai.remove()

    

}



window.onload = function() {
    
    var jsondados = localStorage.getItem("conteudo")

    var dados = JSON.parse(jsondados) || []

    var res = window.document.getElementById("notas")

    var idatual = 0

    dados.forEach(function(dado) {
        var div = window.document.createElement("div")
        div.dataset.id = dado.id
        div.className = "dclass"
        div.style.backgroundColor = dado.cor

        var h1 = window.document.createElement('h1')
        h1.innerText = dado.titulo


        var p = window.document.createElement("p")
        p.innerText = dado.texto

        var apagar = window.document.createElement("button")
        apagar.innerText = '🗑️'
        apagar.className = "apagar"

        var edit = document.createElement("button")
        edit.innerText = '✏️'
        edit.className = "editar"

         div.appendChild(h1)
         div.appendChild(p)
         div.appendChild(apagar)
         div.appendChild(edit)
         
         res.appendChild(div)
        
         apagar.addEventListener("click", fclear)
         edit.addEventListener('click', editar)
         
        if (dado.id > idatual) {
            idatual = dado.id
        }
    });

    idtext = idatual + 1
}



