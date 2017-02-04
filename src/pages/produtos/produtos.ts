import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProdutosService, Produto } from '../../services/produtos.service'
import { AlertController} from 'ionic-angular'

@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
  providers: [ProdutosService]
})
export class ProdutosPage {

  produtos:Produto[];

  constructor(private produtosService: ProdutosService, public alertCtrl: AlertController) {
    this.produtos = produtosService.getProdutos();
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
            this.produtosService.addProduto({nome: data.nome, codigo: data.codigo, checked:false})          
            this.produtos = this.produtosService.getProdutos();
          }
        }
      ]
    });
    prompt.present();
  }

  produtoTapped(event, produto) {
    produto.checked = !produto.checked;
  }

  removerProduto(produto){
    this.produtosService.removerProduto(produto);
  }


}
