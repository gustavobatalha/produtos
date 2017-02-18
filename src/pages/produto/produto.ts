import {Component} from '@angular/core'
import {Produto, ProdutosService} from '../../services/produtos.service'
import {NavParams, NavController} from 'ionic-angular'

@Component({
    selector:'pag-produto',
    templateUrl:'produto.html',
    providers: [ProdutosService]
})
export class ProdutoPage{
    produto: Produto;
    constructor(private navParams: NavParams, 
                public produtoService: ProdutosService,
                public navCtrl:NavController){
        this.produto = navParams.get('produto');        
        console.log(this.produto);
    }

    marcar(){
        this.produto.checked = !this.produto.checked;
        this.produtoService.update(this.produto.id, this.produto).subscribe();
    }

    excluir(){
        this.produtoService.remove(this.produto.id)
            .subscribe(()=> this.navCtrl.pop());
    }

}
