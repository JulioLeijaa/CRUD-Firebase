export class HeroeModel {
  id: any;
  nombre!: string;
  poder!: string;
  vivo: boolean;

  constructor() {
    this.vivo = true;
  }
}
