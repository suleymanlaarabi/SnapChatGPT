interface ComponentName {
  packageName: string;
  className: string;
}
declare interface AndroidContentIntent {
  // Propriétés de base de l'Intent
  action: string | null;
  data: string | null;
  type: string | null;
  category: string;
  extras: { [key: string]: any };

  // Constructeur et méthodes de base
  constructor(action?: string, data?: string, type?: string);
  setAction(action: string): AndroidContentIntent;
  setData(data: string): AndroidContentIntent;
  setType(type: string): AndroidContentIntent;
  addCategory(category: string): AndroidContentIntent;
  putExtra(key: string, value: any): AndroidContentIntent;
  getExtra(key: string): any;
  removeExtra(key: string): AndroidContentIntent;

  // Méthodes pour la gestion des flags
  setFlags(flags: number): AndroidContentIntent;
  addFlags(flags: number): AndroidContentIntent;
  getFlags(): number;

  // Méthodes pour les composants ciblés
  setComponent(component: ComponentName): AndroidContentIntent;
  getComponent(): ComponentName | null;
  setPackage(packageName: string): AndroidContentIntent;
  getPackage(): string | null;

  // Méthodes pour les actions implicites
  setImplicit(isImplicit: boolean): AndroidContentIntent;
  isImplicit(): boolean;

  // ... Plus de méthodes et propriétés selon les besoins
}
