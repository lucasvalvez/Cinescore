document.getElementById('usuarioForm').onsubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.target);

    if (formData.get("senha") == formData.get("confirmarSenha")) {
        const data = {
            nome: formData.get("nomeDeUsuario"),
            email: formData.get("email"),
            dataNascimento: formData.get("dataNascimento"),
            senha: formData.get("senha")
        };

        try {

            const response = await fetch('http://localhost:8080/api/usuarios/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
                window.location.href = "./usuario_login.html";
            } else {
                const errorMessage = await response.text();
                console.error('Erro ao cadastrar usuário:', errorMessage);
                alert(`Erro: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    } else {
        alert('As senhas não são iguais.');
    }
};
