import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ShopService} from '../../providers/shop-service-rest';
import {ShopDetailPage} from '../shop-detail/shop-detail';

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

    favorites: Array<any>;

    constructor(public navCtrl: NavController, public service: ShopService) {
        this.getFavorites();
    }

    itemTapped(favorite) {
        this.navCtrl.push(ShopDetailPage, favorite.shop);
    }

    deleteItem(favorite) {
        this.service.unfavorite(favorite)
            .then(() => {
                this.getFavorites();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getFavorites() {
        this.service.getFavorites()
            .then(data => this.favorites = data);
    }

}
