import { AfterViewInit, Component } from '@angular/core';
import { Address, Value } from '@emurgo/cardano-serialization-lib-asmjs'
declare var require: any
let Buffer = require('buffer/').Buffer

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'nami-wallet-connect';
  walletName: "nami" | "ccvault" | "flint" = "nami";
  utxos: any[] = [];
  rewardAddress: any;
  balance: any;


  ngAfterViewInit(): void {
    console.log("Found", this.walletName, this.detectWallet())
  }

  get window() {
    return window as any;
  }

  async connectWallet(wallet = this.walletName) {
    console.log("I will connect wallet")
    if (!this.detectWallet()) {
      alert("Please connect wallet first");
      return;
    }
    try {
      const api = await (this.window.cardano[wallet].enable() as Promise<any>)
      console.log(api)
      alert("Wallet connected !")
    } catch (error) {
      alert("Wallet not connected" + JSON.stringify(error))
    }
  }

  async checkIfWalletEnabled(wallet = this.walletName) {
    try {
      const isEnabled = await (this.window.cardano[wallet].isEnabled() as Promise<boolean>)
      return isEnabled;
    } catch (error) {
      alert(error)
      return false;
    }
  }

  detectWallet(wallet = this.walletName) {
    return !!this.window?.cardano?.[wallet]
  }

  async getBalance(wallet = this.walletName) {
    try {
      const api = await (this.window.cardano[wallet].enable() as Promise<any>)
      const balanceCBORHex = await (api.getBalance() as Promise<any>)
      this.balance = Value.from_bytes(Buffer.from(balanceCBORHex, "hex")).coin().to_str();
    } catch (error) {
      console.log(error);
    }
  }

  async getUtxos(wallet = this.walletName){
    try {
      const api = await (this.window.cardano[wallet].enable() as Promise<any>)
      console.log(api);
      this.utxos = await (api.getUtxos() as Promise<any>)
      // console.log(utxos);
    } catch (error) {
      console.log(error);
    }
  }

  async getRewardAddress(wallet = this.walletName){
    // console.log(api);
    const api = await (this.window.cardano[wallet].enable() as Promise<any>)
    const rawAddresses = await (api.getRewardAddresses() as Promise<any>);
    const rawFirst = rawAddresses[0];
    this.rewardAddress = Address.from_bytes(Buffer.from(rawFirst, "hex")).to_bech32()
  }

}
