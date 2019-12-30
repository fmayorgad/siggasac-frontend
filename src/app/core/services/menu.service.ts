import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { filter } from 'rxjs/operators';

export interface Tag {
  color: string; // Background Color
  value: string;
}

export interface ChildrenItem {
  state: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  children?: ChildrenItem[];
}

export interface Menu {
  state: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  label?: Tag;
  badge?: Tag;
  children?: ChildrenItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu: Menu[] = [];

  getAll(): Menu[] {
    const localvariable = localStorage.getItem('token');
    const localuser = localStorage.getItem('currentUser');
    const helper = new JwtHelperService();
    let decodedToken = helper.decodeToken(localvariable);
    decodedToken = decodedToken;
    const menucopy = [];
    const t12 = this.menu;
    console.log(t12);

    //passportJS


    //console.log(this.menu)
    //console.log(localuser);
    // Filtering menu
    // se hace asi por ahora porque no esta el valor en el endpoint

    // se recorre el menu y se elimina lo que no se encuentre en el token
    let i1 = 0;
    // for (const menu of this.menu) {
    //   // se filtra el menú de llegada y si no encuentro el valor que estoy recorriendo en el array de angular, lo elimino
    //   let filtered = decodedToken.filter(m=>{
    //     return m.name === menu.name;
    //   });

    //   if(filtered.length > 0) { // Si no existe, no tiene acceso
    //     console.log(' tiene acceso a ' + menu.name);
    //   } else {
    //     console.log('no tiene acceso a ' + menu.name);
    //     //menucopy.shift();
    //     //menucopy.splice(i1, 1);
    //   } 
    // }

    let msuper = ['cuentas', 'colegios', 'terceros', 'bancos', 'fuentes', 'tipos_documento', 'admin'];
    let cmenu = ['terceros', 'proyectos_sedes', 'tipos_documento', 'comprobantes', 'cuentas_bancarias', 'listado'];
    let menu = this.menu;
    console.log(decodedToken);
    console.log(menu[3])
    if (decodedToken.email == 'super@sigasac.com') {
      menu = menu.filter(m => {
        return msuper.includes(m.state);
      });
  //   menu[3].children.splice(0, 1);
//   menu[8].children.splice(1, 2);
    } else {
      menu = menu.filter(m => {
        return cmenu.includes(m.state);
      });
   //   menu[2].children.splice(0, 1);

    }

    console.log(menu)

    return menu;
  }

  set(menu: Menu[]): Menu[] {
    this.menu = this.menu.concat(menu);
    return this.menu;
  }

  add(menu: Menu) {
    this.menu.push(menu);
  }

  getMenuItemName(stateArr: string[]): string {
    return this.getMenuLevel(stateArr)[stateArr.length - 1];
  }

  // TODO:
  getMenuLevel(stateArr: string[]): string[] {
    const tmpArr = [];
    this.menu.map(item => {
      if (item.state === stateArr[0]) {
        tmpArr.push(item.name);
        // Level1
        if (item.children && item.children.length) {
          item.children.forEach(itemlvl1 => {
            if (stateArr[1] && itemlvl1.state === stateArr[1]) {
              tmpArr.push(itemlvl1.name);
              // Level2
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (stateArr[2] && itemlvl2.state === stateArr[2]) {
                    tmpArr.push(itemlvl2.name);
                  }
                });
              }
            } else if (stateArr[1]) {
              // Level2
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (itemlvl2.state === stateArr[1]) {
                    tmpArr.push(itemlvl1.name, itemlvl2.name);
                  }
                });
              }
            }
          });
        }
      }
    });
    return tmpArr;
  }
}
