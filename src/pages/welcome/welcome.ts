import {Component, ViewChild} from '@angular/core';
import { Slides, NavController } from 'ionic-angular';
import {ShopListPage} from '../shop-list/shop-list';

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {
  @ViewChild(Slides) slides: Slides;

    constructor(public navCtrl: NavController) {
    }

    ngAfterViewInit() {
      this.slides.pager = true;
    }

    openShopList(shoptype, zwtype) {
        this.navCtrl.push(ShopListPage, shoptype, zwtype);
    }
}