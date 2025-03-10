
document.getElementById('btnSalvar').addEventListener('click', function () {
    const data = {
        primeiroNome: document.getElementById('txtNome').innerText,
        email: document.getElementById('txtEmail').innerText,
        senha: document.getElementById('txtSenha').innerText
    };

    try {    

        const response = fetch(`http://localhost:8080/api/usuarios/alterar?email=${localStorage.getItem("emailUsuario")}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!'); 
            window.location.href = "./usuario_login.html";
        } else {
            const errorMessage = response.text(); 
            console.error('Erro ao cadastrar usuário:', errorMessage);
            alert(`Erro: ${errorMessage}`); 
        }    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});



window.addEventListener("load",  async function () {

    document.getElementById('txtEmail').value = localStorage.getItem("emailUsuario");

});
