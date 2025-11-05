
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  videoUrl?: string;
  isThinking?: boolean;
  originalQuery?: string;
}

export type CallStatus = 'idle' | 'listening' | 'speaking' | 'thinking' | 'denied';

export interface MicPermission extends PermissionStatus {
  state: 'granted' | 'denied' | 'prompt';
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type OrderStatusValue = 'Recibido' | 'En preparación' | 'En reparto' | 'Entregado';

export interface OrderStatus {
  id: string;
  status: OrderStatusValue;
}

export interface FunctionCall {
  name: string;
  args: {
    [key: string]: any;
  };
}