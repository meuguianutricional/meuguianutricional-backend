const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let pacientes = [
    { id: 1, nome: "João Silva", objetivo: "Perda de Peso", peso: 85 },
    { id: 2, nome: "Maria Souza", objetivo: "Ganho de Massa", peso: 60 }
];

let dietas = [];

// Rota para buscar pacientes
app.get("/pacientes", (req, res) => {
    res.json(pacientes);
});

// Rota para adicionar pacientes
app.post("/pacientes", (req, res) => {
    const { nome, objetivo, peso } = req.body;
    const novoPaciente = { id: pacientes.length + 1, nome, objetivo, peso };
    pacientes.push(novoPaciente);
    res.status(201).json(novoPaciente);
});

// Rota para buscar dietas
app.get("/dietas", (req, res) => {
    res.json(dietas);
});

// Rota para adicionar dieta
app.post("/dietas", (req, res) => {
    const { pacienteId, refeicao } = req.body;
    const novaDieta = { id: dietas.length + 1, pacienteId, refeicao };
    dietas.push(novaDieta);
    res.status(201).json(novaDieta);
});

// Rota para buscar alertas (pacientes sem dieta)
app.get("/alertas", (req, res) => {
    const pacientesSemDieta = pacientes.filter(paciente => 
        !dietas.some(dieta => dieta.pacienteId === paciente.id)
    );
    res.json(pacientesSemDieta);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
