import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProdutosService, Produto } from '../../services/produtos.service'
import { AlertController} from 'ionic-angular'
import {Observable} from 'rxjs/Observable'
import { ProdutoPage } from '../produto/produto'

@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
  providers: [ProdutosService]
})
export class ProdutosPage {

  produtos:Observable<Produto[]>;

  constructor(private produtosService: ProdutosService, 
              public alertCtrl: AlertController,
              public navCtrl: NavController) {
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
