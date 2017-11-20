import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {ShopService} from '../../providers/shop-service-rest';
import {ShopDetailPage} from '../shop-detail/shop-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-shop-list',
    templateUrl: 'shop-list.html'
})
export class ShopListPage {

    shops: Array<any>;
    shopsForSearch: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;

    constructor(public navCtrl: NavController, public service: ShopService, public config: Config) {
        this.findAll();
    }

    openShopDetail(shop: any) {
        this.navCtrl.push(ShopDetailPage, shop);
    }

    onInput(event) {
         // Reset items back to all of the items
        this.shops = this.shopsForSearch;

        // set val to the value of the searchbar
        let val = this.searchKey;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.shops = this.shops.filter((shop) => {
            return (shop.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
    }

    onCancel(event) {
        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .then(data => {
                this.shops = data;
                this.shopsForSearch = data;
            })
            .catch(error => alert(error));
    }

    shopMap() {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([48.85, 2.35], 10);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.shopMarkers();
        })
    }

    shopMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.shops.forEach(shop => {
            if (shop.lat, shop.lng) {
                let marker: any = leaflet.marker([shop.lat, shop.lng]).on('click', event => this.openShopDetail(event.target.data));
                marker.data = shop;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

}
