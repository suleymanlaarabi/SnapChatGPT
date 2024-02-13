declare interface AndroidWidgetFrameLayout extends AndroidViewViewGroup {
  // Ajoutez ici les propriétés spécifiques à FrameLayout si nécessaire

  // Méthodes héritées de ViewGroup
  addView(view: AndroidActivityView, index?: number): void;
  removeView(view: AndroidActivityView): void;
  removeAllViews(): void;
  getChildAt(index: number): AndroidActivityView;
  getChildCount(): number;

  // Méthodes héritées de View
  setVisibility(visibility: number): void;
  getVisibility(): number;
  setId(id: number): void;
  getId(): number;
  // ... Autres méthodes de View

  // Méthodes spécifiques à FrameLayout
  // Ajoutez ici des méthodes spécifiques à FrameLayout si elles sont nécessaires
}
