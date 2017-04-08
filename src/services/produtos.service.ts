import { Injectable } from '@angular/core'
import {RESTClient, BaseUrl, DefaultHeaders, Produces, GET, DELETE, POST, PUT, Path, Body, Query } from 'ng2-http'
import {Http} from '@angular/http'
import {Observable} from 'rxjs/Observable';


@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
@BaseUrl('http://192.168.207.89:3000/produtos')
export class ProdutosService  extends RESTClient{
    constructor(http:Http){ super(http)}

    @GET('/')
    @Produces<Produto[]>()
    get(@Query('codigo') codigo?: string): Observable<Produto[]> {return null;}

    @DELETE('/{id}')
    remove( @Path('id') id: number ):Observable<any> {return null;}

    @POST('/')
    @Produces<Produto>()
    add( @Body Produto: Produto ):Observable<Produto>{return null}

    @PUT('/{id}')
    @Produces<Produto>()
    update( @Path('id') id: number, @Body Produto: Produto):Observable<Produto>{ return null }
}




export interface Produto{
    id?: number
    nome: string
    codigo: number
    checked: boolean
}