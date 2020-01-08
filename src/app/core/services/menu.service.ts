import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { filter, } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
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
  // private readonly router: Router;

  // const router = new Router();
  private menu: Menu[] = [];

  getAll(): Menu[] {
    let localvariable: any = JSON.parse(localStorage.getItem('currentUser'));

    console.log(localvariable);
    const localuser = JSON.parse(localStorage.getItem('currentUser'));
    const helper = new JwtHelperService();
    localvariable = localvariable.token;
    console.log(localvariable)
    let decodedToken = helper.decodeToken(localvariable);
    const menucopy = [];
    const t12 = this.menu;

    console.log(decodedToken);

    if (!decodedToken) {
      //this.router.navigate(['/']);
    }



    //passportJS


    //console.log(this.menu)
    //console.log(localuser);
    // Filtering menu
    // se hace asi por ahora porque no esta el valor en el endpoint

    // se recorre el menu y se elimina lo que no se encuentre en el token
    let i1 = 0;
    let incomingmenu = decodedToken.menus;
    console.log(incomingmenu)
    console.log(this.menu)

    // Se realiza el proceso con Objetos y no con arrays para reutilizar dichos onbjetos en la validación de permisos como crear, ver eliminar etc,
    // y que no sea necesario filtrar un array (usando una funcion especifica para dicho proceso) y validar si mostrar o no la opción

    // converción del menu del token
    let tokenmenu = {}
    for (let i of incomingmenu) {
      tokenmenu[i.name] = {};
      tokenmenu[i.name].name = i.name;

      if (i.submenus.length > 0) {
        for (let i2 of i.submenus) {
          if (!tokenmenu[i.name].children) {
            tokenmenu[i.name].children = {};
            tokenmenu[i.name].children[i2.name] = {};
            tokenmenu[i.name].children[i2.name].permissions = i2.permissions;
          } else {
            tokenmenu[i.name].children[i2.name] = {};
            tokenmenu[i.name].children[i2.name].permissions = i2.permissions;
          }
        }
      }
    }

    //conversion del menu de la app
    let appmenu = {}
    for (let i of this.menu) {
      appmenu[i.state] = {};
      appmenu[i.state].name = i.name;
      appmenu[i.state].state = i.state;
      appmenu[i.state].type = i.type;
      appmenu[i.state].icon = i.icon;
      // console.log(i)

      if (i.children) {
        for (let i2 of i.children) {
          if (!appmenu[i.state].children) {
            appmenu[i.state].children = {};
            appmenu[i.state].children[i2.state] = {};
            appmenu[i.state].children[i2.state].state = i2.state;
            appmenu[i.state].children[i2.state].name = i2.name;
            appmenu[i.state].children[i2.state].type = i2.type;
          } else {
            appmenu[i.state].children[i2.state] = {};
            appmenu[i.state].children[i2.state].state = i2.state;
            appmenu[i.state].children[i2.state].name = i2.name;
            appmenu[i.state].children[i2.state].type = i2.type;
          }
        }
      }
    }

    console.log(appmenu)
    console.log(tokenmenu)

    //se recorre el array de la app y se compara con el array del token, para crear el menu a pintar
    // tslint:disable-next-line: forin

    let finalmenu = []

    // tslint:disable-next-line: forin
    for (const i in appmenu) {
      if (tokenmenu[i]) {
        console.log('existe ' + i)
        let tmp = {
          icon: appmenu[i].icon,
          state: appmenu[i].state,
          type: appmenu[i].type,
          name: appmenu[i].name
        };

        // se filtran ahora los submenus
        if (appmenu[i].children) {
          let tmp2 = []
          //se recorren todos los children del token y se pasan al menu final desde el menu app 
          // (si existe en el token, debe exizstir en el menu app, pues este ultimo tiene a todos)
          // tslint:disable-next-line: forin
          for (const i2 in tokenmenu[i].children) {
           
           console.log(i2)
             tmp2.push(appmenu[i].children[i2])
          }
          tmp['children'] = tmp2;
        }

        finalmenu.push(tmp);
      }
    }

    console.log(finalmenu)

    let msuper = ['cuentas', 'colegios', 'terceros', 'bancos', 'fuentes', 'tipos_documento', 'admin'];
    let cmenu = ['terceros', 'proyectos_sedes', 'tipos_documento', 'comprobantes', 'cuentas_bancarias', 'listado'];
    let menu = this.menu;
    console.log(decodedToken);
    console.log(menu[3])
    if (decodedToken.email === 'super@sigasac.com') {
      menu = menu.filter(m => {
        return msuper.includes(m.state);
      });
      // menu[3].children.splice(0, 1);
      // menu[8].children.splice(1, 2);
    } else {
      menu = menu.filter(m => {
        return cmenu.includes(m.state);
      });
      // menu[2].children.splice(0, 1);

    }

    console.log(menu)

    return finalmenu;
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
