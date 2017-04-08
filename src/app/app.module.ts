import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'

import { ProdutosPage } from '../pages/produtos/produtos';
import { ProdutoPage } from '../pages/produto/produto';

@NgModule({
  declarations: [
    MyApp,
    ProdutosPage,
    ProdutoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProdutosPage,
    ProdutoPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, BarcodeScanner]
})
export class AppModule {}
