import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-budgedaccounts.module-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class BudgedAccountsModuleMainComponent implements OnInit{
  constructor() {}
  // bodycardtitled variables
  title = 'Cuentas: Cuentas Presupuestales';
  icon = 'list_alt';
  color = '#4bc0c0';
  subtitle = 'Listado de Cuentas Presupuestales disponibles en la plataforma.';

  mainTablePaginationOptions = [10, 15, schools.length];

  displayedColumns: string[] = ['name', 'resolution', 'nit', 'sectorName','neighborhood','address','dane' ,'acciones'];
  dataSource = new MatTableDataSource<school>(schools);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

export interface school {
  name: string;
  resolution: number;
  nit: string;
  sectorName: string;
  sectorId: number;
  icfes: string;
  dane: string;
  address: string;
  neighborhood: string;
  phones: string;
  fax: string;
  postalcode: string;
  countryId: number;
  countryName: string;
  departmentId: number;
  departmentName: string;
  cityId: number;
  cityName: string;
  comuneId: number;
  comuneName: string;
  imgPath: string;
}

const schools: school[] = [
  { name: 'Institución 1', resolution: 1.0079, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 2', resolution: 4.0026, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 3', resolution: 6.941, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 4', resolution: 9.0122, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 5', resolution: 10.811, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 6', resolution: 12.0107, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 7', resolution: 14.0067, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 8', resolution: 15.9994, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 9', resolution: 18.9984, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 10', resolution: 20.1797, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 11', resolution: 22.9897, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 12', resolution: 24.305, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 13', resolution: 26.9815, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 14', resolution: 28.0855, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 15', resolution: 30.9738, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 16', resolution: 32.065, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 17', resolution: 35.453, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 18', resolution: 39.948, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 19', resolution: 39.0983, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
  { name: 'Institución 20', resolution: 40.078, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
];
