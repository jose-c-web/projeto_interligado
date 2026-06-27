firebase.initializeApp(firebaseConfig);
const database = firebase.database();


document.getElementById('cadastroMaquinas').addEventListener('submit',function(e) {
    e.preventDefault(); 
    const nomeMaquina = document.getElementById('nomeMaquina').value;
    const modeloMaquina = document.getElementById('modelo').value;
    const numeroDeSerie = document.getElementById('numeroSerie').value;

   
    database.ref('maquinas').push({
        nomeMaquina:nomeMaquina,
        modeloMaquina:modeloMaquina,
        numeroDeSerie:numeroDeSerie
    })
    .then(() => {
        document.getElementById('dadosmaquina').innerText = 'Dados enviados com sucesso!';
        this.reset(); 
    })
    .catch(error => {
        document.getElementById('dadosmaquina').innerText = 'Erro:' +error.message;
    });
});

document.getElementById('ordemServico').addEventListener('submit',function(e) {
    e.preventDefault(); 
    const maquinaOs = document.getElementById('maquinaOS').value;
    const descricaoOs = document.getElementById('descricaoOS').value;
    const statusOs = document.getElementById('statusOS').value;

    
    database.ref('ordemservico').push({
        maquinaOs:maquinaOs,
        descricaoOs:descricaoOs,
        statusOs:statusOs
    })
    .then(() => {
        document.getElementById('ordem_servico').innerText = 'Dados enviados com sucesso!';
        this.reset(); //Reinicia o formulário
    })
    .catch(error => {
        document.getElementById('ordem_servico').innerText = 'Erro:' +error.message;
    });
});


    
document.getElementById('btnConsultarMaquinas').addEventListener('click', function() {
      const listaMaquina = document.getElementById('listaMaquina');
      listaMaquina.innerHTML = "<p>Carregando...</p>";


      const MaquinasRef = database.ref('maquinas');
      MaquinasRef.once('value')
        .then(snapshot => {
          const dados1 = snapshot.val();
          exibirMaquinas(dados1, listaMaquina);
        })
        .catch(error => {
          listaMaquina.innerHTML = "<p>Erro ao carregar dados: " + error.message + "</p>";
        });
    });


   
    document.getElementById('btnBuscarMaquinas').addEventListener('click', function() {
      const MaquinaBusca = document.getElementById('buscaNomeMaquinas').value.trim();
      const listaMaquina = document.getElementById('listaMaquina');
      listaMaquina.innerHTML = "<p>Buscando...</p>";


      if (MaquinaBusca === "") {
        listaMaquina.innerHTML = "<p>Digite um nome para buscar.</p>";
        return;
      }


     
      const MaquinasRef = database.ref('maquinas')
        .orderByChild('nomeMaquina')
        .equalTo(MaquinaBusca);


      MaquinasRef.once('value')
        .then(snapshot => {
          const dadosMauqinas = snapshot.val();
          if (dadosMauqinas) {
            exibirMaquinas(dadosMauqinas, listaMaquina);
          } else {
            listaMaquina.innerHTML = `<p>Nenhum usuário encontrado com o nome "${nomeBusca}".</p>`;
          }
        })
        .catch(error => {
          listaMaquina.innerHTML = "<p>Erro na busca: " + error.message + "</p>";
        });
    });


   
    function exibirMaquinas(dadosMauqinas, listaMaquina) {
      listaMaquina.innerHTML = "";
      if (!dadosMauqinas) {
        listaMaquina.innerHTML = "<p>Nenhum usuário cadastrado ainda.</p>";
        return;
      }


      for (let id in dadosMauqinas) {
        const maquina = dadosMauqinas[id];
        const card = document.createElement('div');
        card.style.border = "1px solid #ccc";
        card.style.padding = "10px";
        card.style.borderRadius = "5px";
        card.style.marginBottom = "10px";
        card.style.background = "#f9f9f9";
        card.innerHTML = `
          <strong>Máquina:</strong> ${maquina.nomeMaquina}<br>
          <strong>Modelo:</strong> ${maquina.modeloMaquina}<br>
          <strong>Número de Série:</strong> ${maquina.numeroDeSerie}
        `;
        listaMaquina.appendChild(card);
      }
    }

    document.getElementById('btnConsultarUsuarios').addEventListener('click', function() {
      const listaUsuario = document.getElementById('listaUsuario');
      listaUsuario.innerHTML = "<p>Carregando...</p>";


      const UsuarioRef = database.ref('usuarios');
      UsuarioRef.once('value')
        .then(snapshot => {
          const dados2 = snapshot.val();
          exibirUsuarios(dados2, listaUsuario);
        })
        .catch(error => {
          listaUsuario.innerHTML = "<p>Erro ao carregar dados: " + error.message + "</p>";
        });
    });


   
    document.getElementById('btnBuscarUsuario').addEventListener('click', function() {
      const UsuarioBusca = document.getElementById('buscaNomeUsuario').value.trim();
      const listaUsuario = document.getElementById('listaUsuario');
      listaUsuario.innerHTML = "<p>Buscando...</p>";


      if (UsuarioBusca === "") {
        listaUsuario.innerHTML = "<p>Digite um nome para buscar.</p>";
        return;
      }


     
      const UsuarioRef = database.ref('usuarios')
        .orderByChild('nomeUsuario')
        .equalTo(UsuarioBusca);


      UsuarioRef.once('value')
        .then(snapshot => {
          const dadosUsuario = snapshot.val();
          if (dadosUsuario) {
            exibirUsuarios(dadosUsuario, listaUsuario);
          } else {
            listaUsuario.innerHTML = `<p>Nenhum usuário encontrado com o nome "${nomeBusca}".</p>`;
          }
        })
        .catch(error => {
          listaUsuario.innerHTML = "<p>Erro na busca: " + error.message + "</p>";
        });
    });


   
    function exibirUsuarios(dadosUsuario, listaUsuario) {
      listaUsuario.innerHTML = "";
      if (!dadosUsuario) {
        listaUsuario.innerHTML = "<p>Nenhum usuário cadastrado ainda.</p>";
        return;
      }


      for (let id in dadosUsuario) {
        const usuario = dadosUsuario[id];
        const card1 = document.createElement('div');
        card1.style.border = "1px solid #ccc";
        card1.style.padding = "10px";
        card1.style.borderRadius = "5px";
        card1.style.marginBottom = "10px";
        card1.style.background = "#f9f9f9";
        card1.innerHTML = `
          <strong>Nome:</strong> ${usuario.nomeUsuario}<br>
          <strong>Senha:</strong> ${usuario.SenhaUsuario}<br>
          <strong>Tipo de Usuário:</strong> ${usuario.TipoUsuario}
        `;
        listaUsuario.appendChild(card1);
      }
    }


      document.getElementById('btnConsultarOS').addEventListener('click', function() {
      const listaOS = document.getElementById('listaOS');
      listaOS.innerHTML = "<p>Carregando...</p>";


      const OSRef = database.ref('ordemservico');
      OSRef.once('value')
        .then(snapshot => {
          const dadosOS = snapshot.val();
          exibirOS(dadosOS, listaOS);
        })
        .catch(error => {
          listaOS.innerHTML = "<p>Erro ao carregar dados: " + error.message + "</p>";
        });
    });




    
    function exibirOS(dadosOS, listaOS) {
      listaOS.innerHTML = "";
      if (!dadosOS) {
        listaOS.innerHTML = "<p>Nenhum usuário cadastrado ainda.</p>";
        return;
      }


      for (let id in dadosOS) {
        const OS = dadosOS[id];
        const card = document.createElement('div');
        card.style.border = "1px solid #ccc";
        card.style.padding = "10px";
        card.style.borderRadius = "5px";
        card.style.marginBottom = "10px";
        card.style.background = "#f9f9f9";
        card.innerHTML = `
          <strong>Máquina:</strong> ${OS.maquinaOs}<br>
          <strong>Descrição:</strong> ${OS.descricaoOs}<br>
          <strong>Status:</strong> ${OS.statusOs}
        `;
        listaOS.appendChild(card);
      }
    }
