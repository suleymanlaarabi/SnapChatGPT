declare interface AndroidResources {
  // Exemples de méthodes pour accéder aux différentes ressources
  getString(id: number): string;
  getDrawable(id: number): any; // Remplacer 'any' par un type plus spécifique si nécessaire
  getDimension(id: number): number;
  getColor(id: number): number;
  getIdentifier(name: string, defType: string, defPackage: string): number;

  // Méthodes pour obtenir le nom des ressources
  getResourceEntryName(id: number): string;
  getResourceName(id: number): string;

  // Autres méthodes utiles de la classe Resources
  getDisplayMetrics(): AndroidDisplayMetrics;
  getConfiguration(): AndroidConfiguration;

  // ... autres méthodes et propriétés que vous pourriez avoir besoin
}

// Supplémentaire: Types pour les DisplayMetrics et Configuration si nécessaire
declare interface AndroidDisplayMetrics {
  // Propriétés pour les métriques d'affichage
  widthPixels: number;
  heightPixels: number;
  density: number;
  // ... autres propriétés de DisplayMetrics
}

declare interface AndroidConfiguration {
  // Propriétés pour la configuration
  locale: string;
  // ... autres propriétés de Configuration
}
