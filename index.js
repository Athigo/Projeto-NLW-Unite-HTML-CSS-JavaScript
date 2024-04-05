// array
let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego.fernandes@gmail.com",
    dataInscricao: new Date(2024, 02, 08, 16, 00),
    dataCheckIn: new Date(2024, 02, 26, 22, 40)
  },
  {
    nome: "Mayk Brito",
    email: "mayk.brito@gmail.com",
    dataInscricao: new Date(2024, 02, 28, 20, 30),
    dataCheckIn: new Date(2024, 03, 04, 12, 41)
  },
  {
    nome: "Riann Thiago",
    email: "riann.thiago@gmail.com",
    dataInscricao: new Date(2024, 02, 28, 10, 40),
    dataCheckIn: null
  },
  {
    nome: "Joana Silva",
    email: "joana.silva@example.com",
    dataInscricao: new Date(2024, 03, 10, 14, 20),
    dataCheckIn: new Date(2024, 03, 15, 10, 45)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@example.com",
    dataInscricao: new Date(2024, 03, 12, 11, 30),
    dataCheckIn: new Date(2024, 03, 18, 16, 15)
  },
  {
    nome: "Ana Souza",
    email: "ana.souza@example.com",
    dataInscricao: new Date(2024, 03, 14, 09, 45),
    dataCheckIn: null
  },
  {
    nome: "Pedro Santos",
    email: "pedro.santos@example.com",
    dataInscricao: new Date(2024, 03, 16, 18, 00),
    dataCheckIn: null
  },
  {
    nome: "Laura Lima",
    email: "laura.lima@example.com",
    dataInscricao: new Date(2024, 03, 18, 15, 10),
    dataCheckIn: new Date(2024, 03, 24, 11, 20)
  },
  {
    nome: "Rafaela Costa",
    email: "rafaela.costa@example.com",
    dataInscricao: new Date(2024, 03, 20, 10, 30),
    dataCheckIn: new Date(2024, 03, 26, 12, 35)
  },
  {
    nome: "Bruno Oliveira",
    email: "bruno.oliveira@example.com",
    dataInscricao: new Date(2024, 03, 22, 13, 40),
    dataCheckIn: new Date(2024, 03, 28, 09, 25)
  },
  {
    nome: "Mariana Rodrigues",
    email: "mariana.rodrigues@example.com",
    dataInscricao: new Date(2024, 03, 24, 16, 50),
    dataCheckIn: null
  },
  {
    nome: "Paulo Vieira",
    email: "paulo.vieira@example.com",
    dataInscricao: new Date(2024, 03, 26, 08, 15),
    dataCheckIn: new Date(2024, 04, 01, 18, 10)
  }
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
      Confirmar CheckIn
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // loop
  for (let participante of participantes) {
  output = output + criarNovoParticipante(participante)
  }
  // substituir informações do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // confirma se o participante já existe na lista
  const participanteExiste = participantes.find(
    (p) => {
      p.email == participante.email
    }
  )
  if(participanteExiste) {
    alert("E-mail já cadastrado!")
    return
  }

  // adiciona o participante à lista
  participantes = [participante, ...participantes]

  // atualiza a lista
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ''
  event.target.querySelector('[name="email"]').value = ''
}

const fazerCheckIn = (event) => {
  const resultado = confirm('Tem certeza que deseja fazer o check-in?')
  if(resultado == false) {
    return
  }
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}