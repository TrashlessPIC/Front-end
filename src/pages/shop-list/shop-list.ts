import {Component} from '@angular/core';
import {Config, NavController, NavParams} from 'ionic-angular';
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
    selectedShoptype: any;
    selectedZwtype: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: ShopService, public config: Config) {
        this.selectedShoptype = this.navParams.data;
        this.selectedZwtype = this.navParams.data; 
        this.findAll();
        this.findAllTwo();
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
        this.findAllTwo();
    }

    findAll() {
        this.service.findAll()
            .then(data => {
                this.shops = data.filter((shopitem) => {
                    console.log("selectedShoptype ", this.selectedShoptype);
                    return shopitem.shoptype.indexOf(this.selectedShoptype) > -1;
                });
                this.shopsForSearch = data;
            })
            .catch(error => alert(error));
    }

    findAllTwo() {
        this.service.findAllTwo()
            .then(data => {
                this.shops = data.filter((zwitem) => {
                    console.log("selectedZwtype ", this.selectedZwtype);
                    return zwitem.zwtype.indexOf(this.selectedZwtype) > -1;
                });
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