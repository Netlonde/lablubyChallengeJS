(function(DOM) {
    'use strict';
  
    /*
    Vamos estruturar um pequeno app utilizando módulos.
    Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
    A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
    seguinte forma:
    - No início do arquivo, deverá ter as informações da sua empresa - nome e
    telefone (já vamos ver como isso vai ser feito)
    - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
    um formulário para cadastro do carro, com os seguintes campos:
      - Imagem do carro (deverá aceitar uma URL)
      - Marca / Modelo
      - Ano
      - Placa
      - Cor
      - e um botão "Cadastrar"
    Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
    carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
    aparecer no final da tabela.
    Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
    empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
    Dê um nome para a empresa e um telefone fictício, preechendo essas informações
    no arquivo company.json que já está criado.
    Essas informações devem ser adicionadas no HTML via Ajax.
    Parte técnica:
    Separe o nosso módulo de DOM criado nas últimas aulas em
    um arquivo DOM.js.
    E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
    que será nomeado de "app".
    */

    function app(){
      return{
        init: function(){
          console.log("inicou") 
          this.companyInfo();
          this.initEvents();
        },

        companyInfo: function companyInfo(){
          const ajax = new XMLHttpRequest();
          ajax.open('GET', 'company.json', true);
          ajax.send();
          ajax.addEventListener('readystatechange', this.getCompanyInfo)
        },

        initEvents: function initEvents(){
          const $form = new DOM('.form');

          $form.on('submit', this.handleSubmit);
        },

        handleSubmit: function handleSubmit(e){
          e.preventDefault();

          const $table = new DOM('.table').get();

          $table.appendChild(app().newCar());
        },

        newCar: function newCar(){
          const $fragment = document.createDocumentFragment();
          const $tr = document.createElement('tr');
          const $tdImage = document.createElement('td');
          const $image = document.createElement('img');
          const $tdModel = document.createElement('td');
          const $tdYear = document.createElement('td');
          const $tdPlate = document.createElement('td');
          const $tdColor = document.createElement('td');

          $image.src = new DOM('.image').get().value;
          $tdModel.textContent = new DOM('.model').get().value;
          $tdYear.textContent = new DOM('.year').get().value;
          $tdPlate.textContent = new DOM('.plate').get().value;
          $tdColor.textContent = new DOM('.color').get().value;

          
          $tdImage.appendChild($image);
          $tr.appendChild($tdImage);
          $tr.appendChild($tdModel);
          $tr.appendChild($tdYear);
          $tr.appendChild($tdPlate);
          $tr.appendChild($tdColor);
          
          return $fragment.appendChild($tr);
        },
        
        getCompanyInfo: function getCompanyInfo(){
          if(app().isReady.call(this)) return;

          const data = JSON.parse(this.responseText);
          const $companyName = (new DOM('.company-name')).get();
          const $companyNumber = (new DOM('.company-number')).get();
          $companyName.innerHTML = data.name;
          $companyNumber.innerHTML = data.phone;
        },

        isReady: function isReady(){
          return (this.readState === 4 && this.status === 200)
        }
      };
    }
  
    app().init();
  })(window.DOM);