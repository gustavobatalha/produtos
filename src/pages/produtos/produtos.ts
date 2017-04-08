import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProdutosService, Produto } from '../../services/produtos.service'
import { AlertController} from 'ionic-angular'
import {Observable} from 'rxjs/Observable'
import { ProdutoPage } from '../produto/produto'
import { BarcodeScanner } from '@ionic-native/barcode-scanner'

@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
  providers: [ProdutosService]
})
export class ProdutosPage {

  produtos:Observable<Produto[]>;
  filtrar:String;

  constructor(private produtosService: ProdutosService, 
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              public barcodeScanner: BarcodeScanner) {
  }

  ionViewWillEnter(){
    this.produtos = this.produtosService.get();
  }

  addProduto(){
    let prompt = this.alertCtrl.create({
      title: 'Adicionar Produto',
      inputs: [
        {name:'nome',placeholder:'Digite o nome'},
        {name:'codigo',placeholder:'Digite o codigo'}
      ],
      buttons:[
        {text: "Cancelar"},
        {
          text:"Salvar",
          handler: data => {
            this.produtosService.add({nome: data.nome, codigo: data.codigo, checked:false})          
            this.produtos = this.produtosService.get()
          }
        }
      ]
    });
    prompt.present();
  }

  buscarProduto(){

    this.barcodeScanner.scan().then((barcodeData) => {
      this.filtrar = barcodeData.text
    }, (err) => {
        // An error occurred
    });
  }

  checkFiltro(item){

    if(typeof this.filtrar == 'undefined'){
      return true;
    }else if(item.codigo == this.filtrar){
      return true;
    }else{
      return false;
    }
    
    
  }
  

  produtoTapped(event, produto) {
    produto.checked = !produto.checked;
  }

  removerProduto(ev, produto){
    this.produtosService.remove(produto.id)
      .subscribe(()=> this.produtos = this.produtosService.get());
    ev.stopPropagation();      
  }

  visualiar(ev, produto: Produto){
    this.navCtrl.push(ProdutoPage, {produto: produto});
    ev.stopPropagation();          
  }


}
