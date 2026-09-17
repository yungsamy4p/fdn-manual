// CODIGO ABIERTO BY YUNG SAMY - DISCORD: likeadversario
// GITHUB: https://github.com/yungsamy4p/fdn-portal
// INSTAGRAM: https://www.instagram.com/yungsamy4p


const COMMANDS = [
    // --- CATEGORÍA: REGISTRO Y SERVICIO ---
    {
        name: "/fichar",
        category: "registro",
        description: "Inicia o finaliza tu turno de guardia en el sistema computando las horas de servicio.",
        params: [
            { name: "tipo", desc: "Entrada o Salida de servicio" }
        ]
    },
    {
        name: "/ficharem",
        category: "registro",
        description: "Comando de supervisión para que el Estado Mayor cierre o ajuste turnos de otros efectivos.",
        params: [
            { name: "usuario", desc: "Soldado a modificar turno" }
        ]
    },
    {
        name: "/horas",
        category: "registro",
        description: "Muestra el total de horas de servicio acumuladas por un soldado en el ciclo actual.",
        params: [
            { name: "usuario", desc: "Opcional: consultar a otro miembro" }
        ]
    },
    {
        name: "/horas-minimas",
        category: "registro",
        description: "Establece o consulta el requisito de horas mínimas obligatorias para la tropa.",
        params: [
            { name: "cantidad", desc: "Horas requeridas semanales/mensuales" }
        ]
    },
    {
        name: "/historial-top",
        category: "registro",
        description: "Despliega el escalafón de honor con los efectivos que acumulan más horas en servicio.",
        params: []
    },
    {
        name: "/panel-servicio",
        category: "registro",
        description: "Despliega el panel interactivo con botones para entrar y salir de guardia rápidamente.",
        params: []
    },

    // --- CATEGORÍA: EXPEDIENTES Y DOCUMENTAL ---
    {
        name: "/expediente",
        category: "documental",
        description: "Consulta la ficha técnica de un efectivo: rango, división, placa, horas y sanciones.",
        params: [
            { name: "usuario", desc: "Mención o ID del soldado" }
        ]
    },
    {
        name: "/crear-expediente",
        category: "documental",
        description: "Genera y da de alta un nuevo expediente militar en la base de datos central.",
        params: [
            { name: "usuario", desc: "Miembro a registrar" },
            { name: "codigo", desc: "Placa o indicativo asignado" }
        ]
    },
    {
        name: "/registrar",
        category: "documental",
        description: "Asienta una anotación formal o registro de mérito en el expediente de un soldado.",
        params: [
            { name: "usuario", desc: "Soldado implicado" },
            { name: "motivo", desc: "Detalle del registro" }
        ]
    },
    {
        name: "/eliminar-registro",
        category: "documental",
        description: "Elimina una anotación o entrada errónea de la base de datos de expedientes.",
        params: [
            { name: "id_registro", desc: "Identificador del registro a suprimir" }
        ]
    },
    {
        name: "/listar-tropa",
        category: "documental",
        description: "Genera el censo general de efectivos activos clasificados por división y graduación.",
        params: []
    },
    {
        name: "/panel-bitacoras",
        category: "documental",
        description: "Publica el panel administrativo para la redacción de informes y bitácoras operativas.",
        params: []
    },

    // --- CATEGORÍA: ALTO MANDO Y ADMINISTRACIÓN ---
    {
        name: "/solicitar-firma",
        category: "mando",
        description: "Envía una propuesta formal al Estado Mayor que requiere sello y autorización digital.",
        params: [
            { name: "asunto", desc: "Título de la propuesta" },
            { name: "detalles", desc: "Explicación detallada del documento" }
        ]
    },
    {
        name: "/enlistar",
        category: "mando",
        description: "Da de alta a un nuevo recluta en el sistema y le confiere el rol base de Academia.",
        params: [
            { name: "usuario", desc: "Civil aceptado" },
            { name: "codigo", desc: "Indicativo inicial" }
        ]
    },
    {
        name: "/asignar-placa",
        category: "mando",
        description: "Modifica o asigna oficialmente el código numérico de placa militar a un efectivo.",
        params: [
            { name: "usuario", desc: "Soldado a asignar" },
            { name: "placa", desc: "Número de identificación (ej: 0004)" }
        ]
    },
    {
        name: "/baja-soldado",
        category: "mando",
        description: "Tramita la baja administrativa, retiro voluntario o expulsión de las filas de la FDN.",
        params: [
            { name: "usuario", desc: "Efectivo a degradar/retirar" },
            { name: "motivo", desc: "Causa de la desvinculación" }
        ]
    },
    {
        name: "/ck",
        category: "mando",
        description: "Registra la baja definitiva por muerte en servicio (Character Kill) y archiva el expediente.",
        params: [
            { name: "usuario", desc: "Efectivo caído" },
            { name: "causa", desc: "Informe de defunción táctico" }
        ]
    },
    {
        name: "/ver-limite-em",
        category: "mando",
        description: "Consulta las cuotas máximas y disponibilidad de plazas para oficiales del Estado Mayor.",
        params: []
    },
    {
        name: "/panel-tickets",
        category: "mando",
        description: "Despliega el centro de atención interactivo para consultas y denuncias internas.",
        params: []
    },

    // --- CATEGORÍA: DISCIPLINA Y JUSTICIA MILITAR ---
    {
        name: "/sancionar",
        category: "disciplina",
        description: "Aplica deméritos, faltas disciplinarias o arrestos militares al expediente del infractor.",
        params: [
            { name: "usuario", desc: "Efectivo sancionado" },
            { name: "falta", desc: "Infracción cometida al reglamento" }
        ]
    },
    {
        name: "/justificar",
        category: "disciplina",
        description: "Presenta una ausencia formal con antelación ante convocatorias de guardia o academia.",
        params: [
            { name: "motivo", desc: "Causa de fuerza mayor justificada" },
            { name: "fecha", desc: "Fecha de la inasistencia" }
        ]
    },
    {
        name: "/justificaciones",
        category: "disciplina",
        description: "Revisa y gestiona la lista de solicitudes de ausencia pendientes de resolución.",
        params: []
    },

    // --- CATEGORÍA: DIVISIÓN AÉREA (AIR FORCE) ---
    {
        name: "/aeronave-registrar",
        category: "aerea",
        description: "Inscribe una nueva aeronave en el hangar militar asignándole matrícula y modelo.",
        params: [
            { name: "matricula", desc: "Identificador de fuselaje" },
            { name: "modelo", desc: "Caza, helicóptero o transporte" }
        ]
    },
    {
        name: "/aeronave-consultar",
        category: "aerea",
        description: "Comprueba el estado de operatividad, hangar y piloto asignado a una aeronave.",
        params: [
            { name: "matricula", desc: "Código de cola de la unidad aérea" }
        ]
    },

    // --- CATEGORÍA: SOPORTE Y SISTEMA ---
    {
        name: "/ayuda",
        category: "soporte",
        description: "Despliega la guía de orientación rápida y funciones del bot dentro de Discord.",
        params: []
    },
    {
        name: "/add-emoji",
        category: "soporte",
        description: "Herramienta técnica para vincular nuevos emojis personalizados al bot.",
        params: [
            { name: "emoji", desc: "Código o icono a integrar" }
        ]
    },
    {
        name: "/get-emoji",
        category: "soporte",
        description: "Consulta el identificador numérico interno (ID) de un emoji del servidor.",
        params: [
            { name: "nombre", desc: "Etiqueta del emoji" }
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

renderCommands();