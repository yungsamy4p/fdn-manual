const COMMANDS = [
    {
        name: "/fichar entrada",
        category: "registro",
        description: "Inicia tu turno de guardia en el sistema. Registra hora de entrada y notifica en el canal de actividad.",
        params: []
    },
    {
        name: "/fichar salida",
        category: "registro",
        description: "Finaliza el turno de servicio. Computa los minutos operados y los envía al registro general de SQL.",
        params: []
    },
    {
        name: "/ficharem",
        category: "registro",
        description: "Comando reservado para que el Estado Mayor ajuste o cierre manualmente un turno colgado de un efectivo.",
        params: [
            { name: "usuario", desc: "Mención del miembro a modificar" },
            { name: "accion", desc: "Forzar cierre o anulación de turno" }
        ]
    },
    {
        name: "/expediente",
        category: "documental",
        description: "Consulta el historial de un soldado: horas acumuladas, sanciones activas, división y rango actual.",
        params: [
            { name: "efectivo", desc: "Soldado a consultar (por mención o ID)" }
        ]
    },
    {
        name: "/solicitar-firma",
        category: "mando",
        description: "Envía una propuesta formal al Estado Mayor Supremo con botones interactivos para su autorización o rechazo.",
        params: [
            { name: "asunto", desc: "Título o resumen de la petición" },
            { name: "detalles", desc: "Explicación detallada del requerimiento" }
        ]
    },
    {
        name: "/enlistar",
        category: "mando",
        description: "Asigna las credenciales iniciales, rol de Recruit y ficha militar básica a un civil aceptado por formulario.",
        params: [
            { name: "usuario", desc: "Usuario admitido en el servidor" },
            { name: "codigo", desc: "Indicativo o placa táctica asignada" }
        ]
    },
    {
        name: "/justificar",
        category: "academia",
        description: "Registra una inasistencia formal con antelación ante una convocatoria oficial de la Academia Militar.",
        params: [
            { name: "motivo", desc: "Razón de fuerza mayor de la ausencia" },
            { name: "fecha", desc: "Día de la sesión a justificar" }
        ]
    },
    {
        name: "/sancionar",
        category: "academia",
        description: "Aplica deméritos o apercibimientos disciplinarios al expediente de un recluta o efectivo de tropa.",
        params: [
            { name: "usuario", desc: "Mención del sancionado" },
            { name: "infraccion", desc: "Falta al reglamento o Código Militar" }
        ]
    }
];

const commandGrid = document.getElementById('commandGrid');
const searchInput = document.getElementById('searchInput');
const pills = document.querySelectorAll('.pill');
const toast = document.getElementById('toast');

let activeCategory = 'all';

function renderCommands(filterText = '') {
    commandGrid.innerHTML = '';
    
    const filtered = COMMANDS.filter(cmd => {
        const matchesCategory = (activeCategory === 'all' || cmd.category === activeCategory);
        const matchesText = cmd.name.toLowerCase().includes(filterText.toLowerCase()) ||
                            cmd.description.toLowerCase().includes(filterText.toLowerCase());
        return matchesCategory && matchesText;
    });

    if (filtered.length === 0) {
        commandGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 3rem 0;">
                <p>No se encontraron directivas ni comandos que coincidan con la búsqueda.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(cmd => {
        const card = document.createElement('div');
        card.className = 'command-card';

        let paramsHTML = '';
        if (cmd.params.length > 0) {
            paramsHTML = `
                <div class="params-box">
                    ${cmd.params.map(p => `
                        <div class="param-item">
                            <span class="param-name">[${p.name}]</span>:${p.desc}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        card.innerHTML = `
            <div class="card-top">
                <span class="cmd-badge">${cmd.category}</span>
                <div class="cmd-title" onclick="copyToClipboard('${cmd.name}')" title="Clic para copiar comando">
                    <span>${cmd.name}</span>
                    <span style="font-size: 0.8rem; opacity: 0.5;">📋</span>
                </div>
                <p class="cmd-desc">${cmd.description}</p>
            </div>
            ${paramsHTML}
        `;

        commandGrid.appendChild(card);
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copiado: ${text}`);
    });
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

searchInput.addEventListener('input', (e) => {
    renderCommands(e.target.value);
});

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.category;
        renderCommands(searchInput.value);
    });
});

// Render inicial
renderCommands();