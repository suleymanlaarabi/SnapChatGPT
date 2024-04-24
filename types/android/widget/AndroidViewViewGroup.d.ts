declare interface AndroidViewViewGroup extends AndroidActivityView {
  // Propriétés spécifiques à ViewGroup
  // Ajoutez ici les propriétés spécifiques si nécessaire

  // Méthodes spécifiques à ViewGroup
  addView(view: AndroidActivityView, index?: number, params?: any): void;
  removeView(view: AndroidActivityView): void;
  removeAllViews(): void;
  getChildAt(index: number): AndroidActivityView;
  getChildCount(): number;
  setLayoutParams(params: any): void;
  getLayoutParams(): any;
  requestLayout(): void;
  invalidate(): void;

  // Méthodes héritées de View
  // (Inclure les méthodes de View ici si elles ne sont pas déjà incluses dans AndroidActivityView)

  // D'autres méthodes spécifiques à ViewGroup peuvent être ajoutées ici
}
