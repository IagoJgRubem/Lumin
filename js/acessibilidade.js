// CSS/acessibilidade.js - Scripts de Acessibilidade

document.addEventListener('DOMContentLoaded', () => {
    // Sistema ARIA Dinâmico
    const initAcessibilidade = () => {
        // 1. Rotular elementos interativos
        document.querySelectorAll('.button').forEach(btn => {
            const label = btn.textContent.trim() || 'Botão';
            btn.setAttribute('aria-label', `${label} - Pressione Enter para ativar`);
        });

        // 2. Atualização de barras de progresso
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const percentage = (bar.clientWidth / bar.parentElement.clientWidth * 100).toFixed(0);
            bar.setAttribute('aria-valuenow', percentage);
            bar.setAttribute('aria-valuemin', '0');
            bar.setAttribute('aria-valuemax', '100');
        });

        // 3. Controles de Áudio
        const audioFallback = document.getElementById('audio-fallback');
        const audioSupported = !!document.createElement('audio').canPlayType;
        
        if(!audioSupported) {
            audioFallback.classList.remove('hidden');
            speak('Seu navegador não suporta reprodução de áudio. Ativando modo texto.');
        }
    };

    // Inicialização
    initAcessibilidade();

    // 4. Atualização contínua para SPAs
    if(typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(updateAriaLabels);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false
        });
    }
});

// Função de atualização ARIA
function updateAriaLabels() {
    document.querySelectorAll('[data-aria-update]').forEach(el => {
        const text = el.textContent;
        el.setAttribute('aria-label', text);
    });
}

// Sistema de fala
function speak(text, priority = 'polite') {
    const ariaLive = document.getElementById('aria-live');
    if(ariaLive) {
        ariaLive.setAttribute('aria-live', priority);
        ariaLive.textContent = text;
    }
}

// Export para módulos (se necessário)
if(typeof module !== 'undefined' && module.exports) {
    module.exports = { updateAriaLabels, speak };
}
function alternarTema() {
    const body = document.body;
    const temaAtivo = body.classList.toggle('tema-escuro');
    const botaoTema = document.getElementById('botao-tema');
    
    // Atualize o ARIA para sincronizar com o tema
    botaoTema.setAttribute('aria-pressed', temaAtivo);
    botaoTema.setAttribute('aria-label', temaAtivo ? 'Tema escuro ativo' : 'Tema claro ativo');
    
    // Mantenha o ícone dinâmico
    botaoTema.innerHTML = temaAtivo ? '🌞 Tema' : '🌒 Tema';
}
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
});