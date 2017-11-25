import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {ShopService} from '../../providers/shop-service-rest';

@Component({
    selector: 'page-shop-detail',
    templateUrl: 'shop-detail.html'
})
export class ShopDetailPage {

    shop: any;

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public ShopService: ShopService, public toastCtrl: ToastController) {
        this.shop = this.navParams.data;
        ShopService.findById(this.shop.id).then(
            shop => this.shop = shop
        );
    }

    favorite(shop) {
        this.ShopService.favorite(shop)
            .then(shop => {
                let toast = this.toastCtrl.create({
                    message: 'Le commerce a été ajouté à vos favoris',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(shop) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Partager via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('Partagé sur Twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('Partagé sur Facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('Partagé par email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('Annuler')
                }
            ]
        });

        actionSheet.present();
    }

}
