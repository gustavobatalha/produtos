import { Injectable } from '@angular/core'

@Injectable()
export class ProdutosService{
    private produtos: Produto[] = [
        {nome:"Produto 1", codigo: 11111, checked:false},
        {nome:"Produto 2", codigo: 22222, checked:false},
        {nome:"Produto 3", codigo: 33333, checked:false},
        {nome:"Produto 4", codigo: 44444, checked:false},
        {nome:"Produto 5", codigo: 55555, checked:false}
    ];

    getProdutos(){
        return this.produtos;
    }
    addProduto(produto: Produto){
        this.produtos.push(produto);
    }

    removerProduto(produto: Produto){
        let i = this.produtos.indexOf(produto);
        if(i > -1){
            this.produtos.splice(i,1);
        }
    }
}




export interface Produto{
    nome: string
    codigo: number
    checked: boolean
}