(function(DOM) {
    'use strict';
  
   /*
  Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
  coluna na tabela, com um botão de remover.
  Ao clicar nesse botão, a linha da tabela deve ser removida.
  Faça um pull request no seu repositório, na branch `challenge-31`, e cole
  o link do pull request no `console.log` abaixo.
  Faça um pull request, também com a branch `challenge-31`, mas no repositório
  do curso, para colar o link do pull request do seu repo.
  */

    function app(){
      return{
        init: function(){
          this.companyInfo();
          this.initEvents();
        },

        companyInfo: function companyInfo(){
          const ajax = new XMLHttpRequest();
          ajax.open('GET', 'company.json', true);
          ajax.send();
          ajax.addEventListener('readystatechange', this.getCompanyInfo, false)
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
          $tr.id = (Math.random()*100000);
          const $tdImage = document.createElement('td');
          const $image = document.createElement('img');
          const $tdModel = document.createElement('td');
          const $tdYear = document.createElement('td');
          const $tdPlate = document.createElement('td');
          const $tdColor = document.createElement('td');
          const $removeIten = document.createElement('td');

          $image.src = new DOM('.image').get().value;
          $tdModel.textContent = new DOM('.model').get().value;
          $tdYear.textContent = new DOM('.year').get().value;
          $tdPlate.textContent = new DOM('.plate').get().value;
          $tdColor.textContent = new DOM('.color').get().value;
          
          this.createDeleteButton($removeIten, $tr.id);
          this.createTable($tdImage, $image);
          this.createTable($tr, $tdImage, $tdModel, $tdYear, $tdPlate, $tdColor, $removeIten)
          
          return $fragment.appendChild($tr);
        },

        createTable(parentElement){
          for(let elements of arguments){
            if(elements !== parentElement) parentElement.appendChild(elements);
          }
        },

        createDeleteButton($removeIten, id){
          const $removeButton = document.createElement('button');
          $removeButton.innerHTML = 'Remover';
          $removeButton.addEventListener('click',() => this.handleDelete(id));
          $removeIten.appendChild($removeButton);
        },

        handleDelete: function(id){
          const childElement = document.getElementById(id); 
          const table = document.querySelector('.table')//.removeChild(childElement);
          table.removeChild(childElement);
        },
        
        getCompanyInfo: function getCompanyInfo(){
          if(!app().isReady.call(this)) return;

          const data = JSON.parse(this.responseText);
          const $companyName = (new DOM('.company-name')).get();
          const $companyNumber = (new DOM('.company-number')).get();
          $companyName.innerHTML = data.name;
          $companyNumber.innerHTML = data.phone;
        },

        isReady: function isReady(){
          return (this.readyState === 4 && this.status === 200)
        }
      };
    }
  
    app().init();
  })(window.DOM);