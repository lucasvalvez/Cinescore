document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        primeiroNome: formData.get("firstname"),
        ultimoNome: formData.get("lastname"),
        email: formData.get("email"),
        senha: formData.get("password")
    };


    if (data.email == "admin@cinescore.com") {
        if(data.senha == "admin123"){
            alert('Usuário logado com sucesso!');
            localStorage.setItem("emailUsuario","admin@cinescore.com");
            window.location.href = "./cine.html";
        }else{
            alert(`Credenciais invalidas.`); 
        }
    } else {
        try {
            const response = await fetch('http://localhost:8080/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Usuário logado com sucesso!');
                localStorage.setItem("emailUsuario", data.email);
                window.location.href = "./cine.html";
            } else {
                const errorMessage = await response.text();
                alert(`Erro: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

};