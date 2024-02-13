declare interface AndroidActivityView {
  // Propriétés de base
  id: number;
  visibility: number;
  layoutWidth: number;
  layoutHeight: number;
  context: AndroidContentContext;

  // Méthodes pour la gestion de l'ID et de la visibilité
  setId(id: number): void;
  getId(): number;
  setVisibility(visibility: number): void;
  getVisibility(): number;

  // Méthodes pour les dimensions et le positionnement
  setLayoutParams(params: AndroidLayoutParams): void;
  getLayoutParams(): AndroidLayoutParams;
  requestLayout(): void;
  getMeasuredWidth(): number;
  getMeasuredHeight(): number;

  // Méthodes pour la gestion des événements
  setOnClickListener(listener: (view: AndroidActivityView) => void): void;
  setOnTouchListener(
    listener: (view: AndroidActivityView, event: AndroidMotionEvent) => boolean
  ): void;

  // Méthodes pour la manipulation des parents
  getParent(): AndroidActivityView;
  removeView(view: AndroidActivityView): void;
  bringToFront(): void;

  // Méthodes pour la manipulation du contenu
  setBackgroundColor(color: number): void;
  setBackgroundResource(resId: number): void;
  invalidate(): void;

  // ... autres méthodes et propriétés que vous pourriez avoir besoin
}

// Définitions supplémentaires pour les types utilisés
declare interface AndroidLayoutParams {
  width: number;
  height: number;
  // ... autres propriétés spécifiques aux LayoutParams
}

declare interface AndroidMotionEvent {
  action: number;
  x: number;
  y: number;
  // ... autres propriétés spécifiques aux MotionEvent
}

declare interface AndroidContentContext {
  // ... définir selon les besoins de votre application
}
