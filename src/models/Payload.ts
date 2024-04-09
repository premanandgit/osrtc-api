export interface GenericPayload {
  messageId: string;
  clientId: string;
  timestamp: number;
  action: string;
  data: any;
}