// Adiciona um Evento de Clique nos Elementos com a Classe 'select'
document.querySelectorAll('.select').forEach(select => {
    select.addEventListener('click', () => {
        const selectBox = select.parentElement;
        selectBox.classList.toggle('open');
    });
});

// Adiciona um Evento de Mudança nas Opções de Checkbox e Radio
document.querySelectorAll('.options input[type="checkbox"], .options input[type="radio"]').forEach(option => {
    option.addEventListener('change', () => {
        const selectBox = option.closest('.select-box');
        const select = selectBox.querySelector('.select');

        if (option.type === 'checkbox') {
            const selectedOptions = Array.from(selectBox.querySelectorAll('input[type="checkbox"]:checked'))
                .map(checkbox => checkbox.value);
            select.textContent = selectedOptions.length ? selectedOptions.join(', ') : 'Escolha seus gêneros preferidos';
        } else {
            select.textContent = option.value;
            selectBox.classList.remove('open');
        }
    });
});

// Adiciona um Evento de Clique para Fechar a Caixa de Seleção ao Clicar Fora Dela
document.addEventListener('click', (event) => {
    const isClickInside = event.target.closest('.select-box');
    if (!isClickInside) {
        document.querySelectorAll('.select-box').forEach(selectBox => {
            selectBox.classList.remove('open');
        });
    }
});
