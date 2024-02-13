export interface Database {
  rawQuery(query: string, cursor: any): DatabaseResult;
  close(): void;
}

export interface DatabaseResult {
  close(): void;
  moveToFirst(): boolean;
  getString(index: number): string;
}
