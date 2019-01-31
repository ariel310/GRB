export interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
  }

export interface Location {
    lat: number;
    lng: number;
    viewport?: Object;
    zoom: number;
    address_level_1?: string;
    address_level_2?: string;
    address_country?: string;
    address_zip?: string;
    address_state?: string;
    marker?: Marker;
  }

  export interface Address {
      Direccion: string;
      Ciudad: string;
      Provincia: string;
      Pais: string;
  }

  export interface Addresses {
    Direcciones: Address[];
  }
