export interface Client {
  id: number;
  user: number;
  name: string;
  email: string | null;
  phone: string;
  company: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export type ClientCreate = Omit<Client, 'id' | 'user' | 'created_at' | 'updated_at'>;
export type ClientUpdate = Partial<ClientCreate>;