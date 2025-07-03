export interface SSEMessage {
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  data: any;
}