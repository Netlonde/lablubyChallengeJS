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
      const ajax = new XMLHttpRequest();
      const site = 'http://localhost:3001/car';
      let car = new Array();

      return{
        init: function(){
          this.companyInfo();
          setTimeout(() => this.initEvents(),300)
        },

        companyInfo: function companyInfo(){
          ajax.open('GET', 'company.json', true);
          ajax.send();
          ajax.addEventListener('readystatechange', this.getCompanyInfo, false)
        },

        initEvents: function initEvents(){
          const $form = new DOM('.form');
          $form.on('submit', this.handleSubmit);

          this.getCarInServer();
        },

        handleSubmit: function handleSubmit(e){
          e.preventDefault();

          app().newCar();
        },

        newCar: function newCar(){
          const $tr = document.createElement('tr');
          $tr.id = (Math.random()*100000);
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
          
          this.createDeleteButton($removeIten, $tdPlate.textContent);

          try{
            this.createCarInServer($image.src, $tdModel.textContent, 
                                   $tdYear.textContent, $tdPlate.textContent, 
                                   $tdColor.textContent); 
          }catch{
            return;
          }
            
        },

        addCarOnTable(car){
          const $table = new DOM('.table').get();
          const $fragment = document.createDocumentFragment();
          const $tr = document.createElement('tr');
          const $tdImage = document.createElement('td');
          const $image = document.createElement('img');
          const $tdModel = document.createElement('td');
          const $tdYear = document.createElement('td');
          const $tdPlate = document.createElement('td');
          const $tdColor = document.createElement('td');
          const $removeIten = document.createElement('td');

          $image.src = car.image;
          $tdModel.textContent = car.brandModel;
          $tdYear.textContent = car.year;    
          $tdPlate.textContent = car.plate;
          $tdColor.textContent = car.color;

          if($tdPlate.textContent)
            this.createDeleteButton($removeIten, $tdPlate.textContent);

          this.createTable($tdImage, $image);
          this.createTable($tr, $tdImage, $tdModel, $tdYear, $tdPlate, $tdColor, $removeIten);
          this.createTable($fragment, $tr);
          this.createTable($table ,$fragment);
        },

        createCarInServer(image, brandModel, year, plate, color){
          ajax.open('POST', site);
          ajax.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

          const carData = JSON.stringify({
            image,
            brandModel,
            year,
            plate, 
            color
          })

          ajax.send(carData);
        },

        getCarInServer(){
          ajax.open('GET', site);
          ajax.send();

          ajax.addEventListener('readystatechange', () => {
            if(ajax.readyState === 4 && ajax.status === 200) {
              let res = JSON.parse(ajax.responseText);
              res.map((carSever) => {
                car.push(carSever);
              });
              
              car.forEach((carElement) => {
                this.addCarOnTable(carElement);
              })
            }
          }, false)
        },

        createTable(parentElement){
          for(let elements of arguments){
            if(elements !== parentElement) parentElement.appendChild(elements);
          }
        },

        createDeleteButton($removeIten, plate){
          const $removeButton = document.createElement('button');
          $removeButton.innerHTML = 'Remover';
          $removeButton.addEventListener('click',() => this.handleDelete(plate));
          $removeIten.appendChild($removeButton);
        },

        handleDelete: function(plate){
          const removeCarDatabase = new XMLHttpRequest();
          removeCarDatabase.open('DELETE', site);
          removeCarDatabase.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
          removeCarDatabase.send(`plate=${plate}`);
        },
        
        getCompanyInfo: function getCompanyInfo(){
          if(!app().isReady.call(this)) return;

          const data = JSON.parse(this.responseText);

          
          if(data.name !== undefined && data.phone !== undefined){
            const $companyName = (new DOM('.company-name')).get();
            const $companyNumber = (new DOM('.company-number')).get();
            $companyName.innerHTML = data.name;
            $companyNumber.innerHTML = data.phone;
          } 
        },

        isReady: function isReady(){
          return (this.readyState === 4 && this.status === 200)
        }
      };
    }
  
    app().init();
  })(window.DOM);