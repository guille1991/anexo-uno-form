import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatTable} from '@angular/material/table';

export interface SectoresDeRoedores {
  letra: string;
  tiempo: string;
}

export interface SectoresIncluidos {
  sector: string;
  incluido:boolean;
}

export interface DataDeEmpresa {
  numeroEstablecimiento: number;
  razonSocial: string;
  domicilio: string;
  telfax: number;
  localidad: string;
  dtoPartido: string;
  provincia: string;
  supervisor: string;
  responsableSIV: string;
}

const infoEmpresa: DataDeEmpresa[] = [
  {
    numeroEstablecimiento: 1,
    razonSocial: 'thytrydrogen',
    domicilio: 'asdadasx',
    telfax: 32523524234,
    localidad: 'dwrmalaya',
    dtoPartido: 'asdasdas',
    provincia: 'sadsadasqw',
    supervisor: 'Pepe',
    responsableSIV: 'Jose',
  },
  {
    numeroEstablecimiento: 2,
    razonSocial: 'NTNTNH',
    domicilio: 'EREFER',
    telfax: 53455445,
    localidad: 'JUJTTYT',
    dtoPartido: 'QWEXCZ',
    provincia: 'SBRGG',
    supervisor: 'EWR',
    responsableSIV: 'GBYT',
  }
];

export interface DataDeRaticida {
  nombre : string;
  principioActivo : string;
  ResolucionSENASA :  number;
  anioResolucion :  number;
}

const infoRaticida: DataDeRaticida[] = [
  {
    nombre: 'Rataplus',
    principioActivo: 'Ratilina',
    ResolucionSENASA: 4422,
    anioResolucion: 2019
  },
  {
    nombre: 'RatitasMueran',
    principioActivo: 'Espinaca',
    ResolucionSENASA: 5555,
    anioResolucion: 2020
  },
  {
    nombre: 'SinRatas',
    principioActivo: 'Merengue',
    ResolucionSENASA: 8888,
    anioResolucion: 2021
  }
]

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  sectores: SectoresIncluidos[] = [{sector:'A',incluido:false}, {sector:'B',incluido:false}, {sector:'C',incluido:false} , {sector:'D',incluido:false} , {sector:'E',incluido:false}];
  establecimientoSeleccionado: number = -1;
  raticidaSeleccionado: number = -1;
  selectorSector = new FormControl();
  tiempoSector = new FormControl();
  tipoTiempo = new FormControl();
  dataSource: SectoresDeRoedores[] = [];
  empresa: DataDeEmpresa | undefined;
  raticida: DataDeRaticida | undefined;

  @ViewChild(MatTable) table: MatTable<SectoresDeRoedores> | undefined;

  displayedColumns: string[] = ['letra', 'tiempo','acciones'];

  constructor() {}

  ngOnInit(): void {}

  agregarSectores() {

    let cantidadtiempo = this.tiempoSector.value;
    let tipotiempo = this.tipoTiempo.value;
    cantidadtiempo == 1 ? ( tipotiempo == 1 ? tipotiempo = "Hora" : tipotiempo = "Dia") : ( tipotiempo == 1 ? tipotiempo = "Horas" : tipotiempo = "Dias")
    let tiempo = cantidadtiempo + " " + tipotiempo;
    this.selectorSector.value.forEach((element:string) => {
      this.dataSource.push({letra:element,tiempo:tiempo});
      this.cambiarEstadoDeSectorIncluido(element);

    });
    this.table?.renderRows();
    this.resetSectorForms();
  }

  cambiarEstadoDeSectorIncluido(letra:string) {
    let obj = this.sectores.find(o => o.sector === letra);
      if (obj) {
        obj.incluido = !obj.incluido;
      }
  }

filtrarSectoresAgregados() {
    return this.sectores.filter(x => x.incluido == false);
}

resetSectorForms(){
  this.selectorSector.reset();
  this.tipoTiempo.reset();
  this.tiempoSector.reset();
}

eliminar(letra:string) {

let index = this.dataSource.findIndex(o => o.letra === letra);
      this.dataSource.splice(index, 1);
      this.table?.renderRows();
      this.cambiarEstadoDeSectorIncluido(letra);
      this.resetSectorForms();
}

seleccionadoEstablecimiento() {
  this.empresa = infoEmpresa[this.establecimientoSeleccionado];
}

seleccionadoRaticida() {
  this.raticida = infoRaticida[this.raticidaSeleccionado];
}

  onSubmit() {
    console.log("enviado");
  }
}
